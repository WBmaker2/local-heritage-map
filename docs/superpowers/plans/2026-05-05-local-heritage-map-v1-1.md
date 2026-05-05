# Local Heritage Map v1.1 Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the released Gyeongbuk heritage map so it is easier to maintain, easier for students to add custom pins, and safer to use on school networks.

**Architecture:** Keep the current Vite + React + TypeScript app structure. Add small typed data/helpers for city coordinate presets, keep localStorage behavior in `src/lib/storage.ts`, keep map behavior inside `src/components/GyeongbukMap.tsx`, and put teacher-facing classroom material in `docs/` plus the existing `TeacherGuidePanel`.

**Tech Stack:** Vite, React, TypeScript, Leaflet, OpenStreetMap tiles, Vitest, Testing Library, CSS, GitHub Pages.

---

## File Structure

- Create: `README.md`
  - Public project overview, live URL, local setup, verification commands, data/source policy.
- Modify: `docs/superpowers/plans/2026-04-30-gyeongbuk-heritage-map-implementation.md`
  - Mark completed MVP tasks as checked so planning status matches the shipped app.
- Create: `src/data/cityPresets.ts`
  - Gyeongbuk city/county representative coordinates and lookup helper.
- Create: `src/data/cityPresets.test.ts`
  - Tests for preset lookup and coordinate bounds.
- Modify: `src/components/AddPinDialog.tsx`
  - Use city presets to auto-set coordinates when students enter a known Gyeongbuk 시군.
- Modify: `src/App.test.tsx`
  - Add custom pin city-preset behavior test.
- Modify: `src/components/GyeongbukMap.tsx`
  - Detect OpenStreetMap tile load failures and show a classroom-friendly fallback notice.
- Modify: `src/App.test.tsx`
  - Add map fallback notice test through a test-only custom browser event.
- Create: `docs/classroom-activity-guide.md`
  - 40-minute lesson guide, student activity prompts, teacher facilitation notes.
- Modify: `src/components/TeacherGuidePanel.tsx`
  - Add concise in-app reference to the new classroom guide.

---

### Task 1: Project Status and README

**Files:**
- Create: `README.md`
- Modify: `docs/superpowers/plans/2026-04-30-gyeongbuk-heritage-map-implementation.md`

- [x] **Step 1: Create `README.md`**

Write a Korean README with these exact sections:

```markdown
# 내 손안의 마을 지도: 우리 지역 문화유산 탐험대

초등 3~4학년 사회 수업에서 경상북도 실제 지도 위 문화유산을 탐험하고, 학생이 직접 조사한 문화유산 핀을 추가할 수 있는 웹앱입니다.

## 바로 열기

- 앱: https://wbmaker2.github.io/local-heritage-map/
- GitHub: https://github.com/WBmaker2/local-heritage-map

## 수업 맥락

- 대상: 초등 3~4학년군
- 과목: 사회
- 성취기준: `[4사05-02]`, `[4사06-01]`
- 활동: 지도에서 경상북도 문화유산 위치를 찾고, 유형·시대·가치를 기록합니다.

## 주요 기능

- OpenStreetMap 실제 지도 기반 문화유산 핀 탐험
- 기본 문화유산 7개 제공
- 문화유산 설명, 출처 링크, 학생 기록 모달
- 탐험 완료 진행률과 오늘의 미션
- 학생이 직접 조사한 문화유산 핀 추가
- 교사용 수업 안내 패널

## 로컬 실행

```bash
npm ci
npm run dev
```

## 검증

```bash
npm test -- --run
npm run build
npm audit --audit-level=moderate
```

## 지도와 자료 출처

- 지도: OpenStreetMap contributors, ODbL 1.0
- 문화유산 정보: 국가유산청 국가유산포털을 기준으로 3~4학년 수준으로 재작성한 요약문
- 문화유산 이미지는 외부 사진 복사 대신 수업용 일러스트 스타일 영역을 사용합니다.
```

- [x] **Step 2: Mark MVP implementation plan checkboxes complete**

