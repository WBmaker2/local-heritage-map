import { Printer } from "lucide-react";
import type { MapSite } from "../data/heritageSites";
import { getSiteTitle } from "../data/heritageSites";
import type { StudentNote } from "../lib/storage";

type PrintReportPanelProps = {
  sites: MapSite[];
  notes: Record<string, StudentNote>;
  completedSiteIds: string[];
  onPrint: () => void;
};

export function PrintReportPanel({
  sites,
  notes,
  completedSiteIds,
  onPrint,
}: PrintReportPanelProps) {
  const printableRecords = sites
    .map((site) => ({
      site,
      note: notes[site.id],
      isCompleted: completedSiteIds.includes(site.id),
    }))
    .filter(({ note, isCompleted }) => note || isCompleted);
  const hasRecords = printableRecords.length > 0;

  return (
    <>
      <section className="print-panel" aria-label="탐험 기록 출력">
        <div className="print-panel__top">
          <div>
            <h2>탐험 기록 출력</h2>
            <p>이름 없이 저장한 기록만 정리해요.</p>
          </div>
          <span className="print-panel__count">{printableRecords.length}</span>
        </div>
        <button className="secondary-button print-panel__button" type="button" onClick={onPrint} disabled={!hasRecords}>
          <Printer size={18} aria-hidden="true" />
          탐험 기록 인쇄
        </button>
      </section>

      <section className="print-sheet" aria-label="인쇄용 탐험 기록">
        <header className="print-sheet__header">
          <p>내 손안의 마을 지도</p>
          <h2>우리 지역 문화유산 탐험 기록</h2>
        </header>
        {hasRecords ? (
          <div className="print-sheet__records">
            {printableRecords.map(({ site, note, isCompleted }) => (
              <article className="print-record" key={site.id}>
                <div className="print-record__title">
                  <span>{site.city}</span>
                  <h3>{getSiteTitle(site)}</h3>
                </div>
                <dl>
                  <div>
                    <dt>유형</dt>
                    <dd>{site.category}</dd>
                  </div>
                  <div>
                    <dt>탐험 상태</dt>
                    <dd>{isCompleted ? "탐험 완료" : "기록 저장"}</dd>
                  </div>
                  <div>
                    <dt>가치 문장</dt>
                    <dd>{note?.valueSentence || "아직 적지 않았습니다."}</dd>
                  </div>
                  <div>
                    <dt>더 알아보고 싶은 점</dt>
                    <dd>{note?.question || "아직 적지 않았습니다."}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <p className="print-sheet__empty">아직 저장된 탐험 기록이 없습니다.</p>
        )}
      </section>
    </>
  );
}
