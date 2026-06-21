import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
import type { HistoryItem } from "../types/design";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Design <span className="gradient-text">History</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            {data?.total ?? 0} saved designs
          </p>
        </div>
        {data && data.total > 0 && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {confirmClear ? (
              <>
                <button
                  className="btn-secondary"
                  style={{ fontSize: "0.8rem", color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}
                  onClick={async () => { await clearAll(); setConfirmClear(false); }}
                >
                  Confirm Clear All
                </button>
                <button className="btn-secondary" style={{ fontSize: "0.8rem" }} onClick={() => setConfirmClear(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn-secondary"
                style={{ fontSize: "0.8rem" }}
                onClick={() => setConfirmClear(true)}
              >
                🗑️ Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
          <div className="animate-spin-slow" style={{ fontSize: "2rem", display: "inline-block", marginBottom: "0.5rem" }}>⏳</div>
          <p>Loading history…</p>
        </div>
      )}

      {error && (
        <div style={{ padding: "1rem", background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: 12, color: "#fb7185", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {!loading && data?.items.length === 0 && (
        <div
          className="glass-card"
          style={{ padding: "4rem 2rem", textAlign: "center" }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📭</div>
          <h3 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "0.5rem" }}>No designs yet</h3>
          <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Generate your first system design to see it here.</p>
          <button className="btn-primary" onClick={() => navigate("/")}>
            🏗️ Generate a Design
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
            }}
            onClick={() => loadDesign(item)}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.8rem" }}>{timeAgo(item.created_at)}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                className="btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.875rem" }}
                onClick={(e) => { e.stopPropagation(); loadDesign(item); }}
              >
                Load →
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                style={{
                  background: "none",
                  border: "1px solid rgba(248,113,113,0.2)",
                  borderRadius: 8,
                  padding: "0.4rem 0.75rem",
                  color: "#f87171",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.2s ease",
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