In `docs/superpowers/plans/2026-04-30-gyeongbuk-heritage-map-implementation.md`, change every MVP checklist item under Task 1 through Task 4 from `- [ ]` to `- [x]`.

- [x] **Step 3: Verify docs diff**

Run: `git diff -- README.md docs/superpowers/plans/2026-04-30-gyeongbuk-heritage-map-implementation.md`

Expected: README is added and only checkbox state changes in the MVP plan.

---

### Task 2: Custom Pin City Presets

**Files:**
- Create: `src/data/cityPresets.ts`
- Create: `src/data/cityPresets.test.ts`
- Modify: `src/components/AddPinDialog.tsx`
- Modify: `src/App.test.tsx`

- [x] **Step 1: Write failing city preset data tests**

Create `src/data/cityPresets.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cityPresets, findCityPreset } from "./cityPresets";

describe("cityPresets", () => {
  it("includes representative coordinates for common classroom examples", () => {
    expect(findCityPreset("문경시")).toMatchObject({
      city: "문경시",
      latitude: expect.any(Number),
      longitude: expect.any(Number),
    });
    expect(findCityPreset(" 영주시 ")).toMatchObject({ city: "영주시" });
  });

  it("keeps every preset within the Gyeongbuk map bounds", () => {
    expect(cityPresets.length).toBeGreaterThanOrEqual(10);

    cityPresets.forEach((preset) => {
      expect(preset.latitude).toBeGreaterThanOrEqual(35.5);
      expect(preset.latitude).toBeLessThanOrEqual(37.2);
      expect(preset.longitude).toBeGreaterThanOrEqual(127.9);
      expect(preset.longitude).toBeLessThanOrEqual(130.0);
    });
  });
});
```

- [x] **Step 2: Run data test and verify it fails**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/data/cityPresets.test.ts`

Expected: FAIL because `src/data/cityPresets.ts` does not exist yet.

- [x] **Step 3: Implement `src/data/cityPresets.ts`**

```ts
export type CityPreset = {
  city: string;
  latitude: number;
  longitude: number;
  helperText: string;
};

