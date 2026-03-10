import { getCredits } from "./courseCredits"

/**
 * F 학점 제외 + 재수강 중복 제거 → 이수 완료 학수번호 배열
 * @param {{ id: string, grade: string }[]} rawCourses
 * @returns {string[]}
 */
export function filterCourses(rawCourses) {
  const gradeMap = new Map()
  for (const { id, grade } of rawCourses) {
    // 아직 등록 안 됐거나, 기존 값이 F인 경우 덮어쓰기 (비F 성적 우선)
    if (!gradeMap.has(id) || gradeMap.get(id) === "F") {
      gradeMap.set(id, grade)
    }
  }
  return [...gradeMap.entries()]
    .filter(([, grade]) => grade !== "F")
    .map(([id]) => id)
}

/**
 * 총학점 + 전공학점 합산
 * @param {Set<string>} takenSet - 이수 완료 학수번호 Set
 * @param {Set<string>} majorIds - 해당 전공의 전공 과목 학수번호 Set
 * @returns {{ totalCredits: number, majorCredits: number }}
 */
export function calcCredits(takenSet, majorIds) {
  let totalCredits = 0
  for (const id of takenSet) totalCredits += getCredits(id)
  let majorCredits = 0
  for (const id of majorIds) {
    if (takenSet.has(id)) majorCredits += getCredits(id)
  }
  return { totalCredits, majorCredits }
}
