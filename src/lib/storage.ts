import type { CustomPin } from "../data/heritageSites";

export type StudentNote = {
  siteId: string;
  valueSentence: string;
  question: string;
  updatedAt: string;
};

const NOTES_KEY = "localHeritageMap.notes.v1";
const CUSTOM_PINS_KEY = "localHeritageMap.customPins.v1";
const COMPLETED_KEY = "localHeritageMap.completed.v1";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadNotes() {
  return readJson<Record<string, StudentNote>>(NOTES_KEY, {});
}

export function saveNotes(notes: Record<string, StudentNote>) {
  writeJson(NOTES_KEY, notes);
}

export function loadCustomPins() {
  return readJson<CustomPin[]>(CUSTOM_PINS_KEY, []);
}

export function saveCustomPins(pins: CustomPin[]) {
  writeJson(CUSTOM_PINS_KEY, pins);
}

export function loadCompletedSiteIds() {
  return readJson<string[]>(COMPLETED_KEY, []);
}

export function saveCompletedSiteIds(siteIds: string[]) {
  writeJson(COMPLETED_KEY, siteIds);
}

export function clearHeritageMapProgress() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(NOTES_KEY);
  window.localStorage.removeItem(CUSTOM_PINS_KEY);
  window.localStorage.removeItem(COMPLETED_KEY);
}
