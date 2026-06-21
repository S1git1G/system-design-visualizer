import { useState, useCallback } from "react";
import { scoreDesign } from "../services/api";
import type { DesignResponse, ScoringResponse } from "../types/design";

interface UseScoreReturn {
  score: ScoringResponse | null;
  loading: boolean;
  error: string | null;
  fetchScore: (design: DesignResponse) => Promise<void>;
}

export function useScore(): UseScoreReturn {
  const [score, setScore] = useState<ScoringResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async (design: DesignResponse) => {
    setLoading(true);
    setError(null);
    try {
      const result = await scoreDesign(design);
      setScore(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scoring failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { score, loading, error, fetchScore };
}
