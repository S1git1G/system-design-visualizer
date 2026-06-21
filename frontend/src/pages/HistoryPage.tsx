import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
import type { HistoryItem } from "../types/design";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins}M AGO`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}H AGO`;
  return `${Math.floor(hours / 24)}D AGO`;
}

export default function HistoryPage() {
  const { data, loading, error, fetchHistory, deleteItem, clearAll } = useHistory();
  const navigate = useNavigate();
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const loadDesign = (item: HistoryItem) => {
    navigate("/results", { state: { design: item.design, query: item.query } });
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", position: "relative" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <div>
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
            Design <span className="gradient-text">History</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.95rem", fontFamily: "Space Grotesk, sans-serif" }}>
            {data?.total ?? 0} SAVED ARCHITECTURAL RUNS
          </p>
        </div>
        {data && data.total > 0 && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {confirmClear ? (
              <>
                <button
                  className="btn-secondary"
                  style={{ fontSize: "0.75rem", color: "#f43f5e", borderColor: "rgba(244,63,94,0.3)" }}
                  onClick={async () => { await clearAll(); setConfirmClear(false); }}
                >
                  CONFIRM CLEAR
                </button>
                <button className="btn-secondary" style={{ fontSize: "0.75rem" }} onClick={() => setConfirmClear(false)}>
                  CANCEL
                </button>
              </>
            ) : (
              <button
                className="btn-secondary"
                style={{ fontSize: "0.75rem" }}
                onClick={() => setConfirmClear(true)}
              >
                🗑️ CLEAR HISTORY
              </button>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "4rem", color: "#a1a1aa", fontFamily: "Space Grotesk, sans-serif" }}>
          <div className="animate-spin-slow" style={{ fontSize: "2.2rem", display: "inline-block", marginBottom: "1rem" }}>⚙️</div>
          <p style={{ letterSpacing: "0.05em" }}>RETRIEVING SAVED DESIGN LOGS…</p>
        </div>
      )}

      {error && (
        <div style={{ padding: "1rem", background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)", borderRadius: "4px", color: "#fb7185", marginBottom: "1rem", fontFamily: "Space Grotesk, sans-serif" }}>
          ⚠️ {error}
        </div>
      )}

      {!loading && data?.items.length === 0 && (
        <div
          className="glass-card animate-fade-in-up"
          style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📭</div>
          <h3 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.5rem", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" }}>No designs logged</h3>
          <p style={{ color: "#a1a1aa", marginBottom: "2rem", fontFamily: "Space Grotesk, sans-serif" }}>Generate a system design layout to see it logged in history.</p>
          <button className="btn-primary" onClick={() => navigate("/")}>
            🏗️ CREATE NEW DESIGN
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data?.items.map((item, i) => (
          <div
            key={item.id}
            className="glass-card animate-fade-in-up"
            style={{
              padding: "1.25rem",
              cursor: "pointer",
              animationDelay: `${i * 60}ms`,
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(9, 9, 11, 0.4)",
            }}
            onClick={() => loadDesign(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,242,254,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontWeight: 600,
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  marginBottom: "0.35rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#71717a", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
                {timeAgo(item.created_at)}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.875rem" }}
                onClick={(e) => { e.stopPropagation(); loadDesign(item); }}
              >
                LOAD ⟶
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                style={{
                  background: "none",
                  border: "1px solid rgba(244,63,94,0.2)",
                  borderRadius: "2px",
                  padding: "0.45rem 0.75rem",
                  color: "#f43f5e",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontFamily: "Space Grotesk, sans-serif",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(244,63,94,0.5)";
                  e.currentTarget.style.background = "rgba(244,63,94,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(244,63,94,0.2)";
                  e.currentTarget.style.background = "none";
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
