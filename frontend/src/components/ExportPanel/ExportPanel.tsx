import { useState } from "react";
import { exportPDF, exportMermaid } from "../../services/api";
import type { DesignResponse } from "../../types/design";

interface ExportPanelProps {
  design: DesignResponse;
}

export default function ExportPanel({ design }: ExportPanelProps) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [mermaidLoading, setMermaidLoading] = useState(false);
  const [mermaid, setMermaid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePDF = async () => {
    setPdfLoading(true);
    setError(null);
    try {
      const blob = await exportPDF(design);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${design.title.replace(/\s+/g, "_").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF export failed.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleMermaid = async () => {
    setMermaidLoading(true);
    setError(null);
    try {
      const mmd = await exportMermaid(design);
      setMermaid(mmd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mermaid export failed.");
    } finally {
      setMermaidLoading(false);
    }
  };

  const downloadMermaid = () => {
    if (!mermaid) return;
    const blob = new Blob([mermaid], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${design.title.replace(/\s+/g, "_").toLowerCase()}.mmd`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyMermaid = () => {
    if (!mermaid) return;
    navigator.clipboard.writeText(mermaid);
  };

  return (
    <div className="glass-card" style={{ padding: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.1rem" }}>📤</span>
        <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9" }}>Export</h3>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button
          className="btn-secondary"
          onClick={handlePDF}
          disabled={pdfLoading}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          {pdfLoading ? "⏳ Generating…" : "📄 Export PDF"}
        </button>
        <button
          className="btn-secondary"
          onClick={handleMermaid}
          disabled={mermaidLoading}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
        >
          {mermaidLoading ? "⏳ Generating…" : "📊 Export Mermaid"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.75rem" }}>{error}</p>
      )}

      {mermaid && (
        <div className="animate-fade-in" style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <button className="btn-secondary" onClick={copyMermaid} style={{ fontSize: "0.75rem", padding: "0.4rem 0.875rem" }}>
              📋 Copy
            </button>
            <button className="btn-secondary" onClick={downloadMermaid} style={{ fontSize: "0.75rem", padding: "0.4rem 0.875rem" }}>
              ⬇️ Download .mmd
            </button>
          </div>
          <pre
            style={{
              background: "#0a1020",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "0.875rem",
              fontSize: "0.72rem",
              color: "#94a3b8",
              overflowX: "auto",
              maxHeight: 200,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {mermaid}
          </pre>
        </div>
      )}
    </div>
  );
}
