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
  accentColor = "#6366f1",
  delay = 0,
}: AnalysisCardProps) {
  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        padding: "1.25rem",
        animationDelay: `${delay}ms`,
        opacity: 0,
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
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            marginLeft: "auto",
            background: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}30`,
            borderRadius: "9999px",
            padding: "2px 8px",
            fontSize: "0.7rem",
            fontWeight: 600,
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
              color: "#94a3b8",
              lineHeight: 1.6,
              paddingBottom: i < items.length - 1 ? "0.5rem" : 0,
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accentColor,
                marginTop: "0.45rem",
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
