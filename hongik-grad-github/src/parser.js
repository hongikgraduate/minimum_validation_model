/**
 * 클래스넷 전체성적 텍스트 파싱 (raw)
 * F 제외 / 재수강 처리는 req_sum.js의 filterCourses에서 담당
 * @param {string} text
 * @returns {{ id: string, grade: string }[]}
 */
export function parseCourses(text) {
  const courses = []
  for (const line of text.split("\n")) {
    const parts = line.trim().split("\t")
    if (parts.length < 2) continue
    const idMatch = parts[0].match(/^(\d{6})$/)
    if (!idMatch) continue
    courses.push({ id: idMatch[1], grade: parts[parts.length - 1].trim() })
  }
  return courses
}
