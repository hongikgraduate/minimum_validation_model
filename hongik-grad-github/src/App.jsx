import { useState } from "react"
import { parseCourses } from "./parser"
import { filterCourses, calcCredits } from "./creditSum"
import { REQ_GYOYANG_PIL, REQ_DRAGONBALL, checkRequirements } from "./requirements"
import { REQ_CS, CS_MAJOR_IDS } from "./majors/computerScience"
import { REQ_BUSINESS, BUSINESS_MAJOR_IDS } from "./majors/business"
import { REQ_VD, VD_MAJOR_IDS } from "./majors/visualDesign"
import "./App.css"

const STEPS = ["클래스넷", "전체성적조회", "Ctrl+A", "복사", "아래에 붙여넣기", "졸업요건확인 버튼"]

const MAJOR_CONFIG = {
  cs:       { req: REQ_CS,       majorIds: CS_MAJOR_IDS },
  business: { req: REQ_BUSINESS, majorIds: BUSINESS_MAJOR_IDS },
  design:   { req: REQ_VD,       majorIds: VD_MAJOR_IDS },
}

/* ────────────────────────────────────────────
   입력 페이지
──────────────────────────────────────────── */
function InputPage({ onSubmit }) {
  const [text, setText] = useState("")
  const [major, setMajor] = useState("")
  const [error, setError] = useState("")

  function handleCheck() {
    if (!major) {
      setError("전공을 선택해 주세요.")
      return
    }
    if (!text.trim()) {
      setError("성적 내용을 붙여넣어 주세요.")
      return
    }
    const ids = filterCourses(parseCourses(text))
    if (ids.length === 0) {
      setError("과목을 찾을 수 없습니다. 전체성적조회 화면을 복사했는지 확인해 주세요.")
      return
    }
    setError("")
    const takenSet = new Set(ids)
    const { req: majorReq, majorIds } = MAJOR_CONFIG[major]
    const { totalCredits, majorCredits } = calcCredits(takenSet, majorIds)
    const results = checkRequirements(takenSet, [REQ_GYOYANG_PIL, majorReq, REQ_DRAGONBALL])
    onSubmit({ results, totalCredits, majorCredits })
  }

  return (
    <>
      <header className="header">
        <h1>홍익 졸업요건</h1>
      </header>

      <main className="main">
        <div className="info-card">
          <p>
            <b>홍익졸업요건은</b>
            <br />
            홍익대학교 학생들이 졸업을 위해 필요한 수업들을 한번에 확인할 수 있도록 제작된 웹사이트입니다.
          </p>
          <div className="steps">
            <span className="steps-label">사용방법</span>
            {STEPS.map((step, i) => (
              <span key={step} className="step-group">
                <span className="step-item">{step}</span>
                {i < STEPS.length - 1 && <span className="step-arrow">→</span>}
              </span>
            ))}
          </div>
          <p className="info-note">* 수강한 강의 외의 개인정보는 절대 저장하거나 처리하지 않습니다</p>
        </div>

        <div className="textbox-wrapper">
          <div className="textbox-label">
            <span>전체성적 붙여넣기</span>
            <select className="major-select" value={major} onChange={(e) => { setMajor(e.target.value); setError("") }}>
              <option value="" disabled>전공</option>
              <option value="cs">컴퓨터공학과</option>
              <option value="design">시각디자인학과</option>
              <option value="business">경영학부</option>
            </select>
          </div>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setError("") }}
            placeholder="클래스넷에서 복사한 전체성적 내용을 여기에 붙여넣으세요."
          />
        </div>

        {error && <div className="result-error">{error}</div>}

        <button className="btn-check" onClick={handleCheck}>
          졸업요건 확인
        </button>
      </main>
    </>
  )
}

