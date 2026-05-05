# Local Heritage Map v1.2 Classroom Operations Plan

**Goal:** Improve classroom operation after the v1.1 release by adding a student-name-free exploration record print flow and refreshing the public archive entry after deployment.

**Architecture:** Keep all saved exploration data in the existing `notes`, `completedSiteIds`, and `customPins` state. Add a small React panel for print controls and a print-only report section controlled by CSS. Update docs and archive metadata after the GitHub Pages deployment succeeds.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, CSS print media, GitHub Pages, Hong's Vibe Coding Lab admin registration workflow.

## Tasks

- [x] Create a v1.2 branch for classroom print work.
- [x] Add `PrintReportPanel` with a disabled state when no records exist.
- [x] Render an anonymous print-only exploration report from saved notes and completed sites.
- [x] Add CSS print rules so the printed page shows only the report.
- [x] Cover the print flow with an app-level test.
- [x] Update README and classroom activity guide with the print workflow.
- [x] Run full verification.
- [x] Commit, push, and redeploy GitHub Pages.
- [x] Update and verify the Hong's Vibe Coding Lab archive card with the refreshed app state.
