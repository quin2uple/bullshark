import type { SortDirection, SortField } from "@/types";

type CatalogFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (value: SortDirection) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesToggle: (value: boolean) => void;
};

export function CatalogFilters({
  searchValue,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
  showFavoritesOnly,
  onShowFavoritesToggle,
}: CatalogFiltersProps) {
  const fieldContainerClass =
    "flex flex-col gap-2 text-sm font-medium text-slate-700";
  const inputControlClass =
    "rounded-xl border-1 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100";
  const selectControlClass =
    "rounded-xl border-1 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50";

  return (
    <section
      className="grid grid-cols-1 gap-5 rounded-3xl bg-white/80 p-7 shadow-xl backdrop-blur-sm ring-1 ring-slate-200/50 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:sticky md:top-4 z-50"
      aria-label="Filters and sorting"
    >
      <div className={fieldContainerClass}>
        <label
          htmlFor="search"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600"
        >
          <span>🔍</span> Search by name
        </label>
        <input
          id="search"
          type="search"
          placeholder="Type to search..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          autoComplete="off"
          className={inputControlClass}
        />
      </div>

      <div className={fieldContainerClass}>
        <label
          htmlFor="category"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600"
        >
          <span>📂</span> Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={selectControlClass}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldContainerClass}>
        <label
          htmlFor="sort-field"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600"
        >
          <span>⚡</span> Sort by
        </label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(event) =>
            onSortFieldChange(event.target.value as SortField)
          }
          className={selectControlClass}
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className={fieldContainerClass}>
        <label
          htmlFor="sort-direction"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600"
        >
          <span>🔄</span> Sort direction
        </label>
        <select
          id="sort-direction"
          value={sortDirection}
          onChange={(event) =>
            onSortDirectionChange(event.target.value as SortDirection)
          }
          disabled={!sortField}
          className={selectControlClass}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div
        className="flex items-center justify-start gap-3 rounded-2xl border-2 border-amber-200 bg-linear-to-r from-amber-50 to-yellow-50 p-4 shadow-sm sm:col-span-2 lg:col-span-3 xl:col-span-1 cursor-pointer"
        role="button"
        onClick={() => onShowFavoritesToggle(!showFavoritesOnly)}
      >
        <input
          id="favorites-only"
          type="checkbox"
          checked={showFavoritesOnly}
          className="h-5 w-5 rounded-md border-2 border-amber-400 text-amber-500 transition focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
        />
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer select-none">
          Favourites Only
        </label>
      </div>
    </section>
  );
}
