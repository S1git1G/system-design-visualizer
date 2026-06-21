import type { DesignNode, DesignEdge } from "../../types/design";
import type { Node, Edge } from "@xyflow/react";
import { NODE_CONFIG } from "./nodeConfig";

// Auto-layout using a simple grid algorithm
// (For production, dagre would be used, but we keep it dependency-light)
export function layoutNodes(nodes: DesignNode[]): Node[] {
  const COLS = 4;
  const H_GAP = 220;
  const V_GAP = 140;

  // Group by type for better visual layout
  const typeOrder: string[] = [
    "client",
    "cdn",
    "gateway",
    "load_balancer",
    "server",
    "service",
    "queue",
    "cache",
    "database",
    "storage",
    "monitoring",
  ];

  const sorted = [...nodes].sort((a, b) => {
    const ai = typeOrder.indexOf(a.type);
    const bi = typeOrder.indexOf(b.type);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return sorted.map((node, index) => {
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const config = NODE_CONFIG[node.type] || NODE_CONFIG.service;

    return {
      id: node.id,
      type: "customNode",
      position: node.position || { x: col * H_GAP + 60, y: row * V_GAP + 60 },
      data: {
        label: node.label,
        type: node.type,
        description: node.description,
        config,
      },
      draggable: true,
    };
  });
}

export function buildEdges(edges: DesignEdge[]): Edge[] {
  return edges.map((edge, index) => ({
    id: `edge-${index}-${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: edge.animated ?? false,
    style: {
      stroke: "rgba(99, 102, 241, 0.6)",
      strokeWidth: 2,
    },
    labelStyle: {
      fontSize: 10,
      fontFamily: "Inter, sans-serif",
      fill: "#94a3b8",
    },
    labelBgStyle: {
      fill: "#0d1526",
      fillOpacity: 0.9,
    },
    type: "smoothstep",
  }));
}
