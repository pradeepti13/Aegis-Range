# Aegis Range — Review 1 Prototype

Aegis Range is an adaptive cybersecurity training and learning platform.

This repository contains the **Review 1 Skeletal Prototype** focusing on the primary single-player learning loop:

```text
Login → Dashboard → Solo Mode → /challenge (Challenge Module) → Result
```

---

## Architecture & Ownership Separation

- **Person A (Platform Contributor)**:
  - Application shell & layout (`src/platform/layout/`)
  - Authentication terminal (`src/platform/pages/Login.jsx`)
  - Operator dashboard & stats (`src/platform/pages/Dashboard.jsx`)
  - Solo Mode briefing sector (`src/platform/pages/SoloMode.jsx`)
  - Navigation & global routing (`src/platform/App.jsx`)
  - Platform theme & styles (`src/platform/styles/platform.css`)
  - `/challenge` integration boundary & placeholder (`src/platform/components/ChallengePlaceholder.jsx`)

- **Person B (Challenge Contributor)**:
  - Challenge module directory: `src/features/challenge/`
  - Challenge view: `src/features/challenge/Challenge.jsx` (or `index.jsx`)
  - Local challenge dataset (Category: Web Security, Points: 100 XP, Flag: `AEGIS{sql_injection_basic}`)
  - Hint toggle, flag validation, and completion feedback

---

## Integration Contract for Person B

1. **Mounting Route**: The platform automatically routes to `/challenge` when the user clicks "Start Challenge" from Solo Mode.
2. **Component Location**: Person B should create `src/features/challenge/Challenge.jsx` (or `src/features/challenge/index.jsx`).
3. **Automatic Resolution**: `src/platform/App.jsx` dynamically detects and loads any component placed inside `src/features/challenge/` via Vite glob import. If Person B has not yet merged their module, the platform displays the informative `ChallengePlaceholder`.
4. **Scoring / Session Integration**: When the challenge is completed, the user can be redirected back to `/dashboard` or `/solo` where the operator's XP and solved count will reflect the completion.

---

## Quick Start (Local Run)

Ensure [Node.js](https://nodejs.org/) (v18+) is installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## Review 1 Verification Checklist

- [x] Application starts cleanly without errors.
- [x] Operator Login screen authenticates local/mock credentials.
- [x] Quick Demo Login button provided for reviewer convenience.
- [x] Dashboard displays Aegis Range branding, operator callsign, score (XP), and active track.
- [x] Solo Mode card navigates to `/solo`.
- [x] Locked cards cleanly communicate Phase 6 & Phase 8 future roadmap (Multiplayer & Cyber Twin).
- [x] Solo Mode page displays mission briefing for `SQL Injection — Login Bypass`.
- [x] "Start Challenge" button routes to `/challenge`.
- [x] Temporary integration placeholder clearly marks Person B's boundary.
- [x] Test score hook allows reviewer to simulate solve and observe Dashboard XP updating.
