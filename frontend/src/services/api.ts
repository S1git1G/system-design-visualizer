import axios, { AxiosError } from "axios";
import type {
  DesignResponse,
  ScoringResponse,
  HistoryListResponse,
  HistoryItem,
  InterviewResponse,
} from "../types/design";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 150000, // 2.5 minutes for LLM calls
  headers: { "Content-Type": "application/json" },
});

// ---- Error helper ----
function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    if (data?.error) return data.error;
    if (error.code === "ECONNABORTED") return "Request timed out. The AI is taking too long. Please try again.";
    if (error.code === "ERR_NETWORK") return "Cannot connect to the backend. Make sure it is running on port 8000.";
  }
  return "An unexpected error occurred. Please try again.";
}

// ---- Design API ----
export async function generateDesign(query: string): Promise<DesignResponse> {
  try {
    const { data } = await api.post<DesignResponse>("/api/generate", { query });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

// ---- Scoring API ----
export async function scoreDesign(design: DesignResponse): Promise<ScoringResponse> {
  try {
    const { data } = await api.post<ScoringResponse>("/api/score", {
      design_title: design.title,
      components: design.components,
      databases: design.databases,
      caches: design.caches,
      scalability_considerations: design.scalability_considerations,
      bottlenecks: design.bottlenecks,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

// ---- History API ----
export async function getHistory(): Promise<HistoryListResponse> {
  try {
    const { data } = await api.get<HistoryListResponse>("/api/history");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function getHistoryItem(id: string): Promise<HistoryItem> {
  try {
    const { data } = await api.get<HistoryItem>(`/api/history/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    await api.delete(`/api/history/${id}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await api.delete("/api/history");
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

// ---- Interview API ----
export async function generateInterview(
  design_title: string,
  components: string[],
  num_questions: number = 5
): Promise<InterviewResponse> {
  try {
    const { data } = await api.post<InterviewResponse>("/api/interview", {
      design_title,
      components,
      num_questions,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

// ---- Export API ----
export async function exportPDF(design: DesignResponse): Promise<Blob> {
  try {
    const response = await api.post("/api/export/pdf", design, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function exportMermaid(design: DesignResponse): Promise<string> {
  try {
    const { data } = await api.post<{ mermaid: string }>("/api/export/mermaid", design);
    return data.mermaid;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export default api;
