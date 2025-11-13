import { useEffect, useState } from "react";
import { DEFAULT_DEBOUNCE_MS } from "@/constants";

export function useDebouncedValue<T>(value: T, delay = DEFAULT_DEBOUNCE_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(handle);
  }, [value, delay]);

  return debouncedValue;
}
