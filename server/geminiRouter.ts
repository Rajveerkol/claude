import type { IncomingMessage, ServerResponse } from 'http';

// Candidate models in preference order
const DEFAULT_CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro',
];

// In-memory cooldown cache: modelName -> expiry timestamp (ms)
const modelCooldowns = new Map<string, number>();
const COOLDOWN_DURATION_MS = 60 * 1000; // 60 seconds

// Simple in-memory rate limiter per IP: IP -> array of request timestamps
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // max 30 requests per minute

export const PORTAL_SYSTEM_INSTRUCTION = `You are the official AI Support Assistant for CLAUDE × SHEIN — the luxury student learning portal and fashion-inspired digital atelier.
You assist student Rajveer Kol with academic records, courses, attendance, honors, Student ID cards, and portal policies.

PORTAL & STUDENT KNOWLEDGE BASE:
- Student Name: Rajveer Kol
- Role: Student
- Date of Birth: 11/06/2012
- Student Reference ID: CS-2026-8841
- Portal Membership Duration: 1 Year
- Student Status: Active
- Verified Attendance: 100% (30 out of 30 lectures/workshops attended)
- Faculty Mentor: Professor Burzin (Senior Developer, Faculty Mentor, and Curriculum Director)
- Completed Courses (All 4 core modules completed with 100% progress & top honors):
  1. Advanced Web Architecture & Systems (Grade: A+, Certificate: CS-CERT-8841-A)
  2. Modern Python & Algorithmic Design (Grade: A+, Certificate: CS-CERT-8841-B)
  3. Haute Couture UI/UX & Interaction Design (Grade: A, Certificate: CS-CERT-8841-C)
  4. Luxury Brand Digital Business & Strategy (Grade: A+, Certificate: CS-CERT-8841-D)
- SHEIN Clothing Benefits Policy:
  - As an active student with 100% verified attendance, Rajveer is eligible for the seasonal student capsule wardrobe allocation and voucher benefits.
  - Crucial Policy Guidance: For official voucher allocations, eligibility verification, or wardrobe tier upgrades, Rajveer must consult Professor Burzin directly.
- Student ID Card:
  - Rajveer Kol's digital student ID card can be accessed from the "My Student ID" page.
  - Displays: Student photograph, date of birth (11/06/2012), 100% attendance, membership 1 Year, professor Burzin, student ID CS-2026-8841.
  - Card Capabilities: Working photo upload, live card preview, local browser storage saving, photo reset, high-resolution PNG card download, and print-ready card layout.
- Achievements / Honors (6 badges earned):
  - Perfect Attendance (100% attendance verified across 30 sessions)
  - Academic Excellence (Top marks in all courses)
  - Capstone Laureate (Completed all 4 modules with distinction)
  - Haute Couture Innovator (Excellence in editorial UX/UI)
  - Code Artisan (Exemplary programming craftsmanship)
  - Portal Luminary (Active community and platform engagement)

BEHAVIORAL GUIDELINES & GUARDRAILS:
1. Role & Identity: You are the AI Support Assistant representing the CLAUDE × SHEIN portal. Be sophisticated, supportive, professional, and refined. Do NOT pretend to be a human professor typing in real time; you are the portal's intelligent AI assistant answering on behalf of the academy and curriculum.
2. Scope: Strictly answer questions related to the CLAUDE × SHEIN portal, courses, curriculum, attendance, Professor Burzin, Student ID, SHEIN clothing benefits, and academic progress.
3. Out-of-Scope Queries: If the student asks about unrelated general topics (such as general knowledge, world events, recipes, external coding problems, financial stocks, etc.), politely decline and steer them back to portal topics with refined courtesy:
   "As the CLAUDE × SHEIN Student Support Assistant, my expertise is dedicated to your academic records, coursework with Professor Burzin, attendance, Student ID card, and SHEIN clothing benefits. How may I assist you with your portal activities today?"
4. Language: Fluently support both English and natural Hinglish (e.g. if the student asks in Hinglish like "Burzin sir ke baare mein batao" or "Mera attendance kitna hai", reply warmly in natural, polite Hinglish).
5. Tone: Luxury fashion editorial meets elite academic mentor — crisp, encouraging, respectful, and clear.`;

export function getCandidateModels(): string[] {
  const envModels = process.env.GEMINI_MODELS;
  if (envModels && envModels.trim()) {
    const list = envModels
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
    if (list.length > 0) return list;
  }
  return DEFAULT_CANDIDATE_MODELS;
}

