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

  // 전공(컴공) 과목
  "013312": { credits: 4, isMajor: true },  // 자료구조및프로그래밍
  "013313": { credits: 4, isMajor: true },  // 논리회로설계및실험
  "101307": { isMajor: true },              // 인터넷프로그래밍
  "101408": { isMajor: true },              // 어셈블리언어및실습
  "101410": { isMajor: true },              // 데이터통신
  "101412": { isMajor: true },              // 멀티미디어응용수학
  "101413": { isMajor: true },              // HCI윈도우즈프로그래밍
  "101503": { isMajor: true },              // 알고리즘분석
  "101510": { isMajor: true },              // 컴퓨터구조
  "101511": { isMajor: true },              // 운영체제
  "101512": { isMajor: true },              // 프로그래밍언어론
  "101606": { isMajor: true },              // 오토마타
  "101609": { isMajor: true },              // 컴퓨터네트워크
  "101612": { isMajor: true },              // 비디오이미지프로세싱
  "101613": { credits: 4, isMajor: true },  // 기초데이터베이스
  "101615": { isMajor: true },              // 디지털시스템설계
  "101616": { isMajor: true },              // 문제해결기법
  "101617": { isMajor: true },              // 기계학습기초
  "101708": { isMajor: true },              // 소프트웨어공학
  "101717": { isMajor: true },              // AIML응용프로젝트1
  "101718": { isMajor: true },              // 컴퓨터그래픽스와메타버스
  "101719": { isMajor: true },              // 기계학습심화
  "101720": { isMajor: true },              // 정보보안
  "101721": { isMajor: true },              // 종합설계프로젝트1
  "101811": { isMajor: true },              // 창직종합설계프로젝트1
  "101812": { isMajor: true },              // 창직종합설계프로젝트2
  "101814": { isMajor: true },              // AIML응용프로젝트2
  "101815": { isMajor: true },              // 블록체인
  "101817": { isMajor: true },              // 종합설계프로젝트2
  "101991": { isMajor: true },              // 홍익챌린지(1)
  "101992": { isMajor: true },              // 홍익챌린지(2)
  "101993": { isMajor: true },              // 홍익챌린지(3)

  "777002": { credits: 6, isMajor: true },  // 빅데이터기반경영 / 사업타당성분석
};

export default COURSE_CREDITS;