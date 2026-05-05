export type CityPreset = {
  city: string;
  latitude: number;
  longitude: number;
  helperText: string;
};

export const cityPresets: CityPreset[] = [
  { city: "경주시", latitude: 35.8562, longitude: 129.2247, helperText: "경주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "안동시", latitude: 36.5684, longitude: 128.7294, helperText: "안동시 대표 위치로 좌표를 맞췄습니다." },
  { city: "영주시", latitude: 36.8057, longitude: 128.6241, helperText: "영주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "고령군", latitude: 35.725, longitude: 128.2624, helperText: "고령군 대표 위치로 좌표를 맞췄습니다." },
  { city: "문경시", latitude: 36.5865, longitude: 128.1868, helperText: "문경시 대표 위치로 좌표를 맞췄습니다." },
  { city: "포항시", latitude: 36.019, longitude: 129.3435, helperText: "포항시 대표 위치로 좌표를 맞췄습니다." },
  { city: "김천시", latitude: 36.1398, longitude: 128.1136, helperText: "김천시 대표 위치로 좌표를 맞췄습니다." },
  { city: "구미시", latitude: 36.1195, longitude: 128.3446, helperText: "구미시 대표 위치로 좌표를 맞췄습니다." },
  { city: "상주시", latitude: 36.4109, longitude: 128.1591, helperText: "상주시 대표 위치로 좌표를 맞췄습니다." },
  { city: "예천군", latitude: 36.6577, longitude: 128.4529, helperText: "예천군 대표 위치로 좌표를 맞췄습니다." },
  { city: "청도군", latitude: 35.6474, longitude: 128.734, helperText: "청도군 대표 위치로 좌표를 맞췄습니다." },
  { city: "울진군", latitude: 36.9931, longitude: 129.4006, helperText: "울진군 대표 위치로 좌표를 맞췄습니다." },
];

export function findCityPreset(city: string) {
  const normalizedCity = city.trim();
  return cityPresets.find((preset) => preset.city === normalizedCity);
}
