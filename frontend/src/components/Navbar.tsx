import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(6, 11, 24, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <NavLink
        to="/"
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          🏗️
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9" }}>
            System Design
          </div>
          <div style={{ fontSize: "0.7rem", color: "#6366f1", fontWeight: 600, letterSpacing: "0.05em" }}>
            VISUALIZER
          </div>
        </div>
      </NavLink>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/history" className="nav-link">
          History
        </NavLink>
        <NavLink to="/practice" className="nav-link">
          Practice
        </NavLink>
        <a
          href="https://github.com/your-username/system-design-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#94a3b8",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
            (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }}
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </nav>
  );
}
