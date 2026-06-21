// TypeScript types for System Design Visualizer
// These mirror the backend Pydantic schemas exactly

export interface NodePosition {
  x: number;
  y: number;
}

export type NodeType =
  | "client"
  | "server"
  | "database"
  | "cache"
  | "queue"
  | "cdn"
  | "gateway"
  | "service"
  | "storage"
  | "monitoring"
  | "load_balancer";

export interface DesignNode {
  id: string;
  label: string;
  type: NodeType;
  position?: NodePosition;
  description?: string;
}

export interface DesignEdge {
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface DesignResponse {
  title: string;
  query: string;
  functional_requirements: string[];
  non_functional_requirements: string[];
  components: string[];
  databases: string[];
  caches: string[];
  scalability_considerations: string[];
  bottlenecks: string[];
  interview_questions: string[];
  nodes: DesignNode[];
  edges: DesignEdge[];
}

// Scoring types
export interface ScoreDimension {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface ScoringResponse {
  overall_score: number;
  grade: string;
  dimensions: ScoreDimension[];
  summary: string;
  strengths: string[];
  improvements: string[];
}

// History types
export interface HistoryItem {
  id: string;
  query: string;
  title: string;
  created_at: string;
  design: DesignResponse;
}

export interface HistoryListResponse {
  items: HistoryItem[];
  total: number;
}

// Interview types
export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  hint?: string;
  model_answer: string;
  follow_ups: string[];
}

export interface InterviewResponse {
  design_title: string;
  questions: InterviewQuestion[];
}

// API error
export interface ApiError {
  error: string;
  type: string;
}
