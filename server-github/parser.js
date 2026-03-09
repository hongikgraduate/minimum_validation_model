/**
 * 클래스넷 전체성적 텍스트를 파싱하여 수강 과목 배열로 반환
 *
 * @param {string} text
 * @returns {{ year: number, semester: string, courseId: string, courseName: string, credits: number, grade: string }[]}
 */
function parseGrades(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const courses = [];

  let currentYear = null;
  let currentSemester = null;

  // 학기 헤더: "2022학년도 1학년 1학기" / "2023학년도 2학년 하계계절학기" 등
  const semesterRe = /^(\d{4})학년도\s+\d+학년\s+(.+학기)/;
  // 과목 행: 6자리 학수번호 + 탭 으로 시작
  const courseRe = /^(\d{6})\t([^\t]+)\t([^\t]+)\t(\d+)\t([^\t]*)/;

  for (const line of lines) {
    const semMatch = line.match(semesterRe);
    if (semMatch) {
      currentYear = parseInt(semMatch[1], 10);
      currentSemester = semMatch[2].trim();
      continue;
    }

    const courseMatch = line.match(courseRe);
    if (courseMatch) {
      courses.push({
        year: currentYear,
        semester: currentSemester,
        courseId: courseMatch[1],
        courseName: courseMatch[2].trim(),
        credits: parseInt(courseMatch[4], 10),
        grade: courseMatch[5].trim() || null,
      });
    }
  }

  return courses;
}

module.exports = { parseGrades };
