type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), -1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      -1,
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="flex gap-1">
        {visiblePages.map((page, index) => {
          if (page === -1) {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 w-10 items-center justify-center text-slate-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold shadow-sm transition ${
                currentPage === page
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
