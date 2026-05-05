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
