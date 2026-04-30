export type HeritageCategory =
  | "사찰"
  | "과학"
  | "마을"
  | "서원"
  | "고분"
  | "학생추가";

export type HeritageSite = {
  id: string;
  name: string;
  city: string;
  category: HeritageCategory;
  heritageType: string;
  period: string;
  latitude: number;
  longitude: number;
  imageAlt: string;
  imageTone: string;
  description: string;
  studentPrompt: string;
  sourceUrl: string;
  isCustom?: false;
};

export type CustomPin = {
  id: string;
  title: string;
  city: string;
  category: HeritageCategory;
  latitude: number;
  longitude: number;
  description: string;
  valueSentence: string;
  createdAt: string;
  isCustom: true;
};

export type MapSite = HeritageSite | CustomPin;

export const heritageSites: HeritageSite[] = [
  {
    id: "bulguksa",
    name: "경주 불국사",
    city: "경주시",
    category: "사찰",
    heritageType: "사적",
    period: "통일신라시대",
    latitude: 35.7889948,
    longitude: 129.3308902,
    imageAlt: "불국사의 계단과 석축을 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "temple",
    description:
      "불국사는 통일신라 사람들이 불교 문화를 바탕으로 만든 대표적인 절입니다. 경주가 신라 문화의 중심지였음을 알려 주는 중요한 문화유산입니다.",
    studentPrompt: "불국사를 오래 보존해야 하는 까닭을 한 문장으로 써 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1333705020000",
  },
  {
    id: "cheomseongdae",
    name: "경주 첨성대",
    city: "경주시",
    category: "과학",
    heritageType: "국보",
    period: "신라시대",
    latitude: 35.834704,
    longitude: 129.2189849,
    imageAlt: "밤하늘과 첨성대를 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "science",
    description:
      "첨성대는 신라 사람들이 하늘을 관찰하고 계절의 변화를 살폈던 과학 문화유산입니다. 옛사람들의 과학 기술과 생활 지혜를 함께 생각해 볼 수 있습니다.",
    studentPrompt: "첨성대를 보면 알 수 있는 신라 사람들의 지혜를 적어 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1113700310000",
  },
  {
    id: "hahoe",
    name: "안동 하회마을",
    city: "안동시",
    category: "마을",
    heritageType: "국가민속문화유산",
    period: "조선시대",
    latitude: 36.5390405,
    longitude: 128.5185864,
    imageAlt: "강이 감싸는 전통 마을을 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "village",
    description:
      "하회마을은 낙동강이 마을을 감싸 흐르는 곳에 자리한 전통 마을입니다. 옛집, 마을길, 생활 모습을 통해 조선 시대 사람들의 삶을 살펴볼 수 있습니다.",
    studentPrompt: "하회마을의 위치와 자연환경이 마을 생활에 준 영향을 생각해 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1483701220000",
  },
  {
    id: "byeongsan",
    name: "안동 병산서원",
    city: "안동시",
    category: "서원",
    heritageType: "사적",
    period: "조선 선조 5년",
    latitude: 36.5405135,
    longitude: 128.5527177,
    imageAlt: "서원 마루와 산세를 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "academy",
    description:
      "병산서원은 조선 시대에 공부하고 제사를 지내던 교육 공간입니다. 주변 산과 강이 어우러진 장소라서 자연과 배움의 관계를 생각해 볼 수 있습니다.",
    studentPrompt: "서원이 마을과 지역에 어떤 도움을 주었을지 적어 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1333702600000",
  },
  {
    id: "buseoksa",
    name: "영주 부석사 무량수전",
    city: "영주시",
    category: "사찰",
    heritageType: "국보",
    period: "고려시대 중기",
    latitude: 36.9973878,
    longitude: 128.6866489,
    imageAlt: "산속 절과 목조 건물을 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "wood",
    description:
      "부석사 무량수전은 고려 시대 목조 건축을 대표하는 건물입니다. 경북 북부 산지에 자리해 옛 건축과 자연환경을 함께 살펴볼 수 있습니다.",
    studentPrompt: "오래된 나무 건물을 지키기 위해 필요한 일을 생각해 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1113700180000",
  },
  {
    id: "sosuseowon",
    name: "영주 소수서원",
    city: "영주시",
    category: "서원",
    heritageType: "사적",
    period: "조선 중종 38년",
    latitude: 36.9252329,
    longitude: 128.5801059,
    imageAlt: "소수서원의 강학 공간과 숲길을 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "academy",
    description:
      "소수서원은 조선 시대에 세워진 우리나라의 대표적인 서원입니다. 선비들이 학문을 배우고 스승을 기리던 공간을 통해 지역 교육과 유교 문화를 살펴볼 수 있습니다.",
    studentPrompt: "소수서원이 지역의 배움과 문화에 어떤 의미가 있는지 써 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1333700550000",
  },
  {
    id: "jisandong",
    name: "고령 지산동 고분군",
    city: "고령군",
    category: "고분",
    heritageType: "사적",
    period: "가야시대",
    latitude: 35.7216252,
    longitude: 128.2573379,
    imageAlt: "언덕 위 고분군을 떠올리게 하는 수업용 일러스트 영역",
    imageTone: "tombs",
    description:
      "지산동 고분군은 대가야 사람들이 만든 무덤들이 모여 있는 곳입니다. 경북 서남부에 있던 가야 문화의 모습을 알려 주는 중요한 유산입니다.",
    studentPrompt: "고분군이 대가야 문화를 알려 주는 까닭을 써 보세요.",
    sourceUrl:
      "https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1333700790000",
  },
];

export const cityOptions = ["전체", "경주시", "안동시", "영주시", "고령군", "내 핀"] as const;

export function getSiteTitle(site: MapSite) {
  return "isCustom" in site && site.isCustom ? site.title : site.name;
}

export function getSiteDescription(site: MapSite) {
  return "isCustom" in site && site.isCustom ? site.description : site.description;
}
