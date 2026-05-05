import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cityPresets, findCityPreset } from "../data/cityPresets";
import type { CustomPin, HeritageCategory } from "../data/heritageSites";

type AddPinDialogProps = {
  onClose: () => void;
  onAddPin: (pin: CustomPin) => void;
};

const categoryOptions: HeritageCategory[] = ["사찰", "과학", "마을", "서원", "고분", "학생추가"];

export function AddPinDialog({ onClose, onAddPin }: AddPinDialogProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<HeritageCategory>("학생추가");
  const [description, setDescription] = useState("");
  const [valueSentence, setValueSentence] = useState("");
  const [latitude, setLatitude] = useState(36.45);
  const [longitude, setLongitude] = useState(128.75);
  const [cityHelperText, setCityHelperText] = useState("시군을 입력하면 대표 위치로 좌표를 쉽게 맞출 수 있습니다.");

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleCityChange(nextCity: string) {
    setCity(nextCity);
    const preset = findCityPreset(nextCity);

    if (!preset) {
      setCityHelperText("직접 좌표를 조정해 문화유산 위치를 맞춰 보세요.");
      return;
    }

    setLatitude(preset.latitude);
    setLongitude(preset.longitude);
    setCityHelperText(preset.helperText);
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="pin-dialog" role="dialog" aria-modal="true" aria-labelledby="add-pin-title">
        <button className="icon-button pin-dialog__close" type="button" onClick={onClose} aria-label="핀 추가 닫기">
          <X size={22} aria-hidden="true" />
        </button>
        <h2 id="add-pin-title" ref={titleRef} tabIndex={-1}>
          내 문화유산 핀 추가
        </h2>
        <form
          className="pin-form"
          onSubmit={(event) => {
            event.preventDefault();
            const nextPin: CustomPin = {
              id: `custom-${Date.now()}`,
              title: title.trim(),
              city: city.trim(),
              category,
              latitude,
              longitude,
              description: description.trim(),
              valueSentence: valueSentence.trim(),
              createdAt: new Date().toISOString(),
              isCustom: true,
            };
            onAddPin(nextPin);
          }}
        >
          <label htmlFor="custom-title">문화유산 이름</label>
          <input
            id="custom-title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 우리 마을 오래된 정자"
          />
          <label htmlFor="custom-city">시군</label>
          <input
            id="custom-city"
            required
            list="gyeongbuk-city-presets"
            value={city}
            onChange={(event) => handleCityChange(event.target.value)}
            placeholder="예: 문경시"
          />
          <datalist id="gyeongbuk-city-presets">
            {cityPresets.map((preset) => (
              <option key={preset.city} value={preset.city} />
            ))}
          </datalist>
          <p className="pin-form__helper">{cityHelperText}</p>
          <label htmlFor="custom-category">유형</label>
          <select
            id="custom-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as HeritageCategory)}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="custom-description">한 줄 설명</label>
          <textarea
            id="custom-description"
            required
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="어디에 있고 어떤 이야기가 있는지 적어 보세요."
          />
          <label htmlFor="custom-value">내가 생각한 가치</label>
          <input
            id="custom-value"
            required
            value={valueSentence}
            onChange={(event) => setValueSentence(event.target.value)}
            placeholder="왜 소중한지 한 문장으로 적어 보세요."
          />
          <div className="pin-form__sliders">
            <label htmlFor="custom-latitude">위도 {latitude.toFixed(4)}</label>
            <input
              id="custom-latitude"
              type="range"
              min="35.6"
              max="37.1"
              step="0.0001"
              value={latitude}
              onChange={(event) => setLatitude(Number(event.target.value))}
            />
            <label htmlFor="custom-longitude">경도 {longitude.toFixed(4)}</label>
            <input
              id="custom-longitude"
              type="range"
              min="128.0"
              max="129.6"
              step="0.0001"
              value={longitude}
              onChange={(event) => setLongitude(Number(event.target.value))}
            />
          </div>
          <button className="primary-button" type="submit">
            <Plus size={18} aria-hidden="true" />
            핀 저장
          </button>
        </form>
      </section>
    </div>
  );
}
