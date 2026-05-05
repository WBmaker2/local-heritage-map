# 내 손안의 마을 지도: 우리 지역 문화유산 탐험대

초등 3~4학년 사회 수업에서 경상북도 실제 지도 위 문화유산을 탐험하고, 학생이 직접 조사한 문화유산 핀을 추가할 수 있는 웹앱입니다.

## 바로 열기

- 앱: https://wbmaker2.github.io/local-heritage-map/
- GitHub: https://github.com/WBmaker2/local-heritage-map

## 수업 맥락

- 대상: 초등 3~4학년군
- 과목: 사회
- 성취기준: `[4사05-02]`, `[4사06-01]`
- 활동: 지도에서 경상북도 문화유산 위치를 찾고, 유형·시대·가치를 기록합니다.

## 주요 기능

- OpenStreetMap 실제 지도 기반 문화유산 핀 탐험
- 기본 문화유산 7개 제공
- 문화유산 설명, 출처 링크, 학생 기록 모달
- 탐험 완료 진행률과 오늘의 미션
- 학생이 직접 조사한 문화유산 핀 추가
- 학생 이름 없이 탐험 기록 인쇄
- 교사용 수업 안내 패널

## 로컬 실행

```bash
npm ci
npm run dev
```

## 검증

```bash
npm test -- --run
npm run build
npm audit --audit-level=moderate
```

## 지도와 자료 출처

- 지도: OpenStreetMap contributors, ODbL 1.0
- 문화유산 정보: 국가유산청 국가유산포털을 기준으로 3~4학년 수준으로 재작성한 요약문
- 문화유산 이미지는 외부 사진 복사 대신 수업용 일러스트 스타일 영역을 사용합니다.
