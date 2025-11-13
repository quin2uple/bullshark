import { describe, it, expect } from "vitest";
import { filterAndSortItems } from "./catalog";
import type { CatalogItem } from "@/types";

const mockItems: CatalogItem[] = [
  { id: 1, name: "Aurora Lamp", category: "Home", price: 39.99, rating: 4.4 },
  {
    id: 2,
    name: "Trailblazer Backpack",
    category: "Outdoors",
    price: 69.5,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Breeze Running Shoes",
    category: "Sports",
    price: 89.0,
    rating: 4.2,
  },
  {
    id: 4,
    name: "Sierra Water Bottle",
    category: "Outdoors",
    price: 19.99,
    rating: 4.1,
  },
];

describe("filterAndSortItems", () => {
  const mockIsFavorite = (id: number) => id === 1;

  it("should filter items by name (case-insensitive)", () => {
    const result = filterAndSortItems(mockItems, {
      searchTerm: "lamp",
      selectedCategory: "All",
      allCategoriesValue: "All",
      showFavoritesOnly: false,
      isFavorite: mockIsFavorite,
      sortField: "",
      sortDirection: "asc",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Aurora Lamp");
  });

  it("should filter by category", () => {
    const result = filterAndSortItems(mockItems, {
      searchTerm: "",
      selectedCategory: "Outdoors",
      allCategoriesValue: "All",
      showFavoritesOnly: false,
      isFavorite: mockIsFavorite,
      sortField: "",
      sortDirection: "asc",
    });

    expect(result).toHaveLength(2);
    expect(result.every((item) => item.category === "Outdoors")).toBe(true);
  });

  it("should sort by price ascending", () => {
    const result = filterAndSortItems(mockItems, {
      searchTerm: "",
      selectedCategory: "All",
      allCategoriesValue: "All",
      showFavoritesOnly: false,
      isFavorite: mockIsFavorite,
      sortField: "price",
      sortDirection: "asc",
    });

    expect(result[0].price).toBe(19.99);
    expect(result[result.length - 1].price).toBe(89.0);
  });

  it("should sort by rating descending", () => {
    const result = filterAndSortItems(mockItems, {
      searchTerm: "",
      selectedCategory: "All",
      allCategoriesValue: "All",
      showFavoritesOnly: false,
      isFavorite: mockIsFavorite,
      sortField: "rating",
      sortDirection: "desc",
    });

    expect(result[0].rating).toBe(4.7);
    expect(result[result.length - 1].rating).toBe(4.1);
  });

  it("should filter favorites only", () => {
    const result = filterAndSortItems(mockItems, {
      searchTerm: "",
      selectedCategory: "All",
      allCategoriesValue: "All",
      showFavoritesOnly: true,
      isFavorite: mockIsFavorite,
      sortField: "",
      sortDirection: "asc",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});
