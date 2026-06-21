export default function LoadingState() {
  const messages = [
    "Analyzing system requirements…",
    "Designing architecture components…",
    "Identifying bottlenecks…",
    "Generating diagram nodes…",
    "Optimizing database choices…",
    "Crafting interview questions…",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
        gap: "2rem",
      }}
    >
      {/* Animated Logo */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#6366f1",
            borderRightColor: "#8b5cf6",
            animation: "spin 1s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#22d3ee",
            animation: "spin 1.5s linear infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 20,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          🏗️
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "0.5rem",
          }}
        >
          Generating System Design
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Our AI is crafting a production-quality architecture…
        </p>
      </div>

      {/* Animated steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        {messages.map((msg, i) => (
          <div
            key={msg}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${i * 0.4}s`,
              opacity: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.625rem 1rem",
              background: "rgba(99,102,241,0.06)",
              borderRadius: "8px",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <span style={{ color: "#6366f1", fontSize: "0.8rem" }}>▸</span>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{msg}</span>
          </div>
        ))}
      </div>

      {/* Skeleton cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "100%", maxWidth: 600 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1rem" }}>
            <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 10, width: "100%", marginBottom: 6 }} />
            <div className="skeleton" style={{ height: 10, width: "80%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
