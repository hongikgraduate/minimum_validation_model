/**
 * 클래스넷 전체성적 텍스트 파싱
 * @param {string} text
 * @returns {string[]} 이수한 학수번호 배열
 */
export function parseCourseIds(text) {
  const courseIds = []
  for (const line of text.split("\n")) {
    const match = line.trim().match(/^(\d{6})\t/)
    if (match) courseIds.push(match[1])
  }
  return courseIds
}
