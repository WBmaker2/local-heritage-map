import { BookOpen, CheckCircle2, ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MapSite } from "../data/heritageSites";
import { getSiteDescription, getSiteTitle } from "../data/heritageSites";
import type { StudentNote } from "../lib/storage";

type SiteModalProps = {
  site: MapSite;
  note?: StudentNote;
  isCompleted: boolean;
  onClose: () => void;
  onSaveNote: (siteId: string, valueSentence: string, question: string) => void;
  onComplete: (siteId: string) => void;
};

export function SiteModal({
  site,
  note,
  isCompleted,
  onClose,
  onSaveNote,
  onComplete,
}: SiteModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [valueSentence, setValueSentence] = useState(note?.valueSentence ?? "");
  const [question, setQuestion] = useState(note?.question ?? "");
  const title = getSiteTitle(site);
  const isCustom = "isCustom" in site && site.isCustom;
  const category = site.category;
  const period = isCustom ? "학생 조사" : site.period;
  const type = isCustom ? "학생 추가 핀" : site.heritageType;
  const sourceUrl = isCustom ? undefined : site.sourceUrl;
  const prompt = isCustom ? "내가 찾은 문화유산의 가치를 정리해 보세요." : site.studentPrompt;

  useEffect(() => {
    titleRef.current?.focus();
  }, [site.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="site-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-modal-title"
      >
        <button className="icon-button site-modal__close" type="button" onClick={onClose} aria-label="팝업 닫기">
          <X size={22} aria-hidden="true" />
        </button>
        <div className={`site-visual site-visual--${isCustom ? "custom" : site.imageTone}`} role="img" aria-label={isCustom ? `${title} 학생 추가 핀` : site.imageAlt}>
          <span>{category}</span>
        </div>
        <div className="site-modal__content">
          <p className="site-modal__place">{site.city}</p>
          <h2 id="site-modal-title" tabIndex={-1} ref={titleRef}>
            {title}
          </h2>
          <dl className="fact-grid">
            <div>
              <dt>유형</dt>
              <dd>{type}</dd>
            </div>
            <div>
              <dt>시대</dt>
              <dd>{period}</dd>
            </div>
          </dl>
          <p className="site-modal__description">{getSiteDescription(site)}</p>
          {sourceUrl ? (
            <a className="source-link" href={sourceUrl} target="_blank" rel="noreferrer">
              국가유산포털 자료 보기
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          ) : null}
          <form
            className="student-note"
            onSubmit={(event) => {
              event.preventDefault();
              onSaveNote(site.id, valueSentence.trim(), question.trim());
            }}
          >
            <label htmlFor="valueSentence">
              <BookOpen size={18} aria-hidden="true" />
              {prompt}
            </label>
            <textarea
              id="valueSentence"
              value={valueSentence}
              onChange={(event) => setValueSentence(event.target.value)}
              placeholder="예: 오래전 사람들의 생활과 생각을 알려 주기 때문에 소중합니다."
              rows={3}
            />
            <label htmlFor="question">더 알아보고 싶은 점</label>
            <input
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="예: 이 건물은 어떻게 오래 남아 있었을까?"
            />
            <div className="site-modal__actions">
              <button type="submit" className="primary-button">
                기록 저장
              </button>
              <button
                type="button"
                className={isCompleted ? "secondary-button is-completed" : "secondary-button"}
                onClick={() => onComplete(site.id)}
              >
                <CheckCircle2 size={18} aria-hidden="true" />
                {isCompleted ? "탐험 완료됨" : "탐험 완료"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
