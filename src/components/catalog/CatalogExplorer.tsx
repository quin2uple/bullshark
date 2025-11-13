import { useCallback, useMemo, useState } from "react";
import {
  CatalogFilters,
  CatalogHeader,
  CatalogList,
  CatalogListSkeleton,
  NoCatalog,
} from "@/components/catalog";
import {
  ALL_CATEGORIES_VALUE,
  DEFAULT_DEBOUNCE_MS,
  ITEMS_PER_PAGE,
} from "@/constants";
import { Pagination } from "@/elements";
import { useCatalogData, useDebouncedValue, useFavorites } from "@/hooks";
import type { SortDirection, SortField } from "@/types";
import { deriveCategories, filterAndSortItems, formatPrice } from "@/utils";

export function CatalogExplorer() {
  const { items, loading, error } = useCatalogData();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [searchInput, setSearchInput] = useState("");
  const searchTerm = useDebouncedValue(searchInput, DEFAULT_DEBOUNCE_MS);
  const [selectedCategory, setSelectedCategory] =
    useState(ALL_CATEGORIES_VALUE);

  const [sortField, setSortField] = useState<SortField>("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => deriveCategories(items, ALL_CATEGORIES_VALUE),
    [items]
  );

  const filteredItems = useMemo(
    () =>
      filterAndSortItems(items, {
        searchTerm,
        selectedCategory,
        allCategoriesValue: ALL_CATEGORIES_VALUE,
        showFavoritesOnly,
        isFavorite,
        sortField,
        sortDirection,
      }),
    [
      items,
      searchTerm,
      selectedCategory,
      showFavoritesOnly,
      isFavorite,
      sortField,
      sortDirection,
    ]
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  }, []);

  const handleSortFieldChange = useCallback((value: SortField) => {
    setSortField(value);
    setCurrentPage(1);
  }, []);

  const handleSortDirectionChange = useCallback((value: SortDirection) => {
    setSortDirection(value);
    setCurrentPage(1);
  }, []);

  const handleFavoritesToggle = useCallback((value: boolean) => {
    setShowFavoritesOnly(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8"
        role="main"
      >
        <CatalogHeader />

        <CatalogFilters
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortField={sortField}
          onSortFieldChange={handleSortFieldChange}
          sortDirection={sortDirection}
          onSortDirectionChange={handleSortDirectionChange}
          showFavoritesOnly={showFavoritesOnly}
          onShowFavoritesToggle={handleFavoritesToggle}
        />

        <section className="flex flex-col gap-6" aria-live="polite">
          {loading ? (
            <CatalogListSkeleton />
          ) : error ? (
            <div
              className="rounded-3xl border-2 border-red-200 bg-linear-to-br from-red-50 to-red-100 p-10 text-center shadow-xl"
              role="alert"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-200">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-red-800">
                Unable to load the catalog.
              </h2>
              <p className="mt-3 text-base text-red-700">
                {error || "Please refresh the page and try again."}
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <NoCatalog />
          ) : (
            <>
              <CatalogList
                items={paginatedItems}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                formatPrice={formatPrice}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
