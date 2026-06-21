import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { DesignNode, DesignEdge } from "../../types/design";
import CustomNode from "./CustomNode";
import { layoutNodes, buildEdges } from "./diagramUtils";
import { NODE_CONFIG } from "./nodeConfig";

const nodeTypes = { customNode: CustomNode };

interface DiagramCanvasProps {
  nodes: DesignNode[];
  edges: DesignEdge[];
}

export default function DiagramCanvas({ nodes, edges }: DiagramCanvasProps) {
  const initialNodes = useMemo(() => layoutNodes(nodes), [nodes]);
  const initialEdges = useMemo(() => buildEdges(edges), [edges]);

  const [flowNodes, , onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) =>
      setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden" }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(99,102,241,0.15)"
        />
        <Controls
          style={{
            background: "#0d1526",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const type = node.data?.type as string;
            return NODE_CONFIG[type as keyof typeof NODE_CONFIG]?.color || "#6366f1";
          }}
          style={{
            background: "#0d1526",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
          }}
          maskColor="rgba(0,0,0,0.5)"
        />
      </ReactFlow>
    </div>
  );
}
