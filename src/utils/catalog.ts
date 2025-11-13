import type { CatalogItem, SortDirection, SortField } from "@/types";

export function deriveCategories(
  items: CatalogItem[],
  allCategoriesValue: string,
): string[] {
  const unique = new Set(items.map((item) => item.category));
  return [
    allCategoriesValue,
    ...Array.from(unique).sort((a, b) => a.localeCompare(b)),
  ];
}

type FilterConfig = {
  searchTerm: string;
  selectedCategory: string;
  allCategoriesValue: string;
  showFavoritesOnly: boolean;
  isFavorite: (id: number) => boolean;
  sortField: SortField;
  sortDirection: SortDirection;
};

export function filterAndSortItems(
  items: CatalogItem[],
  {
    searchTerm,
    selectedCategory,
    allCategoriesValue,
    showFavoritesOnly,
    isFavorite,
    sortField,
    sortDirection,
  }: FilterConfig,
): CatalogItem[] {
  let result = [...items];

  const normalizedTerm = searchTerm.trim().toLowerCase();
  if (normalizedTerm) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(normalizedTerm),
    );
  }

  if (selectedCategory !== allCategoriesValue) {
    result = result.filter((item) => item.category === selectedCategory);
  }

  if (showFavoritesOnly) {
    result = result.filter((item) => isFavorite(item.id));
  }

  if (sortField) {
    result = result.sort((a, b) => {
      const difference = a[sortField] - b[sortField];
      return sortDirection === "asc" ? difference : -difference;
    });
  }

  return result;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