export const cityPresets: CityPreset[] = [
  { city: "경주시", latitude: 35.8562, longitude: 129.2247, helperText: "경주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "안동시", latitude: 36.5684, longitude: 128.7294, helperText: "안동시 대표 위치로 좌표를 맞췄습니다." },
  { city: "영주시", latitude: 36.8057, longitude: 128.6241, helperText: "영주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "고령군", latitude: 35.725, longitude: 128.2624, helperText: "고령군 대표 위치로 좌표를 맞췄습니다." },
  { city: "문경시", latitude: 36.5865, longitude: 128.1868, helperText: "문경시 대표 위치로 좌표를 맞췄습니다." },
  { city: "포항시", latitude: 36.019, longitude: 129.3435, helperText: "포항시 대표 위치로 좌표를 맞췄습니다." },
  { city: "김천시", latitude: 36.1398, longitude: 128.1136, helperText: "김천시 대표 위치로 좌표를 맞췄습니다." },
  { city: "구미시", latitude: 36.1195, longitude: 128.3446, helperText: "구미시 대표 위치로 좌표를 맞췄습니다." },
  { city: "상주시", latitude: 36.4109, longitude: 128.1591, helperText: "상주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "예천군", latitude: 36.6577, longitude: 128.4529, helperText: "예천군 대표 위치로 좌표를 맞췄습니다." },
  { city: "청도군", latitude: 35.6474, longitude: 128.734, helperText: "청도군 대표 위치로 좌표를 맞췄습니다." },
  { city: "울진군", latitude: 36.9931, longitude: 129.4006, helperText: "울진군 대표 위치로 좌표를 맞췄습니다." },
];

export function findCityPreset(city: string) {
  const normalizedCity = city.trim();
  return cityPresets.find((preset) => preset.city === normalizedCity);
}
```

- [x] **Step 4: Run data test and verify it passes**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/data/cityPresets.test.ts`

Expected: PASS.

- [x] **Step 5: Write failing custom pin behavior test**

Add this test to `src/App.test.tsx`:

```ts
it("uses a known city preset when adding a custom pin", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "내 핀 추가" }));

  const dialog = screen.getByRole("dialog", { name: "내 문화유산 핀 추가" });
  fireEvent.change(within(dialog).getByLabelText("문화유산 이름"), {
    target: { value: "문경 옛길" },
  });
  fireEvent.change(within(dialog).getByLabelText("시군"), {
    target: { value: "문경시" },
  });

  expect(within(dialog).getByText("문경시 대표 위치로 좌표를 맞췄습니다.")).toBeInTheDocument();

  fireEvent.change(within(dialog).getByLabelText("한 줄 설명"), {
    target: { value: "옛길을 따라 사람들의 이동을 살펴볼 수 있습니다." },
  });
  fireEvent.change(within(dialog).getByLabelText("내가 생각한 가치"), {
    target: { value: "지역의 교통과 생활 이야기를 알려 주기 때문에 소중합니다." },
  });
  fireEvent.click(within(dialog).getByRole("button", { name: /핀 저장/ }));

  const savedPins = JSON.parse(window.localStorage.getItem("localHeritageMap.customPins.v1") ?? "[]");
  expect(savedPins[0]).toMatchObject({
    city: "문경시",
    latitude: 36.5865,
    longitude: 128.1868,
  });
});
```

- [x] **Step 6: Run app test and verify it fails**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/App.test.tsx`

Expected: FAIL because AddPinDialog does not yet use city presets.

- [x] **Step 7: Update `AddPinDialog`**

In `src/components/AddPinDialog.tsx`:

```ts
import { cityPresets, findCityPreset } from "../data/cityPresets";
```

Add state:

```ts
const [cityHelperText, setCityHelperText] = useState("시군을 입력하면 대표 위치로 좌표를 쉽게 맞출 수 있습니다.");
```

Add helper:

```ts
function handleCityChange(nextCity: string) {
  setCity(nextCity);
  const preset = findCityPreset(nextCity);

  if (!preset) {
    setCityHelperText("직접 좌표를 조정해 문화유산 위치를 맞춰 보세요.");
    return;
  }

  setLatitude(preset.latitude);
  setLongitude(preset.longitude);
  setCityHelperText(preset.helperText);
}
```

Change the city input:

```tsx
<input
  id="custom-city"
  required
  list="gyeongbuk-city-presets"
  value={city}
  onChange={(event) => handleCityChange(event.target.value)}
  placeholder="예: 문경시"
/>
<datalist id="gyeongbuk-city-presets">
  {cityPresets.map((preset) => (
    <option key={preset.city} value={preset.city} />
  ))}
</datalist>
<p className="pin-form__helper">{cityHelperText}</p>
```

- [x] **Step 8: Run app test and verify it passes**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/App.test.tsx`

Expected: PASS.

---

### Task 3: Map Tile Failure Notice

**Files:**
- Modify: `src/components/GyeongbukMap.tsx`
- Modify: `src/App.test.tsx`

- [x] **Step 1: Write failing fallback test**

Add this test to `src/App.test.tsx`:

```ts
it("shows a map loading notice when OpenStreetMap tiles fail", () => {
  render(<App />);

  window.dispatchEvent(new Event("local-heritage-map:tile-error"));

  expect(screen.getByRole("status", { name: "지도 상태" })).toHaveTextContent(
    "지도 타일을 불러오지 못했습니다.",
  );
});
```

- [x] **Step 2: Run app test and verify it fails**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/App.test.tsx`

Expected: FAIL because no visible map loading notice exists.

- [x] **Step 3: Implement fallback notice**

In `src/components/GyeongbukMap.tsx`:

```ts
import { useEffect, useRef, useState } from "react";
```

Add state:

```ts
const [hasTileError, setHasTileError] = useState(false);
```

After creating `tileLayer`:

```ts
const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

tileLayer.on("tileerror", () => setHasTileError(true));
tileLayer.addTo(map);
```

Add a test-only custom event listener:

```ts
useEffect(() => {
  const onTileError = () => setHasTileError(true);
  window.addEventListener("local-heritage-map:tile-error", onTileError);
  return () => window.removeEventListener("local-heritage-map:tile-error", onTileError);
}, []);
```

Render below the map canvas:

```tsx
{hasTileError ? (
  <p className="map-load-notice" role="status" aria-label="지도 상태">
    지도 타일을 불러오지 못했습니다. 잠시 뒤 새로고침하거나 학교 네트워크에서 OpenStreetMap 접속이 허용되는지 확인해 주세요.
  </p>
) : null}
```

- [x] **Step 4: Add CSS**

In `src/App.css`:

```css
.map-load-notice {
  margin: 10px auto 0;
  max-width: 860px;
  padding: 10px 12px;
  border: 1px solid #e8ca73;
  border-radius: 8px;
  background: #fff8dd;
  color: #6a4700;
  font-weight: 700;
  line-height: 1.5;
}
```

- [x] **Step 5: Run app test and verify it passes**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/App.test.tsx`

Expected: PASS.

---

### Task 4: Classroom Activity Guide

**Files:**
- Create: `docs/classroom-activity-guide.md`
- Modify: `src/components/TeacherGuidePanel.tsx`

- [x] **Step 1: Create the classroom guide**

Create `docs/classroom-activity-guide.md` with these sections:

```markdown
# 내 손안의 마을 지도 수업 활용 가이드

## 수업 개요

- 대상: 초등 3~4학년
- 과목: 사회
- 차시: 40분
- 핵심 질문: 문화유산은 어디에 있고, 왜 소중할까요?

## 40분 수업 흐름

| 단계 | 시간 | 활동 |
| --- | --- | --- |
| 도입 | 5분 | 경상북도의 위치를 확인하고 오늘의 탐험 미션을 안내합니다. |
| 지도 탐색 | 10분 | 기본 문화유산 핀을 눌러 위치, 유형, 시대를 살펴봅니다. |
| 가치 기록 | 10분 | 관심 문화유산 하나를 골라 소중한 까닭을 한 문장으로 씁니다. |
| 내 핀 추가 | 10분 | 우리 지역 문화유산을 조사해 새 핀을 추가합니다. |
| 정리 | 5분 | 친구가 찾은 문화유산을 보며 새롭게 알게 된 점을 나눕니다. |

## 학생 활동 문장 틀

- `○○은/는 ○○에 있어서 우리 지역의 특징을 알려 줍니다.`
- `○○은/는 오래전 사람들의 생활을 보여 주기 때문에 소중합니다.`
- `○○을/를 보존하려면 우리가 ○○해야 합니다.`

## 교사용 확인 질문

- 학생이 문화유산의 위치를 지도에서 말할 수 있는가?
- 학생이 문화유산의 유형을 자신의 말로 설명할 수 있는가?
- 학생이 문화유산의 가치를 한 문장으로 기록했는가?
- 학생이 새 핀을 추가할 때 개인정보를 입력하지 않았는가?
```

- [x] **Step 2: Update `TeacherGuidePanel`**

Add a short visible sentence:

```tsx
<p>
  자세한 40분 수업 흐름과 학생 문장 틀은 <code>docs/classroom-activity-guide.md</code>에 정리했습니다.
</p>
```

- [x] **Step 3: Run app test**

Run: `/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run src/App.test.tsx`

Expected: PASS.

---

### Task 5: Final Verification

**Files:**
- Modify as needed after feedback.

- [x] Run all tests:

```bash
/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vitest/vitest.mjs --run
```

Expected: 4 test files pass after adding `cityPresets.test.ts`.

- [x] Run app typecheck and build:

```bash
/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/node node_modules/vite/bin/vite.js build
```

Expected: both commands exit 0.

- [x] Run security check:

```bash
/Users/kimhongnyeon/.nvm/versions/node/v24.13.1/bin/npm audit --audit-level=moderate
```

Expected: `found 0 vulnerabilities`.

- [x] Verify working tree:

```bash
git status -sb
```

Expected: only intended v1.1 files modified.
