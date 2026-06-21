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
        background: config.bg,
        border: `1px solid ${selected ? config.color : config.border}`,
        borderRadius: "12px",
        padding: "12px 16px",
        minWidth: "140px",
        maxWidth: "180px",
        cursor: "grab",
        boxShadow: selected
          ? `0 0 20px ${config.color}40, 0 4px 16px rgba(0,0,0,0.4)`
          : "0 4px 16px rgba(0,0,0,0.4)",
        transition: "all 0.2s ease",
        backdropFilter: "blur(8px)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: config.color,
          border: "2px solid #0d1526",
          width: 8,
          height: 8,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <span style={{ fontSize: "18px", lineHeight: 1 }}>{config.icon}</span>
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: config.color,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            {config.label}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.3,
              marginTop: "3px",
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
            color: "#64748b",
            lineHeight: 1.4,
            marginTop: "4px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "4px",
          }}
        >
          {data.description.slice(0, 60)}{data.description.length > 60 ? "…" : ""}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: config.color,
          border: "2px solid #0d1526",
          width: 8,
          height: 8,
        }}
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";

export default CustomNode;
