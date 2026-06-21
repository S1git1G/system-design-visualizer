import { useState } from "react";

import { generateInterview } from "../services/api";
import type { InterviewQuestion, InterviewResponse } from "../types/design";

const EXAMPLE_SYSTEMS = [
  "Netflix", "WhatsApp", "Uber", "Instagram", "Google Drive",
  "Spotify", "Zoom", "Twitter", "YouTube", "Amazon",
];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "#34d399",
  medium: "#fbbf24",
  hard: "#f87171",
};

const CATEGORY_COLORS: Record<string, string> = {
  scalability: "#818cf8",
  database: "#22d3ee",
  architecture: "#a78bfa",
  tradeoffs: "#fb923c",
  estimation: "#4ade80",
};

function QuestionCard({ q, index }: { q: InterviewQuestion; index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{ padding: "1.25rem", animationDelay: `${index * 100}ms`, opacity: 0 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
        <span
          style={{
            padding: "2px 10px",
            borderRadius: "9999px",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            background: `${DIFFICULTY_COLORS[q.difficulty]}20`,
            color: DIFFICULTY_COLORS[q.difficulty],
            border: `1px solid ${DIFFICULTY_COLORS[q.difficulty]}40`,
          }}
        >
          {q.difficulty}
        </span>
        <span
          style={{
            padding: "2px 10px",
            borderRadius: "9999px",
            fontSize: "0.7rem",
            fontWeight: 600,
            background: `${CATEGORY_COLORS[q.category] || "#6366f1"}20`,
            color: CATEGORY_COLORS[q.category] || "#6366f1",
            border: `1px solid ${CATEGORY_COLORS[q.category] || "#6366f1"}40`,
          }}
        >
          {q.category}
        </span>
      </div>

      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.5, marginBottom: "1rem" }}>
        {q.question}
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {q.hint && (
          <button
            className="btn-secondary"
            onClick={() => setShowHint(!showHint)}
            style={{ fontSize: "0.75rem", padding: "0.35rem 0.875rem" }}
          >
            💡 {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        )}
        <button
          className="btn-secondary"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ fontSize: "0.75rem", padding: "0.35rem 0.875rem" }}
        >
          📖 {showAnswer ? "Hide Answer" : "View Model Answer"}
        </button>
      </div>

      {showHint && q.hint && (
        <div
          className="animate-fade-in"
          style={{ marginTop: "0.875rem", padding: "0.75rem", background: "rgba(251,191,36,0.08)", borderRadius: 8, border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <p style={{ fontSize: "0.82rem", color: "#fbbf24", fontWeight: 600, marginBottom: "0.25rem" }}>💡 Hint</p>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>{q.hint}</p>
        </div>
      )}

      {showAnswer && (
        <div
          className="animate-fade-in"
          style={{ marginTop: "0.875rem", padding: "0.875rem", background: "rgba(99,102,241,0.08)", borderRadius: 8, border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <p style={{ fontSize: "0.82rem", color: "#818cf8", fontWeight: 600, marginBottom: "0.5rem" }}>📖 Model Answer</p>
          <p style={{ fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.6 }}>{q.model_answer}</p>
          {q.follow_ups.length > 0 && (
            <div style={{ marginTop: "0.75rem" }}>
              <p style={{ fontSize: "0.75rem", color: "#6366f1", fontWeight: 600, marginBottom: "0.375rem" }}>Follow-up Questions:</p>
              {q.follow_ups.map((fu, i) => (
                <p key={i} style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.25rem" }}>→ {fu}</p>
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
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Interview <span className="gradient-text">Practice</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
          Get FAANG-style system design interview questions for any system, with hints and model answers.
        </p>
      </div>

      {/* Input */}
      <div className="glass-card animate-fade-in-up delay-100" style={{ padding: "1.5rem", marginBottom: "1.5rem", opacity: 0 }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                color: "#f1f5f9",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />
          </div>
          <div style={{ width: 120 }}>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              # Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                color: "#f1f5f9",
                fontFamily: "Inter, sans-serif",
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
          {EXAMPLE_SYSTEMS.map((s) => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              style={{
                padding: "0.3rem 0.75rem",
                background: system === s ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${system === s ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "9999px",
                color: system === s ? "#818cf8" : "#94a3b8",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              {s}
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
          {loading ? "⏳ Generating Questions…" : "💬 Generate Interview Questions"}
        </button>
      </div>

      {error && (
        <div style={{ padding: "1rem", background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 12, color: "#fb7185", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
          <div className="animate-spin-slow" style={{ fontSize: "2.5rem", display: "inline-block", marginBottom: "0.75rem" }}>🤔</div>
          <p>Crafting FAANG-level questions…</p>
        </div>
      )}

      {result && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
            {result.questions.length} Questions for <span className="gradient-text">{result.design_title}</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {result.questions.map((q, i) => (
              <QuestionCard key={q.id} q={q} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
