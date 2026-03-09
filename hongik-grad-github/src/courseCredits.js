// 기본값: { credits: 3, isMajor: false }
// 기본값과 다른 과목만 등록
const COURSE_CREDITS = {
  // 학점이 다른 과목
  "007115": { credits: 2 },
  "008740": { credits: 2 },
  "008744": { credits: 2 },
  "002429": { credits: 2 },
  "007001": { credits: 1 },
  "007002": { credits: 1 },
  "007003": { credits: 1 },
  "007004": { credits: 1 },
  "007005": { credits: 1 },
  "007006": { credits: 1 },
  "007007": { credits: 1 },
  "007008": { credits: 1 },
  "007009": { credits: 1 },
  "013313": { credits: 4, isMajor: true },
  "013312": { credits: 4, isMajor: true },
  // 전공 과목 (3학점)
  101307: { isMajor: true },
  101408: { isMajor: true },
  101410: { isMajor: true },
  101412: { isMajor: true },
  101503: { isMajor: true },
  101510: { isMajor: true },
  101512: { isMajor: true },
  101511: { isMajor: true },
  101708: { isMajor: true },
  101717: { isMajor: true },
  101721: { isMajor: true },
  101814: { isMajor: true },
  101817: { isMajor: true },
};

export default COURSE_CREDITS;
