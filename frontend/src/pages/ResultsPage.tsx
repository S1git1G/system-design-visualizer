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
  { id: "analysis", icon: "📋", label: "Analysis" },
  { id: "diagram", icon: "🗺️", label: "Diagram" },
  { id: "scoring", icon: "🏆", label: "Score" },
  { id: "export", icon: "📤", label: "Export" },
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
    { title: "Functional Requirements", icon: "✅", items: currentDesign.functional_requirements, color: "#34d399" },
    { title: "Non-Functional Requirements", icon: "⚡", items: currentDesign.non_functional_requirements, color: "#60a5fa" },
    { title: "Core Components", icon: "🧩", items: currentDesign.components, color: "#818cf8" },
    { title: "Database Recommendations", icon: "🗄️", items: currentDesign.databases, color: "#22d3ee" },
    { title: "Cache Layer", icon: "⚡", items: currentDesign.caches, color: "#fbbf24" },
    { title: "Scalability Strategies", icon: "📈", items: currentDesign.scalability_considerations, color: "#a78bfa" },
    { title: "Potential Bottlenecks", icon: "⚠️", items: currentDesign.bottlenecks, color: "#f87171" },
    { title: "Interview Questions", icon: "💬", items: currentDesign.interview_questions, color: "#fb923c" },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
          gap: "1rem",
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
              color: "#6366f1",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
              marginBottom: "0.5rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            ← New Design
          </button>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 900,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            <span className="gradient-text">{currentDesign.title}</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Query: "{currentDesign.query}"
          </p>
        </div>

        {/* Node/edge count badges */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span className="badge badge-indigo">{currentDesign.nodes.length} Nodes</span>
          <span className="badge badge-violet">{currentDesign.edges.length} Edges</span>
          <span className="badge badge-cyan">{currentDesign.components.length} Components</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          display: "flex",
          gap: "0.25rem",
          marginBottom: "1.5rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
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
              gap: "0.4rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "9px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
              background: activeTab === tab.id ? "rgba(99,102,241,0.15)" : "transparent",
              color: activeTab === tab.id ? "#818cf8" : "#64748b",
              boxShadow: activeTab === tab.id ? "0 0 0 1px rgba(99,102,241,0.3)" : "none",
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
            gap: "1rem",
          }}
        >
          {CARD_SECTIONS.map((section, i) => (
            <AnalysisCard
              key={section.title}
              title={section.title}
              icon={section.icon}
              items={section.items}
              accentColor={section.color}
              delay={i * 80}
            />
          ))}
        </div>
      )}

      {activeTab === "diagram" && (
        <div
          className="animate-fade-in"
          style={{
            height: "calc(100vh - 300px)",
            minHeight: 500,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <DiagramCanvas nodes={currentDesign.nodes} edges={currentDesign.edges} />
        </div>
      )}

      {activeTab === "scoring" && (
        <div style={{ maxWidth: 720 }}>
          <ScoringPanel design={currentDesign} />
        </div>
      )}

      {activeTab === "export" && (
        <div style={{ maxWidth: 600 }}>
          <ExportPanel design={currentDesign} />
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.3)",
            borderRadius: 12,
            color: "#fb7185",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
