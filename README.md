# CLAUDE × SHEIN — Premium Student Portal

An interactive, frontend-only luxury student learning portal combining high-fashion editorial aesthetics with a modern student SaaS dashboard.

![Brand](https://img.shields.io/badge/Brand-CLAUDE%20%C3%97%20SHEIN-8D2635?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20CSS%20%7C%20Vite-171717?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-E8DDCF?style=for-the-badge)

---

## Overview

**CLAUDE × SHEIN** is a student dashboard representing a haute couture learning academy. It features a curated student dossier for **Rajveer Kol**, mentored by **Professor Burzin**, with a verified 100% attendance record and 4 completed foundational courses.

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

4. **Dashboard Overview**
   - Welcome banner: *"Welcome back, Rajveer"* & *"Your learning journey, all in one place."*
   - 4 Core Stat Cards: Attendance (100%), Courses Completed (4), Learning Streak (30 Days), Membership (1 Year).
   - Recent Activity timeline, Course Progress breakdown, Student Overview, and Faculty Mentor card.

4. **SHEIN Clothing Benefits Banner**
   - Prominently placed on the Dashboard and Rewards & Benefits page.
   - Exact copy:
     - *"Your Style. Your Rewards."*
     - *"You will get free clothes from SHEIN as per our policy."*
     - *"Your clothing benefits are subject to the applicable policy and eligibility requirements."*
   - Interactive CTA: *"Contact Your Professor"*, navigating directly to the Support Center with Professor Burzin pre-selected.

5. **Courses Page (`My Learning`)**
   - Tabs: All Courses, In Progress, Completed.
   - Category filtering (Technology, Programming, Design, Business) and real-time search.
   - 4 Preloaded Completed Courses:
     - *Introduction to Web Development* (Technology, 100%, Completed)
     - *Python Programming Fundamentals* (Programming, 100%, Completed)
     - *UI/UX Design Essentials* (Design, 100%, Completed)
     - *Digital Business Foundations* (Business, 100%, Completed)
   - Interactive course details modal with syllabus milestones, outcomes, and credential verification.
   - Persistent *"No New Courses Yet"* empty state beneath completed courses.

6. **Attendance Dashboard**
   - 100% Attendance Rate, 30 Present sessions, 0 Absent sessions.
   - Interactive 30-session matrix visualization.
   - Attendance history logs with month selector, status filter, and topic search.

7. **Support Center with 7-Hour Offline/Online Cycle**
   - Starts **OFFLINE** on initial visit: *"Support is currently offline. Our support team is taking a short break. Please check back later."*
   - 7-hour countdown timer (`Available in XXh YYm ZZs`) persisted across browser reloads.
   - Automatically switches to **ONLINE** after 7 hours elapsed time.
   - Local chat storage with contextual simulated assistant replies from Professor Burzin.
   - Dev simulation controls in Settings: *"Fast-Forward 7 Hours (Simulate Online)"* and *"Reset Support Session (0h Offline)"*.

8. **Achievements & Honors**
   - Milestones: *Perfect Attendance*, *First-Year Milestone*, *Learning Champion*, *Consistency Award*, *Haute Couture Digital Pioneer*, *Editorial Systems Master*.
   - Interactive badge modal with verification codes and confetti animation.

9. **Notification Center**
   - Top-bar dropdown + dedicated page.
   - Filter by All, Unread, Read, with mark read / mark all read / delete actions.

10. **Settings**
    - Theme switcher (Light Ivory / Dark Obsidian).
    - Reduced motion toggle.
    - Notification preferences.
    - Local application storage reset with safety disclosure.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations / Effects**: Canvas Confetti, Tailwind Animations
- **State Management**: Centralized React Context with safe `localStorage` synchronization
- **Architecture**: 100% Frontend-only, zero external APIs or database requirements

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Rajveerkol/claude.git
cd claude

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## License

MIT © 2026 Rajveer Kol • CLAUDE × SHEIN Academy
