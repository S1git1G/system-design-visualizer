import { useState, useRef, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDesignGenerator } from "../hooks/useDesignGenerator";
import LoadingState from "../components/LoadingState";

const EXAMPLE_PROMPTS = [
  "Design Netflix",
  "Design WhatsApp",
  "Design Uber",
  "Design Instagram",
  "Design Google Drive",
  "Design Spotify",
  "Design Zoom",
  "Design Swiggy",
  "Design UPI Payment System",
  "Design Twitter",
  "Design YouTube",
  "Design Amazon",
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { generate, loading, error, data } = useDesignGenerator();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    if (!query.trim() || loading) return;
    const result = await generate(query);
    // After generate, navigate to results
    if (result !== undefined) navigate("/results", { state: { query } });
  };

  // Navigate when data is ready
  if (data) {
    navigate("/results", { state: { design: data, query } });
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Hero section */}
      <div
        className="animate-fade-in-up"
        style={{ textAlign: "center", maxWidth: 720, marginBottom: "3rem" }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "9999px",
            marginBottom: "1.5rem",
            fontSize: "0.8rem",
            color: "#818cf8",
            fontWeight: 600,
          }}
        >
          <span className="animate-float" style={{ display: "inline-block" }}>✨</span>
          AI-Powered System Design Analysis
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          Design Any{" "}
          <span className="gradient-text">System</span>
          <br />
          In Seconds
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: 560,
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          Enter any system design problem and get a complete professional analysis
          with an interactive architecture diagram — powered by AI.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          {[
            { value: "9+", label: "Analysis Sections" },
            { value: "100%", label: "AI Generated" },
            { value: "∞", label: "System Types" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9" }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input section */}
      <div
        className="animate-fade-in-up delay-200"
        style={{ width: "100%", maxWidth: 680, opacity: 0 }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 0 60px rgba(99,102,241,0.1)",
          }}
        >
          <textarea
            ref={textareaRef}
            id="design-query-input"
            className="design-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe your system... e.g. 'Design Netflix' or 'Design a real-time chat app'"
            rows={3}
            style={{ padding: "1rem 1.25rem", marginBottom: "1rem" }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#475569" }}>
              {query.length}/500 · Press Enter to generate
            </span>
            <button
              id="generate-btn"
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading || !query.trim()}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 160 }}
            >
              <span>🏗️</span>
              <span style={{ position: "relative", zIndex: 1 }}>
                {loading ? "Generating…" : "Generate Design"}
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: "1rem",
              padding: "0.875rem 1.25rem",
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.3)",
              borderRadius: "12px",
              color: "#fb7185",
              fontSize: "0.875rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Example chips */}
      <div
        className="animate-fade-in-up delay-400"
        style={{ marginTop: "2rem", maxWidth: 680, width: "100%", opacity: 0 }}
      >
        <p style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Try these examples
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setQuery(prompt);
                textareaRef.current?.focus();
              }}
              style={{
                padding: "0.4rem 0.875rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                color: "#94a3b8",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
                (e.currentTarget as HTMLElement).style.color = "#818cf8";
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Feature pills */}
      <div
        className="animate-fade-in-up delay-600"
        style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", opacity: 0 }}
      >
        {[
          { icon: "📊", text: "Architecture Diagram" },
          { icon: "🏆", text: "Architecture Scoring" },
          { icon: "📄", text: "PDF Export" },
          { icon: "💬", text: "Interview Practice" },
          { icon: "📝", text: "Design History" },
          { icon: "🔄", text: "Mermaid Export" },
        ].map(({ icon, text }) => (
          <div
            key={text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.375rem 0.875rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              fontSize: "0.78rem",
              color: "#64748b",
            }}
          >
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
