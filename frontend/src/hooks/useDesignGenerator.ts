import { useState, useCallback } from "react";
import { generateDesign } from "../services/api";
import type { DesignResponse } from "../types/design";

interface UseDesignGeneratorReturn {
  data: DesignResponse | null;
  loading: boolean;
  error: string | null;
  generate: (query: string) => Promise<void>;
  reset: () => void;
}

export function useDesignGenerator(): UseDesignGeneratorReturn {
  const [data, setData] = useState<DesignResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a system design problem.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generateDesign(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, generate, reset };
}
