import { Plus, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { AddPinDialog } from "./components/AddPinDialog";
import { GyeongbukMap } from "./components/GyeongbukMap";
import { HeritageFilter } from "./components/HeritageFilter";
import { MissionPanel } from "./components/MissionPanel";
import { PrintReportPanel } from "./components/PrintReportPanel";
import { SiteModal } from "./components/SiteModal";
import { TeacherGuidePanel } from "./components/TeacherGuidePanel";
import { getSiteTitle, heritageSites, type CustomPin, type MapSite } from "./data/heritageSites";
import {
  clearHeritageMapProgress,
  loadCompletedSiteIds,
  loadCustomPins,
  loadNotes,
  saveCompletedSiteIds,
  saveCustomPins,
  saveNotes,
  type StudentNote,
} from "./lib/storage";

function isCustomPin(site: MapSite): site is CustomPin {
  return "isCustom" in site && site.isCustom === true;
}

function filterSites(sites: MapSite[], selectedFilter: string) {
  if (selectedFilter === "전체") {
    return sites;
  }

  if (selectedFilter === "내 핀") {
    return sites.filter(isCustomPin);
  }

  return sites.filter((site) => site.city === selectedFilter);
}

export default function App() {
  const [notes, setNotes] = useState<Record<string, StudentNote>>(() => loadNotes());
  const [customPins, setCustomPins] = useState<CustomPin[]>(() => loadCustomPins());
  const [completedSiteIds, setCompletedSiteIds] = useState<string[]>(() => loadCompletedSiteIds());
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [selectedSiteId, setSelectedSiteId] = useState<string | undefined>();
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [liveMessage, setLiveMessage] = useState("경상북도 문화유산 지도가 준비되었습니다.");

  const allSites = useMemo<MapSite[]>(() => [...heritageSites, ...customPins], [customPins]);
  const visibleSites = useMemo(
    () => filterSites(allSites, selectedFilter),
    [allSites, selectedFilter],
  );
  const selectedSite = allSites.find((site) => site.id === selectedSiteId);
  const noteCount = Object.values(notes).filter((note) => note.valueSentence.trim().length > 0).length;
  const completedDefaultCount = completedSiteIds.filter((id) =>
    heritageSites.some((site) => site.id === id),
  ).length;

  function returnFocusToMarker(siteId?: string) {
    if (!siteId) {
      return;
    }

    window.setTimeout(() => {
      const marker = document.querySelector<HTMLButtonElement>(`[data-testid="marker-${siteId}"]`);
      marker?.focus();
    }, 0);
  }

  function closeSiteModal() {
    const closingSiteId = selectedSiteId;
    setSelectedSiteId(undefined);
    returnFocusToMarker(closingSiteId);
  }

  function handleSelectSite(site: MapSite) {
    setSelectedSiteId(site.id);
    setLiveMessage(`${getSiteTitle(site)} 정보를 열었습니다.`);
  }

  function handleSaveNote(siteId: string, valueSentence: string, question: string) {
    const nextNotes = {
      ...notes,
      [siteId]: {
        siteId,
        valueSentence,
        question,
        updatedAt: new Date().toISOString(),
      },
    };
    setNotes(nextNotes);
    saveNotes(nextNotes);
    setLiveMessage("탐험 기록을 저장했습니다.");
  }

  function handleComplete(siteId: string) {
    if (completedSiteIds.includes(siteId)) {
      setLiveMessage("이미 탐험 완료한 문화유산입니다.");
      return;
    }

    const nextCompleted = [...completedSiteIds, siteId];
    setCompletedSiteIds(nextCompleted);
    saveCompletedSiteIds(nextCompleted);
    setLiveMessage("탐험 완료로 표시했습니다.");
  }

  function handleAddPin(pin: CustomPin) {
    const nextPins = [...customPins, pin];
    const nextNotes = {
      ...notes,
      [pin.id]: {
        siteId: pin.id,
        valueSentence: pin.valueSentence,
        question: "",
        updatedAt: pin.createdAt,
      },
    };
    setCustomPins(nextPins);
    saveCustomPins(nextPins);
    setNotes(nextNotes);
    saveNotes(nextNotes);
    setIsAddingPin(false);
    setSelectedFilter("내 핀");
    setSelectedSiteId(pin.id);
    setLiveMessage(`${pin.title} 핀을 지도에 추가했습니다.`);
  }

  function handleReset() {
    if (!window.confirm("탐험 기록과 내가 추가한 핀을 모두 지울까요?")) {
      return;
    }

    clearHeritageMapProgress();
    setNotes({});
    setCustomPins([]);
    setCompletedSiteIds([]);
    setSelectedFilter("전체");
    setSelectedSiteId(undefined);
    setLiveMessage("탐험 기록을 초기화했습니다.");
  }

  function handlePrintReport() {
    setLiveMessage("탐험 기록 출력 화면을 준비했습니다.");
    window.print();
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <span className="brand-mark" aria-hidden="true">
            4사
          </span>
          <div>
            <h1>내 손안의 마을 지도</h1>
            <p>우리 지역 문화유산 탐험대</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="progress-pill" aria-label={`기본 문화유산 ${completedDefaultCount}개 탐험 완료`}>
            탐험 {completedDefaultCount}/{heritageSites.length}
          </span>
          <button className="secondary-button" type="button" onClick={() => setIsAddingPin(true)}>
            <Plus size={18} aria-hidden="true" />
            내 핀 추가
          </button>
          <button className="icon-button" type="button" onClick={handleReset} aria-label="탐험 기록 초기화">
            <RotateCcw size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main__left">
          <HeritageFilter selectedFilter={selectedFilter} onChange={setSelectedFilter} />
          <GyeongbukMap
            sites={visibleSites}
            selectedSiteId={selectedSiteId}
            completedSiteIds={completedSiteIds}
            onSelectSite={handleSelectSite}
          />
        </div>
        <div className="app-main__right">
          <MissionPanel completedSiteIds={completedSiteIds} noteCount={noteCount} />
          <PrintReportPanel
            sites={allSites}
            notes={notes}
            completedSiteIds={completedSiteIds}
            onPrint={handlePrintReport}
          />
          <TeacherGuidePanel />
        </div>
      </main>

      <div className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </div>

      {selectedSite ? (
        <SiteModal
          site={selectedSite}
          note={notes[selectedSite.id]}
          isCompleted={completedSiteIds.includes(selectedSite.id)}
          onClose={closeSiteModal}
          onSaveNote={handleSaveNote}
          onComplete={handleComplete}
        />
      ) : null}

      {isAddingPin ? <AddPinDialog onClose={() => setIsAddingPin(false)} onAddPin={handleAddPin} /> : null}
    </div>
  );
}
