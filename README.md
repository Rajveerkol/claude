# CLAUDE × SHEIN — Premium Student Portal

An interactive, luxury student learning portal combining high-fashion editorial aesthetics with a modern student SaaS dashboard and Live AI Support.

![Brand](https://img.shields.io/badge/Brand-CLAUDE%20%C3%97%20SHEIN-8D2635?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Tailwind%20CSS%20%7C%20Vite%208-171717?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Google%20Gemini%20API%20(Auto--Fallback)-4285F4?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-E8DDCF?style=for-the-badge)

---

## Overview

**CLAUDE × SHEIN** is a student dashboard representing a haute couture learning academy. It features a curated student dossier for **Rajveer Kol**, mentored by **Professor Burzin**, with a verified 100% attendance record, 4 completed foundational courses, and a live Gemini-powered AI Support Center.

### Key Features

1. **Brand Identity & Luxury Editorial Aesthetic**
   - Refined typography: Google Fonts *Playfair Display*, *Cormorant Garamond*, and *Plus Jakarta Sans*.
   - Color palette: Warm Ivory (`#FAF9F6`), Rich Black (`#171717`), Muted Burgundy (`#8D2635`), Champagne Beige (`#E8DDCF`), and Soft Gray (`#F1F1EF`).
   - Full dark mode (Obsidian `#121212` with ivory typography and champagne accents).
   - Reduced motion toggle for accessibility.

2. **Student Profile (`Rajveer Kol`)**
   - Full Name: **Rajveer Kol**
   - Role: **Student**
   - Faculty Mentor: **Professor Burzin**
   - Verified Attendance: **100%** (30 of 30 sessions present)
   - Membership Duration: **1 Year** ("Joined 1 year ago")
   - Student Status: **Active**
   - Local edit modal for profile fields, bio, and initials, persisted in `localStorage`.

3. **Digital Student ID Card (`My Student ID`)**
   - High-fidelity realistic student credential card with luxury ivory and obsidian finishes.
   - Front-side and back-side interactive 3D flip inspection.
   - Verified student details:
     - Student Name: **Rajveer Kol**
     - Date of Birth: **11/06/2012** (exact format)
     - Role: **Student**
     - Faculty Mentor: **Professor Burzin**
     - Verified Attendance: **100%**
     - Membership Duration: **1 Year**
     - Institute: **CLAUDE × SHEIN**
     - Reference ID: **REF: CS-8842-RK**
   - Personal photograph preview with real-time "Change Photo" upload (compressed & saved locally) and "Reset Photo" action.
   - Vector QR visual pattern with central monogram and magnetic strip / barcode styling on the reverse.
   - High-resolution **PNG export** via `html-to-image` and standard card-sized **Print** layout via `@media print`.

4. **Live AI Support Center (Always Online · Google Gemini API)**
   - **Always Online**: 24/7 availability with prominent green online indicator and status line *"AI Assistant · Available"*.
   - **Automatic Model Fallback Router**:
     - Configurable candidate models: `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-1.5-flash-8b`, `gemini-1.5-pro` (customizable via `GEMINI_MODELS` environment variable).
     - Tries preferred candidate first; handles 429 quota exhaustion, temporary server overload (500/503), and timeouts by switching to the next candidate model using bounded exponential backoff with jitter.
     - In-memory cooldown cache avoids repeatedly hitting exhausted models during a 60-second cooldown period.
     - Skips unsupported model names (HTTP 404) immediately without wasting quota retries.
     - Discriminating error handling: invalid keys and permission errors return immediate sanitized diagnostic guidance without cycling.
     - Friendly fallback if all candidates fail: *"Our AI assistant is temporarily unavailable. Please try again shortly."*
   - **Server-Side API Proxy**:
     - Secret `GEMINI_API_KEY` is kept strictly server-side and is never exposed in client bundles or network responses.
     - Built-in Vite middleware proxy (`/api/chat`) for seamless local development (`npm run dev`) and standalone Node server (`npm start`).
     - Request validation, 2000-character message length limits, 20-second per-model timeouts, and sliding-window IP rate limiting (30 req/min).
   - **Grounded Academy Knowledge Base**:
     - Deeply knowledgeable about Rajveer Kol, Professor Burzin, coursework, verified 100% attendance, and honors.
     - Explains the **SHEIN Clothing Benefits Policy** with policy advice to consult Professor Burzin directly for official voucher allocations and approvals.
     - Explains how to view, upload photos to, download as PNG, and print the **Student ID Card**.
     - Guardrails politely redirect unrelated general queries back to academy portal matters.
     - Speaks fluent English and natural Hinglish.
   - **Interactive UI**:
     - Suggested prompt chips ("What have I learned?", "Who is Professor Burzin?", "Explain my clothing benefits", "Show my completed courses", "Explain my attendance", "How do I download my Student ID?").
     - Animated 3-dot typing indicator while the AI generates responses.
     - Clear conversation confirmation modal and local browser persistence.

5. **Dashboard Overview**
   - Welcome banner: *"Welcome back, Rajveer"* & *"Your learning journey, all in one place."*
   - 4 Core Stat Cards: Attendance (100%), Courses Completed (4), Learning Streak (30 Days), Membership (1 Year).
   - Recent Activity timeline, Course Progress breakdown, Student Overview, Faculty Mentor card, and Support Status card.

6. **SHEIN Clothing Benefits Banner**
   - Prominently placed on the Dashboard and Rewards & Benefits page.
   - Exact copy:
     - *"Your Style. Your Rewards."*
     - *"You will get free clothes from SHEIN as per our policy."*
     - *"Your clothing benefits are subject to the applicable policy and eligibility requirements."*
   - Interactive CTA navigating to Support Center.

7. **Courses Page (`My Learning`)**
   - Tabs: All Courses, In Progress, Completed.
   - Category filtering (Technology, Programming, Design, Business) and real-time search.
   - 4 Preloaded Completed Courses:
     - *Introduction to Web Development* (Technology, 100%, Completed)
     - *Python Programming Fundamentals* (Programming, 100%, Completed)
     - *UI/UX Design Essentials* (Design, 100%, Completed)
     - *Digital Business Foundations* (Business, 100%, Completed)
   - Interactive course details modal with syllabus milestones, outcomes, and credential verification.

8. **Attendance Dashboard**
   - 100% Attendance Rate, 30 Present sessions, 0 Absent sessions.
   - Interactive 30-session matrix visualization.
   - Attendance history logs with month selector, status filter, and topic search.

9. **Achievements & Honors**
   - Milestones: *Perfect Attendance*, *First-Year Milestone*, *Learning Champion*, *Consistency Award*, *Haute Couture Digital Pioneer*, *Editorial Systems Master*.
   - Interactive badge modal with verification codes and confetti animation.

10. **Settings**
    - Theme switcher (Light Ivory / Dark Obsidian).
    - Reduced motion toggle.
    - AI Support Service diagnostics and chat history reset.
    - Local application storage reset with safety disclosure.

---

## Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Rajveerkol/claude.git
cd claude

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a local `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Google Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional: customize candidate fallback models (comma-separated)
GEMINI_MODELS=gemini-2.5-flash,gemini-2.0-flash,gemini-1.5-flash,gemini-1.5-flash-8b
```

> [!NOTE]
> The `.env` file is git-ignored and never committed. The application's `/api/chat` proxy ensures the secret key is strictly handled on the server side and never sent to the browser bundle.

### 3. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The Vite dev server automatically provides the `/api/chat` proxy with live Gemini AI responses and model fallback.

### 4. Build and Standalone Production Server

```bash
# Build the production bundle
npm run build

# Start the standalone production server
npm start
```

The standalone server serves the built frontend from `dist/` and runs the `/api/chat` proxy at `http://localhost:3000`.

---

## License

MIT © 2026 Rajveer Kol • CLAUDE × SHEIN Academy
