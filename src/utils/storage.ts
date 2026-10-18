// Centralized localStorage utilities with safe parsing and default fallbacks

export const STORAGE_KEYS = {
  PROFILE: 'claude_shein_profile_v1',
  COURSES: 'claude_shein_courses_v1',
  ATTENDANCE: 'claude_shein_attendance_v1',
  ACHIEVEMENTS: 'claude_shein_achievements_v1',
  REWARDS: 'claude_shein_rewards_v1',
  NOTIFICATIONS: 'claude_shein_notifications_v1',
  SETTINGS: 'claude_shein_settings_v1',
  SUPPORT_STATE: 'claude_shein_support_state_v1',
  ACTIVE_PAGE: 'claude_shein_active_page_v1',
} as const;

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to parse item "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Failed to save item "${key}" to localStorage:`, error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove item "${key}" from localStorage:`, error);
  }
}

export function clearAllPortalStorage(): void {
  Object.values(STORAGE_KEYS).forEach((k) => {
    removeFromStorage(k);
  });
}
