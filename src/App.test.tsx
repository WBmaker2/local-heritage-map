import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import "./App.css";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("opens a heritage marker, saves a note, completes exploration, and restores focus", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "내 손안의 마을 지도" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "OpenStreetMap contributors" })).toBeInTheDocument();
    expect(screen.getByText(/ODbL 1.0/)).toBeInTheDocument();

    const marker = screen.getByTestId("marker-bulguksa");
    fireEvent.click(marker);

    const dialog = screen.getByRole("dialog", { name: "경주 불국사" });
    expect(within(dialog).getByText("통일신라시대")).toBeInTheDocument();

    fireEvent.change(within(dialog).getByLabelText(/불국사를 오래 보존/), {
      target: { value: "신라 문화를 알려 주기 때문에 소중합니다." },
    });
    fireEvent.change(within(dialog).getByLabelText("더 알아보고 싶은 점"), {
      target: { value: "석축은 어떻게 만들었을까?" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "기록 저장" }));

    expect(screen.getByRole("status")).toHaveTextContent("탐험 기록을 저장했습니다.");

    fireEvent.click(within(dialog).getByRole("button", { name: "탐험 완료" }));
    expect(screen.getByText("탐험 1/7")).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "팝업 닫기" }));

    await waitFor(() => expect(marker).toHaveFocus());
  });

  it("keeps the modal layer above Leaflet map layers", () => {
    const css = readFileSync(resolve(__dirname, "App.css"), "utf8");
    const modalBackdropRule = css.match(/\.modal-backdrop\s*\{[^}]+z-index:\s*(\d+);/);

    expect(modalBackdropRule).not.toBeNull();
    expect(Number(modalBackdropRule![1])).toBeGreaterThan(1000);
  });

  it("filters markers by city", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "안동시" }));

    expect(screen.getByTestId("marker-hahoe")).toBeInTheDocument();
    expect(screen.getByTestId("marker-byeongsan")).toBeInTheDocument();
    expect(screen.queryByTestId("marker-bulguksa")).not.toBeInTheDocument();
  });

  it("adds a student custom pin and shows it on the map", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "내 핀 추가" }));

    const dialog = screen.getByRole("dialog", { name: "내 문화유산 핀 추가" });
    fireEvent.change(within(dialog).getByLabelText("문화유산 이름"), {
      target: { value: "우리 마을 성터" },
    });
    fireEvent.change(within(dialog).getByLabelText("시군"), {
      target: { value: "문경시" },
    });
    fireEvent.change(within(dialog).getByLabelText("한 줄 설명"), {
      target: { value: "마을 가까이에 남아 있는 옛 성터입니다." },
    });
    fireEvent.change(within(dialog).getByLabelText("내가 생각한 가치"), {
      target: { value: "마을의 옛 모습을 알려 주기 때문에 소중합니다." },
    });

    fireEvent.click(within(dialog).getByRole("button", { name: /핀 저장/ }));

    expect(screen.getByTestId(/marker-custom-/)).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "우리 마을 성터" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("우리 마을 성터 핀을 지도에 추가했습니다.");
  });
});
