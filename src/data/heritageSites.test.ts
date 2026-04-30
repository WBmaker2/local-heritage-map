import { describe, expect, it } from "vitest";
import { heritageSites } from "./heritageSites";

describe("heritageSites", () => {
  it("contains the seven required Gyeongbuk heritage markers", () => {
    expect(heritageSites).toHaveLength(7);
    expect(heritageSites.map((site) => site.name)).toEqual([
      "경주 불국사",
      "경주 첨성대",
      "안동 하회마을",
      "안동 병산서원",
      "영주 부석사 무량수전",
      "영주 소수서원",
      "고령 지산동 고분군",
    ]);
  });

  it("keeps real map coordinates inside Gyeongbuk bounds", () => {
    for (const site of heritageSites) {
      expect(site.latitude).toBeGreaterThanOrEqual(35.5);
      expect(site.latitude).toBeLessThanOrEqual(37.2);
      expect(site.longitude).toBeGreaterThanOrEqual(128.0);
      expect(site.longitude).toBeLessThanOrEqual(129.6);
      expect(site.sourceUrl).toContain("heritage.go.kr");
      expect(site.description.length).toBeGreaterThan(35);
    }
  });
});
