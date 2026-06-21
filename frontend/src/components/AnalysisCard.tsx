interface AnalysisCardProps {
  title: string;
  icon: string;
  items: string[];
  accentColor?: string;
  badgeColor?: string;
  delay?: number;
}

export default function AnalysisCard({
  title,
  icon,
  items,
  accentColor = "#ffffff",
  delay = 0,
}: AnalysisCardProps) {
  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: "1.25rem",
        animationDelay: `${delay}ms`,
        opacity: 0,
        borderRadius: "4px",
        background: "rgba(9, 9, 11, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "2px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: "Space Grotesk, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(255, 255, 255, 0.04)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "2px",
            padding: "2px 6px",
            fontSize: "0.7rem",
            fontWeight: 600,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {items.length}
        </span>
      </div>

      {/* Items */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.625rem",
              fontSize: "0.85rem",
              color: "#a1a1aa",
              lineHeight: 1.6,
              paddingBottom: i < items.length - 1 ? "0.5rem" : 0,
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: accentColor,
                marginTop: "0.5rem",
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
