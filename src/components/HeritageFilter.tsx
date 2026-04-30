import { Search } from "lucide-react";
import { cityOptions } from "../data/heritageSites";

type HeritageFilterProps = {
  selectedFilter: string;
  onChange: (filter: string) => void;
};

export function HeritageFilter({ selectedFilter, onChange }: HeritageFilterProps) {
  return (
    <section className="filter-strip" aria-label="지도 필터">
      <div className="filter-strip__title">
        <Search size={18} aria-hidden="true" />
        <span>탐험 지역</span>
      </div>
      <div className="filter-strip__buttons">
        {cityOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={selectedFilter === option ? "filter-chip is-active" : "filter-chip"}
            onClick={() => onChange(option)}
            aria-pressed={selectedFilter === option}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
