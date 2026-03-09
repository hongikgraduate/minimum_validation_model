const express = require("express");
const cors = require("cors");
const db = require("./db");
const { parseGrades } = require("./parser");
const { checkRequirements } = require("./requirements");

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/grades — 텍스트 파싱 후 DB 저장 + 졸업요건 비교
app.post("/api/grades", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text가 없습니다." });

  const courses = parseGrades(text);
  if (courses.length === 0)
    return res.status(400).json({ error: "파싱된 과목이 없습니다. 형식을 확인해주세요." });

  // 기존 데이터 삭제 후 새로 저장
  db.prepare("DELETE FROM courses WHERE student_id = 'default'").run();

  const insert = db.prepare(`
    INSERT INTO courses (student_id, year, semester, course_id, course_name, credits, grade)
    VALUES ('default', @year, @semester, @courseId, @courseName, @credits, @grade)
  `);

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });

  insertMany(courses);

  // 이수한 학수번호 Set
  const takenIds = new Set(courses.map((c) => c.courseId));

  // 졸업 요건 비교
  const requirementResults = checkRequirements(takenIds);

  res.json({ saved: courses.length, courses, requirementResults });
});

// GET /api/grades — 저장된 과목 목록 조회
app.get("/api/grades", (req, res) => {
  const courses = db
    .prepare("SELECT * FROM courses WHERE student_id = 'default' ORDER BY year, semester, id")
    .all();
  res.json(courses);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버 실행 중 → http://localhost:${PORT}`);
});
