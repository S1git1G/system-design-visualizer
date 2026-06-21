import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(5, 5, 6, 0.3)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
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
            width: 32,
            height: 32,
            borderRadius: "4px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#050506",
            fontWeight: 800,
            fontFamily: "Space Grotesk, sans-serif",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
          }}
        >
          SD
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "0.9rem",
              color: "#ffffff",
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            SYSTEM DESIGN
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              color: "#a1a1aa",
              fontWeight: 600,
              letterSpacing: "0.15em",
              fontFamily: "Space Grotesk, sans-serif",
              lineHeight: 1.1,
              marginTop: "2px",
            }}
          >
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
          href="https://github.com/S1git1G/system-design-visualizer"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginLeft: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "4px",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.2)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.06)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.02)";
          }}
        >
          ★ GitHub
        </a>
      </div>
    </nav>
  );
}
