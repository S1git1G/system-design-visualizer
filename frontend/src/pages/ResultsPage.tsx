import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { DesignResponse } from "../types/design";
import { useDesignGenerator } from "../hooks/useDesignGenerator";
import AnalysisCard from "../components/AnalysisCard";
import DiagramCanvas from "../components/ArchitectureDiagram/DiagramCanvas";
import ScoringPanel from "../components/ScoringPanel/ScoringPanel";
import ExportPanel from "../components/ExportPanel/ExportPanel";
import LoadingState from "../components/LoadingState";

type TabId = "analysis" | "diagram" | "scoring" | "export";

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: "analysis", icon: "📋", label: "ANALYSIS" },
  { id: "diagram", icon: "🗺️", label: "DIAGRAM" },
  { id: "scoring", icon: "🏆", label: "SCORE" },
  { id: "export", icon: "📤", label: "EXPORT" },
];

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("analysis");

  const design = location.state?.design as DesignResponse | undefined;
  const { data: newData, loading, error, reset } = useDesignGenerator();

  const currentDesign = design || newData;

  if (loading) return <LoadingState />;

  if (!currentDesign) {
    navigate("/");
    return null;
  }

  const CARD_SECTIONS = [
    { title: "Functional Requirements", icon: "✅", items: currentDesign.functional_requirements, color: "#ffffff" },
    { title: "Non-Functional Requirements", icon: "⚡", items: currentDesign.non_functional_requirements, color: "#a1a1aa" },
    { title: "Core Components", icon: "🧩", items: currentDesign.components, color: "#ffffff" },
    { title: "Database Recommendations", icon: "🗄️", items: currentDesign.databases, color: "#a1a1aa" },
    { title: "Cache Layer", icon: "⚡", items: currentDesign.caches, color: "#ffffff" },
    { title: "Scalability Strategies", icon: "📈", items: currentDesign.scalability_considerations, color: "#a1a1aa" },
    { title: "Potential Bottlenecks", icon: "⚠️", items: currentDesign.bottlenecks, color: "#ffffff" },
    { title: "Interview Questions", icon: "💬", items: currentDesign.interview_questions, color: "#a1a1aa" },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem", position: "relative" }}>
      {/* Header */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <button
            onClick={() => { reset(); navigate("/"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              color: "#a1a1aa",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontFamily: "JetBrains Mono, monospace",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
          >
            ← NEW DESIGN
          </button>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.50rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              fontFamily: "Syne, sans-serif",
              textTransform: "uppercase",
            }}
          >
            <span className="gradient-text">{currentDesign.title}</span>
          </h1>
          <p
            style={{
              color: "#52525b",
              fontSize: "0.78rem",
              marginTop: "0.5rem",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            QUERY: "{currentDesign.query.toUpperCase()}"
          </p>
        </div>

        {/* Node/edge count tags */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", fontFamily: "JetBrains Mono, monospace" }}>
          <span
            style={{
              padding: "0.3rem 0.8rem",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "2px",
              color: "#ffffff",
              fontSize: "0.72rem",
            }}
          >
            {currentDesign.nodes.length} NODES
          </span>
          <span
            style={{
              padding: "0.3rem 0.8rem",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "2px",
              color: "#ffffff",
              fontSize: "0.72rem",
            }}
          >
            {currentDesign.edges.length} EDGES
          </span>
          <span
            style={{
              padding: "0.3rem 0.8rem",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "2px",
              color: "#00f2fe",
              fontSize: "0.72rem",
            }}
          >
            {currentDesign.components.length} COMPONENTS
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: "4px",
          padding: "4px",
          width: "fit-content",
          opacity: 0,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "2px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              color: activeTab === tab.id ? "#050506" : "#a1a1aa",
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "analysis" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {CARD_SECTIONS.map((section, i) => (
            <AnalysisCard
              key={section.title}
              title={section.title}
              icon={section.icon}
              items={section.items}
              accentColor={section.color}
              delay={i * 60}
            />
          ))}
        </div>
      )}

      {activeTab === "diagram" && (
        <div
          className="animate-fade-in"
          style={{
            height: "calc(100vh - 300px)",
            minHeight: 520,
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
          }}
        >
          {/* Subtle grid metadata tag */}
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              zIndex: 10,
              background: "rgba(9, 9, 11, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.4rem 0.8rem",
              borderRadius: "2px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.68rem",
              color: "#71717a",
            }}
          >
            CAMERA: ACTIVE // SCALE: DYNAMIC
          </div>
          <DiagramCanvas nodes={currentDesign.nodes} edges={currentDesign.edges} />
        </div>
      )}

      {activeTab === "scoring" && (
        <div style={{ maxWidth: 760 }}>
          <ScoringPanel design={currentDesign} />
        </div>
      )}

      {activeTab === "export" && (
        <div style={{ maxWidth: 640 }}>
          <ExportPanel design={currentDesign} />
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "rgba(244,63,94,0.05)",
            border: "1px solid rgba(244,63,94,0.15)",
            borderRadius: "4px",
            color: "#fb7185",
            fontSize: "0.88rem",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
