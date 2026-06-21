import type { NodeType } from "../../types/design";

// Maps our node types to colors, icons, and display config
export const NODE_CONFIG: Record<
  NodeType,
  { color: string; bg: string; border: string; icon: string; label: string }
> = {
  client: {
    color: "#818cf8",
    bg: "rgba(99, 102, 241, 0.12)",
    border: "rgba(99, 102, 241, 0.4)",
    icon: "💻",
    label: "Client",
  },
  server: {
    color: "#34d399",
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.4)",
    icon: "🖥️",
    label: "Server",
  },
  database: {
    color: "#22d3ee",
    bg: "rgba(34, 211, 238, 0.12)",
    border: "rgba(34, 211, 238, 0.4)",
    icon: "🗄️",
    label: "Database",
  },
  cache: {
    color: "#fbbf24",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.4)",
    icon: "⚡",
    label: "Cache",
  },
  queue: {
    color: "#f472b6",
    bg: "rgba(244, 63, 94, 0.12)",
    border: "rgba(244, 63, 94, 0.4)",
    icon: "📨",
    label: "Queue",
  },
  cdn: {
    color: "#a78bfa",
    bg: "rgba(139, 92, 246, 0.12)",
    border: "rgba(139, 92, 246, 0.4)",
    icon: "🌐",
    label: "CDN",
  },
  gateway: {
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.12)",
    border: "rgba(251, 146, 60, 0.4)",
    icon: "🔀",
    label: "Gateway",
  },
  service: {
    color: "#4ade80",
    bg: "rgba(74, 222, 128, 0.12)",
    border: "rgba(74, 222, 128, 0.4)",
    icon: "⚙️",
    label: "Service",
  },
  storage: {
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.4)",
    icon: "💾",
    label: "Storage",
  },
  monitoring: {
    color: "#e879f9",
    bg: "rgba(232, 121, 249, 0.12)",
    border: "rgba(232, 121, 249, 0.4)",
    icon: "📊",
    label: "Monitoring",
  },
  load_balancer: {
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.12)",
    border: "rgba(248, 113, 113, 0.4)",
    icon: "⚖️",
    label: "Load Balancer",
  },
};
