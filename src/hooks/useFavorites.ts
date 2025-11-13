import { useCallback, useEffect, useState } from "react";
import { FAVORITES_STORAGE_KEY } from "@/constants";

function readFavoritesFromStorage(storageKey: string): Set<number> {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return new Set();
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return new Set();
    }

    const ids = parsed.filter((value) => Number.isInteger(value)) as number[];
    return new Set(ids);
  } catch (error) {
    console.warn("Failed to read favourites from storage", error);
    return new Set();
  }
}

export function useFavorites(storageKey: string = FAVORITES_STORAGE_KEY) {
  const [favorites, setFavorites] = useState<Set<number>>(() =>
    readFavoritesFromStorage(storageKey),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites, storageKey]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.has(id),
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}

