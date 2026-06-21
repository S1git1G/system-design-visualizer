import { useState } from "react";
import { generateInterview } from "../services/api";
import type { InterviewQuestion, InterviewResponse } from "../types/design";

const EXAMPLE_SYSTEMS = [
  "Netflix", "WhatsApp", "Uber", "Instagram", "Google Drive",
  "Spotify", "Zoom", "Twitter", "YouTube", "Amazon",
];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "#ffffff",
  medium: "#fbbf24",
  hard: "#f43f5e",
};

function QuestionCard({ q, index }: { q: InterviewQuestion; index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: "1.25rem",
        animationDelay: `${index * 80}ms`,
        opacity: 0,
        borderRadius: "4px",
        background: "rgba(9, 9, 11, 0.4)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem", flexWrap: "wrap", fontFamily: "JetBrains Mono, monospace" }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "2px",
            fontSize: "0.68rem",
            fontWeight: 600,
            textTransform: "uppercase",
            background: "rgba(255, 255, 255, 0.02)",
            color: DIFFICULTY_COLORS[q.difficulty] || "#ffffff",
            border: `1px solid ${DIFFICULTY_COLORS[q.difficulty] || "#ffffff"}40`,
          }}
        >
          {q.difficulty}
        </span>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "2px",
            fontSize: "0.68rem",
            fontWeight: 600,
            textTransform: "uppercase",
            background: "rgba(255, 255, 255, 0.02)",
            color: "#00f2fe",
            border: "1px solid rgba(0, 242, 254, 0.2)",
          }}
        >
          {q.category}
        </span>
      </div>

      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#ffffff", lineHeight: 1.5, marginBottom: "1rem", fontFamily: "Space Grotesk, sans-serif" }}>
        {q.question}
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {q.hint && (
          <button
            className="btn-secondary"
            onClick={() => setShowHint(!showHint)}
            style={{ fontSize: "0.75rem", padding: "0.35rem 0.875rem" }}
          >
            {showHint ? "▲ HIDE HINT" : "▼ VIEW HINT"}
          </button>
        )}
        <button
          className="btn-secondary"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ fontSize: "0.75rem", padding: "0.35rem 0.875rem" }}
        >
          {showAnswer ? "▲ HIDE ANSWER" : "▼ VIEW ANSWER"}
        </button>
      </div>

      {showHint && q.hint && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "0.875rem",
            padding: "0.75rem",
            background: "rgba(251,191,36,0.02)",
            borderRadius: "2px",
            border: "1px solid rgba(251,191,36,0.15)",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 700, marginBottom: "0.25rem", fontFamily: "JetBrains Mono, monospace" }}>💡 HINT</p>
          <p style={{ fontSize: "0.85rem", color: "#a1a1aa", fontFamily: "Space Grotesk, sans-serif" }}>{q.hint}</p>
        </div>
      )}

      {showAnswer && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: "0.875rem",
            padding: "0.875rem",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#ffffff", fontWeight: 700, marginBottom: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>📖 MODEL ANSWER</p>
          <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>{q.model_answer}</p>
          {q.follow_ups.length > 0 && (
            <div style={{ marginTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.75rem" }}>
              <p style={{ fontSize: "0.75rem", color: "#00f2fe", fontWeight: 700, marginBottom: "0.375rem", fontFamily: "JetBrains Mono, monospace" }}>FOLLOW-UP QUESTIONS:</p>
              {q.follow_ups.map((fu, i) => (
                <p key={i} style={{ fontSize: "0.82rem", color: "#a1a1aa", marginBottom: "0.25rem", fontFamily: "Space Grotesk, sans-serif" }}>→ {fu}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PracticePage() {
  const [system, setSystem] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InterviewResponse | null>(null);

  const handleGenerate = async () => {
    if (!system.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateInterview(system, [], numQuestions);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem", position: "relative" }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
            fontFamily: "Syne, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Interview <span className="gradient-text">Practice</span>
        </h1>
        <p style={{ color: "#a1a1aa", fontSize: "0.95rem", fontFamily: "Space Grotesk, sans-serif" }}>
          Get FAANG-style system design interview questions for any system, with hints and model answers.
        </p>
      </div>

      {/* Input */}
      <div
        className="glass-card animate-fade-in-up delay-100"
        style={{
          padding: "1.5rem",
          marginBottom: "1.5rem",
          opacity: 0,
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "4px",
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: "block", fontSize: "0.7rem", color: "#71717a", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "JetBrains Mono, monospace" }}>
              System to Practice
            </label>
            <input
              id="practice-system-input"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. Netflix, WhatsApp, Uber"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(255,255,255,0.05)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <div style={{ width: 120 }}>
            <label style={{ display: "block", fontSize: "0.7rem", color: "#71717a", fontWeight: 700, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "JetBrains Mono, monospace" }}>
              # Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "0.72rem 1rem",
                background: "rgba(9,9,11,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {[3, 5, 7, 10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Example chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.25rem" }}>
          {EXAMPLE_SYSTEMS.map((s) => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              style={{
                padding: "0.3rem 0.8rem",
                background: system === s ? "#ffffff" : "rgba(255,255,255,0.02)",
                border: `1px solid ${system === s ? "#ffffff" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "2px",
                color: system === s ? "#050506" : "#a1a1aa",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Space Grotesk, sans-serif",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          id="practice-generate-btn"
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading || !system.trim()}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {loading ? "⏳ ARCHITECTING QUESTIONS…" : "💬 GENERATE PRACTICE BOARD"}
        </button>
      </div>

      {error && (
        <div style={{ padding: "1rem", background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)", borderRadius: "4px", color: "#fb7185", marginBottom: "1rem", fontFamily: "Space Grotesk, sans-serif" }}>
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "4rem", color: "#a1a1aa", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="animate-spin-slow" style={{ fontSize: "2.2rem", display: "inline-block", marginBottom: "1rem" }}>⚙️</div>
          <p style={{ letterSpacing: "0.05em" }}>CRAFTING FAANG-LEVEL QUESTIONS FOR YOUR RUN…</p>
        </div>
      )}

      {result && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {result.questions.length} QUESTIONS FOR <span className="gradient-text">{result.design_title}</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {result.questions.map((q, i) => (
              <QuestionCard key={q.id} q={q} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
