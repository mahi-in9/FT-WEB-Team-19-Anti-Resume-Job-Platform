import { useCallback } from "react";

/**
 * Simple tiny storage helper:
 * - get initial from localStorage (or fallback)
 * - save will persist to localStorage
 *
 * This simulates a backend for demo. Replace with API calls in production.
 */

export default function useLocalData(key, fallback) {
  // read once synchronously
  let raw = null;
  try {
    raw = localStorage.getItem(key);
  } catch (e) {
    raw = null;
  }
  const data = raw ? JSON.parse(raw) : fallback;

  const save = useCallback(
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        // ignore localStorage errors in some browsers or private mode
        console.error("Failed saving to localStorage", e);
      }
    },
    [key]
  );

  return { data, save };
}
