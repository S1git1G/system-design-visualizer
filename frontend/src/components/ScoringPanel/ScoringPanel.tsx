import { useState } from "react";
import { useScore } from "../../hooks/useScore";
import type { DesignResponse, ScoreDimension } from "../../types/design";

interface ScoringPanelProps {
  design: DesignResponse;
}

function gradeColor(grade: string): string {
  if (grade.startsWith("A")) return "#34d399";
  if (grade.startsWith("B")) return "#60a5fa";
  if (grade.startsWith("C")) return "#fbbf24";
  return "#f87171";
}

function DimensionBar({ dim }: { dim: ScoreDimension }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, cursor: "pointer" }}
        onClick={() => setExpanded(!expanded)}
      >
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9" }}>{dim.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{dim.score}/100</span>
          <span style={{ color: "#94a3b8", fontSize: "0.7rem" }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${dim.score}%`,
            background:
              dim.score >= 80
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : dim.score >= 60
                ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
                : "linear-gradient(90deg, #f59e0b, #fbbf24)",
            borderRadius: 3,
            transition: "width 1s ease",
          }}
        />
      </div>
      {expanded && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: 8,
            padding: "0.75rem",
            background: "rgba(99,102,241,0.05)",
            borderRadius: 8,
            border: "1px solid rgba(99,102,241,0.1)",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem" }}>{dim.feedback}</p>
          {dim.suggestions.length > 0 && (
            <ul style={{ listStyle: "none" }}>
              {dim.suggestions.map((s, i) => (
                <li key={i} style={{ fontSize: "0.78rem", color: "#6366f1", display: "flex", gap: "0.4rem", marginTop: "0.25rem" }}>
                  <span>→</span><span>{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function ScoringPanel({ design }: ScoringPanelProps) {
  const { score, loading, error, fetchScore } = useScore();

  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🏆</span>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>Architecture Score</h3>
        </div>
        {!score && (
          <button
            className="btn-primary"
            onClick={() => fetchScore(design)}
            disabled={loading}
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            {loading ? "Scoring…" : "Score My Design"}
          </button>
        )}
      </div>

      {error && (
        <div style={{ color: "#f87171", fontSize: "0.85rem", padding: "0.75rem", background: "rgba(248,113,113,0.1)", borderRadius: 8 }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
          <div className="animate-spin-slow" style={{ fontSize: "2rem", display: "inline-block", marginBottom: "0.5rem" }}>⏳</div>
          <p style={{ fontSize: "0.85rem" }}>Evaluating your architecture…</p>
        </div>
      )}

      {score && (
        <div className="animate-fade-in">
          {/* Overall Score */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem", padding: "1rem", background: "rgba(99,102,241,0.06)", borderRadius: 12, border: "1px solid rgba(99,102,241,0.15)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: gradeColor(score.grade), lineHeight: 1 }}>
                {score.grade}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.05em" }}>GRADE</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f1f5f9" }}>{score.overall_score}<span style={{ fontSize: "1rem", color: "#64748b" }}>/100</span></div>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5 }}>{score.summary}</p>
            </div>
          </div>

          {/* Dimension bars */}
          {score.dimensions.map((dim) => (
            <DimensionBar key={dim.name} dim={dim} />
          ))}

          {/* Strengths + Improvements */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ padding: "0.875rem", background: "rgba(16,185,129,0.06)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", marginBottom: "0.5rem" }}>✅ STRENGTHS</div>
              {score.strengths.map((s, i) => (
                <p key={i} style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "0.25rem" }}>• {s}</p>
              ))}
            </div>
            <div style={{ padding: "0.875rem", background: "rgba(245,158,11,0.06)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fbbf24", marginBottom: "0.5rem" }}>🔧 IMPROVE</div>
              {score.improvements.map((s, i) => (
                <p key={i} style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "0.25rem" }}>• {s}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
