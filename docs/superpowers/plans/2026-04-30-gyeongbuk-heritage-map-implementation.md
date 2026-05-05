# Gyeongbuk Heritage Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a usable Korean classroom web app where 3-4th grade students explore Gyeongbuk cultural heritage on an interactive map.

**Architecture:** Use a Vite + React + TypeScript single-page app. Keep heritage and mission data in typed data modules, localStorage logic in a small library, and the screen in focused components. Use Leaflet with OpenStreetMap tiles and latitude/longitude marker data for the real map background.

**Tech Stack:** Vite, React, TypeScript, Leaflet, OpenStreetMap tiles, Vitest, Testing Library, CSS.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`

- [x] Create the Vite React TypeScript baseline with `dev`, `build`, and `test` scripts.
- [x] Configure Vitest with jsdom and Testing Library setup.
- [x] Mount `App` into `#root`.

### Task 2: Data and Storage

**Files:**
- Create: `src/data/heritageSites.ts`
- Create: `src/data/missions.ts`
- Create: `src/lib/storage.ts`
- Test: `src/data/heritageSites.test.ts`
- Test: `src/lib/storage.test.ts`

- [x] Add six Gyeongbuk heritage entries with source URLs and percentage map positions.
- [x] Add three classroom missions.
- [x] Implement safe localStorage helpers for notes, completed sites, and custom pins.
- [x] Test required data fields, coordinate bounds, and storage round trips.

### Task 3: Interactive App UI

**Files:**
- Create: `src/App.tsx`
- Create: `src/App.css`
- Create: `src/components/GyeongbukMap.tsx`
- Create: `src/components/SiteModal.tsx`
- Create: `src/components/MissionPanel.tsx`
- Create: `src/components/HeritageFilter.tsx`
- Create: `src/components/AddPinDialog.tsx`
- Create: `src/components/TeacherGuidePanel.tsx`
- Test: `src/App.test.tsx`

- [x] Render a first-screen app, not a landing page.
- [x] Display the OpenStreetMap-based Gyeongbuk map and marker buttons.
- [x] Open a modal with heritage details, note entry, and completion action.
- [x] Save notes, completed state, and custom pins to localStorage.
- [x] Add filters by region/type and a teacher guide panel.
- [x] Test marker click, modal behavior, note save, completion progress, filtering, custom pin creation, and accessible labels.

### Task 4: Verification

**Files:**
- Modify as needed after test/build feedback.

- [x] Run `npm install`.
- [x] Run `npm test -- --run`.
- [x] Run `npm run build`.
- [x] Start `npm run dev` and verify the app opens locally.
