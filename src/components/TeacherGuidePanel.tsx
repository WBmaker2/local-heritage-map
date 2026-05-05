import { BookOpen } from "lucide-react";

export function TeacherGuidePanel() {
  return (
    <details className="teacher-guide">
      <summary>
        <BookOpen size={18} aria-hidden="true" />
        교사용 보기
      </summary>
      <div className="teacher-guide__body">
        <p>
          학생이 경북 지도에서 문화유산 위치를 찾고, 유형과 가치를 한 문장으로
          정리하도록 안내합니다.
        </p>
        <p>
          자세한 40분 수업 흐름과 학생 문장 틀은 <code>docs/classroom-activity-guide.md</code>에
          정리했습니다.
        </p>
        <ol>
          <li>도입 5분: 경상북도 위치와 탐험 미션 확인</li>
          <li>탐색 12분: 기본 핀 3개 이상 눌러 보기</li>
          <li>조사 13분: 관심 문화유산 가치 문장 작성</li>
          <li>확장 7분: 자기 지역 문화유산 핀 추가</li>
          <li>정리 3분: 탐험 기록 출력 후 새롭게 알게 된 점 공유</li>
        </ol>
      </div>
    </details>
  );
}
