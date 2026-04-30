import { CheckCircle2 } from "lucide-react";
import { missions } from "../data/missions";

type MissionPanelProps = {
  completedSiteIds: string[];
  noteCount: number;
};

export function MissionPanel({ completedSiteIds, noteCount }: MissionPanelProps) {
  const completedMissionIds = missions
    .filter((mission) => {
      if (mission.id === "favorite-value") {
        return noteCount > 0;
      }

      return completedSiteIds.some((siteId) => mission.matcher(siteId));
    })
    .map((mission) => mission.id);

  return (
    <aside className="mission-panel" aria-label="오늘의 탐험 미션">
      <div className="mission-panel__top">
        <span className="mission-panel__count">
          {completedMissionIds.length}/{missions.length}
        </span>
        <div>
          <h2>오늘의 탐험 미션</h2>
          <p>위치, 유형, 가치를 차례로 확인해요.</p>
        </div>
      </div>
      <ul className="mission-list">
        {missions.map((mission) => {
          const done = completedMissionIds.includes(mission.id);
          return (
            <li key={mission.id} className={done ? "mission-item is-done" : "mission-item"}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <div>
                <strong>{mission.title}</strong>
                <span>{mission.description}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
