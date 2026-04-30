export type Mission = {
  id: string;
  title: string;
  description: string;
  matcher: (siteId: string) => boolean;
};

export const missions: Mission[] = [
  {
    id: "south-east",
    title: "경북 남동쪽 문화유산 찾기",
    description: "경주에 있는 문화유산을 하나 탐험해요.",
    matcher: (siteId) => siteId === "bulguksa" || siteId === "cheomseongdae",
  },
  {
    id: "life-place",
    title: "사람들의 생활 공간 찾기",
    description: "마을이나 서원 문화유산을 하나 살펴봐요.",
    matcher: (siteId) => siteId === "hahoe" || siteId === "byeongsan" || siteId === "sosuseowon",
  },
  {
    id: "favorite-value",
    title: "가치 한 문장 남기기",
    description: "문화유산 하나를 고르고 소중한 까닭을 적어요.",
    matcher: () => true,
  },
];
