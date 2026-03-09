// 졸업 요건 정의
// ids: 배열이면 "그 중 하나"를 이수하면 충족, 단일 문자열이면 해당 과목 필수

const REQUIREMENTS = [
  {
    category: "교양 필수",
    items: [
      { label: "영어", ids: ["001009"] },
      {
        label: "논리적사고와글쓰기",
        ids: [
          "001011",
          "001012",
          "001013",
          "001014",
          "001015",
          "001020",
          "001021",
          "001022",
        ],
      },
      { label: "전공기초영어", ids: ["007114", "007115"] },
      { label: "디자인씽킹/창업과실용법률", ids: ["008751", "008752"] },
    ],
  },
  {
    category: "전공 필수",
    items: [
      { label: "자료구조및프로그래밍", ids: ["013312"] },
      { label: "알고리즘분석", ids: ["101503"] },
      { label: "컴퓨터구조", ids: ["101510"] },
      { label: "프로그래밍언어론", ids: ["101512"] },
      { label: "운영체제", ids: ["101511"] },
      { label: "소프트웨어공학", ids: ["101708"] },
      { label: "졸업프로젝트1", ids: ["101717", "101721"] },
      { label: "졸업프로젝트2", ids: ["101814", "101817"] },
    ],
  },
];

/**
 * 이수한 학수번호 Set을 받아 요건 충족 여부를 계산
 * @param {Set<string>} takenIds
 * @returns {{ category, label, ids, met, matchedId }[]}
 */
function checkRequirements(takenIds) {
  const results = [];
  for (const group of REQUIREMENTS) {
    for (const item of group.items) {
      const matchedId = item.ids.find((id) => takenIds.has(id)) ?? null;
      results.push({
        category: group.category,
        label: item.label,
        ids: item.ids,
        met: matchedId !== null,
        matchedId,
      });
    }
  }
  return results;
}

module.exports = { REQUIREMENTS, checkRequirements };
