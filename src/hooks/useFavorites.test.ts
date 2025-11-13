import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useFavorites", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should toggle favorite on and off", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(1)).toBe(false);

    // Toggle on
    act(() => {
      result.current.toggleFavorite(1);
    });
    expect(result.current.isFavorite(1)).toBe(true);

    // Toggle off
    act(() => {
      result.current.toggleFavorite(1);
    });
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it("should persist favorites to localStorage", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(1);
      result.current.toggleFavorite(3);
    });

    const stored = JSON.parse(
      localStorageMock.getItem("catalog:favourites") || "[]"
    );
    expect(stored).toContain(1);
    expect(stored).toContain(3);
  });

  it("should load favorites from localStorage on mount", () => {
    localStorageMock.setItem("catalog:favourites", JSON.stringify([2, 4]));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(2)).toBe(true);
    expect(result.current.isFavorite(4)).toBe(true);
    expect(result.current.isFavorite(1)).toBe(false);
  });
});