// Check and update IP rate limit
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  // Filter out timestamps outside the window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestTimestamps.set(ip, validTimestamps);
    return true;
  }
  validTimestamps.push(now);
  ipRequestTimestamps.set(ip, validTimestamps);
  return false;
}

// Bounded exponential backoff with jitter
async function backoffWait(attempt: number): Promise<void> {
  const baseMs = 500 * Math.pow(2, attempt);
  const jitterMs = Math.floor(Math.random() * 300);
  const waitMs = Math.min(baseMs + jitterMs, 2500);
  await new Promise((resolve) => setTimeout(resolve, waitMs));
}

export interface ChatHistoryMessage {
  sender: 'student' | 'burzin' | 'system' | 'assistant';
  text: string;
}

export interface GeminiChatResponse {
  success: boolean;
  text?: string;
  modelUsed?: string;
  error?: string;
  errorType?: 'AUTH_ERROR' | 'RATE_LIMITED' | 'UNAVAILABLE' | 'BAD_REQUEST';
}

/**
 * Dispatches a chat request to the Gemini API with automatic model fallback.
 */
export async function executeGeminiWithFallback(
  messages: ChatHistoryMessage[],
  apiKey: string
): Promise<GeminiChatResponse> {
  if (!apiKey || apiKey.trim() === '' || apiKey.trim() === 'your_gemini_api_key_here') {
    return {
      success: false,
      error:
        'The AI Support Assistant requires a valid Google Gemini API key. Please configure GEMINI_API_KEY in your server environment or .env file.',
      errorType: 'AUTH_ERROR',
    };
  }

  const candidateModels = getCandidateModels();
  const now = Date.now();

  // Filter out candidate models that are on cooldown, unless ALL are on cooldown
  const availableModels = candidateModels.filter((model) => {
    const cooldownUntil = modelCooldowns.get(model);
    return !cooldownUntil || cooldownUntil <= now;
  });

  const modelsToTry = availableModels.length > 0 ? availableModels : candidateModels;

  // Build Gemini contents payload from chat history
  // Gemini expects alternating user / model roles
  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  for (const msg of messages) {
    if (msg.sender === 'system') continue;
    const role: 'user' | 'model' = msg.sender === 'student' ? 'user' : 'model';

    // Merge consecutive messages with the same role
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n\n${msg.text}`;
    } else {
      contents.push({
        role,
        parts: [{ text: msg.text }],
      });
    }
  }

  // Ensure first message is user
  while (contents.length > 0 && contents[0].role !== 'user') {
    contents.shift();
  }

  if (contents.length === 0) {
    return {
      success: false,
      error: 'Please provide a non-empty message to start the conversation.',
      errorType: 'BAD_REQUEST',
    };
  }

  const requestBody = {
    system_instruction: {
      parts: [{ text: PORTAL_SYSTEM_INSTRUCTION }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.95,
    },
  };

  let lastErrorReason = '';

  for (let i = 0; i < modelsToTry.length; i++) {
    const model = modelsToTry[i];

    try {
      // 20 second timeout per model attempt
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-2xx responses
      if (!response.ok) {
        const status = response.status;
        let responseJson: any = null;
        try {
          responseJson = await response.json();
        } catch {
          // ignore json parse error
        }

        const errorMessage = responseJson?.error?.message || response.statusText;
        const errorStatus = responseJson?.error?.status || '';

        // Case 1: Authentication / Permissions / Billing error
        if (
          status === 401 ||
          status === 403 ||
          (status === 400 && errorMessage.toLowerCase().includes('api key')) ||
          errorStatus === 'PERMISSION_DENIED'
        ) {
          console.warn(`[GeminiRouter] Authentication or permission failure (${status}): ${errorMessage}`);
          return {
            success: false,
            error:
              'Google Gemini API authentication failed. Please verify that your GEMINI_API_KEY is valid and has Gemini API permissions enabled.',
            errorType: 'AUTH_ERROR',
          };
        }

        // Case 2: Model not found / Unsupported model ID (404)
        if (status === 404 || errorStatus === 'NOT_FOUND') {
          console.warn(`[GeminiRouter] Model '${model}' not found or unsupported (HTTP 404). Trying next candidate.`);
          lastErrorReason = `Model '${model}' not available`;
          continue; // Immediately try next model without quota cooldown
        }

        // Case 3: Rate limit / Quota exhaustion (429) or Server Overload (500 / 503)
        if (status === 429 || status === 500 || status === 503 || status === 504 || errorStatus === 'RESOURCE_EXHAUSTED') {
          console.warn(`[GeminiRouter] Model '${model}' hit temporary limit/error (${status}). Placing on cooldown and falling back.`);
          modelCooldowns.set(model, Date.now() + COOLDOWN_DURATION_MS);
          lastErrorReason = `Model '${model}' temporarily overloaded`;

          // Bounded exponential backoff with jitter before trying next model
          if (i < modelsToTry.length - 1) {
            await backoffWait(i);
          }
          continue;
        }

        // Other client errors (e.g. 400 bad request)
        if (status === 400) {
          console.warn(`[GeminiRouter] Bad request for model '${model}': ${errorMessage}`);
          lastErrorReason = errorMessage;
          continue;
        }

        // Fallback for unexpected status codes
        lastErrorReason = `HTTP ${status}: ${errorMessage}`;
        continue;
      }

      // Successful 200 response
      const data = (await response.json()) as any;
      const candidate = data?.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      const text = part?.text;

      if (text && typeof text === 'string') {
        // Success!
        return {
          success: true,
          text: text.trim(),
          modelUsed: model,
        };
      }

      // If text was empty or filtered by safety
      const finishReason = candidate?.finishReason;
      if (finishReason === 'SAFETY') {
        return {
          success: true,
          text: 'I am here to assist you with CLAUDE × SHEIN coursework, attendance, honors, and benefits. How can I help with your portal records today?',
          modelUsed: model,
        };
      }

      lastErrorReason = 'Empty response received from model';
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        console.warn(`[GeminiRouter] Model '${model}' timed out after 20 seconds. Trying next candidate.`);
        lastErrorReason = `Model '${model}' request timed out`;
      } else {
        console.warn(`[GeminiRouter] Network error with model '${model}': ${err?.message || err}`);
        lastErrorReason = err?.message || 'Network error';
      }

      // Place model on brief cooldown on network/timeout error
      modelCooldowns.set(model, Date.now() + 30000);

      // Backoff before next attempt
      if (i < modelsToTry.length - 1) {
        await backoffWait(i);
      }
    }
  }

  console.error(`[GeminiRouter] All candidate models exhausted. Last reason: ${lastErrorReason}`);
  return {
    success: false,
    error: 'Our AI assistant is temporarily unavailable. Please try again shortly.',
    errorType: 'UNAVAILABLE',
  };
}

/**
 * HTTP Request Handler for /api/chat endpoint.
 * Works seamlessly in Vite dev middleware, Vite preview, and standalone Node server.
 */
export async function handleChatApiRoute(
  req: IncomingMessage,
  res: ServerResponse,
  apiKeyFromEnv?: string
): Promise<void> {
  // CORS & Security Headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
    return;
  }

  // Rate Limiting by client IP
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    res.statusCode = 429;
    res.end(
      JSON.stringify({
        success: false,
        error: 'Too many requests. Please wait a moment before sending another message.',
        errorType: 'RATE_LIMITED',
      })
    );
    return;
  }

  // Read request body safely
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    // Reject payloads larger than 500 KB to avoid memory abuse
    if (body.length > 500 * 1024) {
      res.statusCode = 413;
      res.end(JSON.stringify({ success: false, error: 'Payload too large.' }));
      req.destroy();
    }
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const messages = parsed.messages;

      if (!Array.isArray(messages) || messages.length === 0) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            success: false,
            error: 'Invalid request: "messages" must be a non-empty array.',
            errorType: 'BAD_REQUEST',
          })
        );
        return;
      }

      // Check last message length
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || typeof lastMessage.text !== 'string' || !lastMessage.text.trim()) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            success: false,
            error: 'Message text cannot be empty.',
            errorType: 'BAD_REQUEST',
          })
        );
        return;
      }

      if (lastMessage.text.length > 2000) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            success: false,
            error: 'Message length exceeds the 2,000 character limit. Please shorten your question.',
            errorType: 'BAD_REQUEST',
          })
        );
        return;
      }

      // Resolve API key strictly from server environment
      const apiKey = apiKeyFromEnv || process.env.GEMINI_API_KEY || '';

      const result = await executeGeminiWithFallback(messages, apiKey);

      if (!result.success) {
        if (result.errorType === 'AUTH_ERROR') {
          res.statusCode = 401;
        } else if (result.errorType === 'BAD_REQUEST') {
          res.statusCode = 400;
        } else {
          res.statusCode = 503;
        }
      } else {
        res.statusCode = 200;
      }

      res.end(JSON.stringify(result));
    } catch {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          success: false,
          error: 'Malformed JSON payload.',
          errorType: 'BAD_REQUEST',
        })
      );
    }
  });
}
