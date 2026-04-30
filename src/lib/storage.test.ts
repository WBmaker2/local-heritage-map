import { beforeEach, describe, expect, it } from "vitest";
import type { CustomPin } from "../data/heritageSites";
import {
  clearHeritageMapProgress,
  loadCompletedSiteIds,
  loadCustomPins,
  loadNotes,
  saveCompletedSiteIds,
  saveCustomPins,
  saveNotes,
} from "./storage";

describe("storage helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves and loads student notes", () => {
    saveNotes({
      bulguksa: {
        siteId: "bulguksa",
        valueSentence: "신라 문화를 알려 주기 때문에 소중합니다.",
        question: "언제 만들었나요?",
        updatedAt: "2026-04-30T00:00:00.000Z",
      },
    });

    expect(loadNotes().bulguksa.valueSentence).toContain("신라 문화");
  });

  it("saves and clears custom pins and completed site ids", () => {
    const pin: CustomPin = {
      id: "custom-1",
      title: "우리 마을 비석",
      city: "문경시",
      category: "학생추가",
      latitude: 36.6,
      longitude: 128.2,
      description: "마을 입구에 있는 오래된 비석입니다.",
      valueSentence: "마을 이야기를 알려 주기 때문에 소중합니다.",
      createdAt: "2026-04-30T00:00:00.000Z",
      isCustom: true,
    };

    saveCustomPins([pin]);
    saveCompletedSiteIds(["bulguksa"]);

    expect(loadCustomPins()).toEqual([pin]);
    expect(loadCompletedSiteIds()).toEqual(["bulguksa"]);

    clearHeritageMapProgress();

    expect(loadCustomPins()).toEqual([]);
    expect(loadCompletedSiteIds()).toEqual([]);
    expect(loadNotes()).toEqual({});
  });
});
