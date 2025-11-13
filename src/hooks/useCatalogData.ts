import { useEffect, useState } from "react";
import { ITEMS_ENDPOINT, SIMULATED_FETCH_DELAY_MS } from "@/constants";
import type { CatalogItem } from "@/types";

type CatalogDataState = {
  items: CatalogItem[];
  loading: boolean;
  error: string | null;
};

export function useCatalogData(): CatalogDataState {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(ITEMS_ENDPOINT, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data: CatalogItem[] = await response.json();
        if (!isMounted) {
          return;
        }
        setItems(data);
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        console.error(err);
        if (!isMounted) {
          return;
        }

        setError("Something went wrong while loading items.");
        setItems([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }, SIMULATED_FETCH_DELAY_MS);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return { items, loading, error };
}
