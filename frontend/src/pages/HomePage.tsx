import { useState, useRef, useEffect, type KeyboardEvent } from "react";
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

  const deckRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleGenerate = async () => {
    if (!query.trim() || loading) return;
    const result = await generate(query);
    if (result !== undefined) navigate("/results", { state: { query } });
  };

  if (data) {
    navigate("/results", { state: { design: data, query } });
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Mouse drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!deckRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - deckRef.current.offsetLeft;
    scrollLeft.current = deckRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !deckRef.current) return;
    e.preventDefault();
    const x = e.pageX - deckRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    deckRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Cylinder/film-reel scaling and skewing on scroll
  const handleScroll = () => {
    if (!deckRef.current) return;
    const container = deckRef.current;
    const rect = container.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const children = container.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(center - childCenter);
      const ratio = Math.min(1, distance / (rect.width / 1.5));

      const scale = 1.05 - ratio * 0.15;
      const opacity = 1 - ratio * 0.65;
      const rotateY = (childCenter - center) * -0.05;

      child.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
      child.style.opacity = `${opacity}`;
    }
  };

  useEffect(() => {
    handleScroll();
    // Re-run scroll logic to center item positioning on window resize
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

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
        position: "relative",
      }}
    >
      {/* Hero section */}
      <div
        className="animate-fade-in-up"
        style={{ textAlign: "center", maxWidth: 780, marginBottom: "2rem" }}
      >
        {/* Subtle cinematic badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.25rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            marginBottom: "2rem",
            fontSize: "0.75rem",
            color: "#a1a1aa",
            fontFamily: "JetBrains Mono, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          <span style={{ color: "#00f2fe" }}>●</span> RUNNING v1.0.0 — AI ENGINE
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em",
            fontFamily: "Syne, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Design Any <span className="gradient-text">System</span>
          <br />
          In Seconds
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#a1a1aa",
            maxWidth: 580,
            margin: "0 auto 2.5rem",
            lineHeight: 1.8,
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          Enter any system design request. Get a detailed analysis
          with an interactive architectural diagram instantly.
        </p>

        {/* Stats Row with Mono Fonts */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {[
            { value: "09", label: "ANALYSIS STEPS" },
            { value: "100%", label: "AI COMPLETIONS" },
            { value: "L-3.1", label: "MODEL DEPLOY" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff" }}>{value}</div>
              <div style={{ fontSize: "0.65rem", color: "#52525b", fontWeight: 600, letterSpacing: "0.1em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div
        className="animate-fade-in-up delay-200"
        style={{ width: "100%", maxWidth: 700, opacity: 0 }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            position: "relative",
          }}
        >
          {/* Top border glowing marker */}
          <div style={{ position: "absolute", top: -1, left: "10%", right: "80%", height: 1, background: "linear-gradient(90deg, transparent, #00f2fe, transparent)" }} />

          <textarea
            ref={textareaRef}
            id="design-query-input"
            className="design-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe the system to architect... (e.g., 'Design Netflix' or 'UPI Ledger API')"
            rows={3}
            style={{
              padding: "1rem 1.25rem",
              marginBottom: "1.25rem",
              borderRadius: "4px",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#52525b", fontFamily: "JetBrains Mono, monospace" }}>
              {query.length}/500 · Press Enter
            </span>
            <button
              id="generate-btn"
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading || !query.trim()}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 160 }}
            >
              <span>⚙️</span>
              <span>
                {loading ? "ARCHITECTING…" : "GENERATE DRAW"}
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
              background: "rgba(244,63,94,0.05)",
              border: "1px solid rgba(244,63,94,0.15)",
              borderRadius: "4px",
              color: "#fb7185",
              fontSize: "0.85rem",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Interactive Film Reel Carousel */}
      <div
        className="animate-fade-in-up delay-400"
        style={{ marginTop: "3.5rem", width: "100%", opacity: 0 }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            color: "#52525b",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "1rem",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          ★ INTERACTIVE DESIGN SELECTIONS (DRAG OR WHEEL)
        </p>

        <div
          className="reel-deck-outer"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={deckRef}
            className="reel-deck-inner"
            onScroll={handleScroll}
            style={{ perspective: "1000px" }}
          >
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <div
                key={prompt}
                className="reel-card"
                onClick={() => {
                  setQuery(prompt);
                  textareaRef.current?.focus();
                }}
              >
                <div className="reel-card-num">
                  {(index + 1).toString().padStart(2, "0")} / {EXAMPLE_PROMPTS.length}
                </div>
                <div className="reel-card-title">{prompt}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", color: "#52525b", fontFamily: "JetBrains Mono, monospace" }}>CLICK TO LOAD</span>
                  <span style={{ fontSize: "0.75rem", color: "#00f2fe" }}>⟶</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
