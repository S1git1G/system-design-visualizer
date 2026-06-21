import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { NodeType } from "../../types/design";
import { NODE_CONFIG } from "./nodeConfig";

interface CustomNodeData {
  label: string;
  type: NodeType;
  description?: string;
  config: (typeof NODE_CONFIG)[NodeType];
}

interface CustomNodeProps {
  data: CustomNodeData;
  selected?: boolean;
}

const CustomNode = memo(({ data, selected }: CustomNodeProps) => {
  const config = data.config || NODE_CONFIG.service;

  return (
    <div
      style={{
        background: "rgba(9, 9, 11, 0.75)",
        border: `1px solid ${selected ? "#ffffff" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "4px",
        padding: "12px 14px",
        minWidth: "150px",
        maxWidth: "200px",
        cursor: "grab",
        boxShadow: selected
          ? `0 0 20px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.8)`
          : "0 4px 16px rgba(0,0,0,0.6)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#ffffff",
          border: "1px solid #050506",
          width: 6,
          height: 6,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <span style={{ fontSize: "16px", lineHeight: 1 }}>{config.icon}</span>
        <div>
          <div
            style={{
              fontSize: "8.5px",
              fontWeight: 500,
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              lineHeight: 1,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {config.label}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.3,
              marginTop: "4px",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            {data.label}
          </div>
        </div>
      </div>

      {data.description && (
        <div
          style={{
            fontSize: "10px",
            color: "#a1a1aa",
            lineHeight: 1.4,
            marginTop: "6px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "6px",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {data.description.slice(0, 80)}{data.description.length > 80 ? "…" : ""}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#ffffff",
          border: "1px solid #050506",
          width: 6,
          height: 6,
        }}
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";

export default CustomNode;
