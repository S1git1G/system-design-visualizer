import { useState, useCallback } from "react";
import { getHistory, deleteHistoryItem, clearHistory } from "../services/api";
import type { HistoryListResponse } from "../types/design";

export function useHistory() {
  const [data, setData] = useState<HistoryListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHistory();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    try {
      await deleteHistoryItem(id);
      setData((prev) =>
        prev
          ? { ...prev, items: prev.items.filter((i) => i.id !== id), total: prev.total - 1 }
          : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item.");
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await clearHistory();
      setData({ items: [], total: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear history.");
    }
  }, []);

  return { data, loading, error, fetchHistory, deleteItem, clearAll };
}