/* ────────────────────────────────────────────
   결과 페이지
──────────────────────────────────────────── */
function ResultPage({ results, totalCredits, majorCredits, onBack }) {
  const allMet = results.every((r) => r.met)

  return (
    <>
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>졸업요건 결과</h1>
      </header>

      <main className="main">
        {/* 요약 배너 */}
        <div className={`summary-banner ${allMet ? "all-met" : "partial"}`}>
          <div className="summary-icon">{allMet ? "🎓" : "📋"}</div>
          <div>
            <div className="summary-title">
              {allMet ? "모든 필수 요건을 충족했습니다!" : "아직 충족하지 않은 요건이 있습니다"}
            </div>
          </div>
        </div>

        {/* 학점 요약 */}
        <div className="credit-card">
          <div className="credit-row">
            <span className="credit-label">총 학점</span>
            <span className="credit-value">
              <span className={`credit-num ${totalCredits >= 132 ? "met" : "unmet"}`}>{totalCredits}</span>
              <span className="credit-denom"> / 132</span>
            </span>
            <span className={`credit-badge ${totalCredits >= 132 ? "met" : "unmet"}`}>
              {totalCredits >= 132 ? "충족" : `${132 - totalCredits}학점 부족`}
            </span>
          </div>
          <div className="credit-divider" />
          <div className="credit-row">
            <span className="credit-label">전공 학점</span>
            <span className="credit-value">
              <span className={`credit-num ${majorCredits >= 50 ? "met" : "unmet"}`}>{majorCredits}</span>
              <span className="credit-denom"> / 50</span>
            </span>
            <span className={`credit-badge ${majorCredits >= 50 ? "met" : "unmet"}`}>
              {majorCredits >= 50 ? "충족" : `${50 - majorCredits}학점 부족`}
            </span>
          </div>
        </div>

        {/* 카테고리별 결과 */}
        {Object.entries(
          results.reduce((acc, r) => {
            if (r.type === "each") (acc[r.category] ??= []).push(r)
            return acc
          }, {})
        ).map(([category, items]) => (
          <EachCard key={category} category={category} items={items} />
        ))}
        {results.filter((r) => r.type === "nOf").map((result) => (
          <NOfCard key={result.category} result={result} />
        ))}
      </main>
    </>
  )
}

// "each" 타입 — 카테고리 단위 카드
function EachCard({ category, items }) {
  const catMet = items.filter((r) => r.met).length
  return (
    <div className="req-card">
      <div className="req-card-header">
        <span>{category}</span>
        <span className={`cat-badge ${catMet === items.length ? "all-met" : ""}`}>
          {catMet} / {items.length}
        </span>
      </div>
      {items.map((item) => (
        <div key={item.label} className={`req-row ${item.met ? "met" : "unmet"}`}>
          <span className="req-icon">{item.met ? "✓" : "✗"}</span>
          <span className="req-name">{item.label}</span>
          {item.met
            ? <span className="req-chip met-chip">{item.showName ? `${item.matchedName} ` : ""}이수완료</span>
            : <span className="req-chip unmet-chip">미이수</span>
          }
        </div>
      ))}
    </div>
  )
}

// "nOf" 타입 — 7개 중 N개 영역 이수
function NOfCard({ result }) {
  return (
    <div className="req-card">
      <div className="req-card-header">
        <span>{result.category}</span>
        <span className={`cat-badge ${result.met ? "all-met" : ""}`}>
          {result.metCount} / {result.total} 영역 ({result.required}개 이상)
        </span>
      </div>
      {result.areas.map((area) => (
        <div key={area.label} className={`req-row ${area.met ? "met" : "unmet"}`}>
          <span className="req-icon">{area.met ? "✓" : "✗"}</span>
          <span className="req-name">{area.label}</span>
          {area.met
            ? <span className="req-chip met-chip">{area.matchedName} 이수완료</span>
            : <span className="req-chip unmet-chip">미이수</span>
          }
        </div>
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────
   루트
──────────────────────────────────────────── */
export default function App() {
  const [data, setData] = useState(null)

  if (data) {
    return <ResultPage results={data.results} totalCredits={data.totalCredits} majorCredits={data.majorCredits} onBack={() => setData(null)} />
  }
  return <InputPage onSubmit={setData} />
}
