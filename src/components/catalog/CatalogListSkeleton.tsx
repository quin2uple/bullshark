const PLACEHOLDER_COUNT = 8;

export function CatalogListSkeleton() {
  return (
    <div className="w-full" role="status" aria-live="polite">
      <span className="sr-only">Loading items…</span>
      <ul
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-hidden="true"
      >
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
          <li
            className="relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-2 ring-slate-200/50"
            key={index}
          >
            <div className="relative h-6 w-3/5 overflow-hidden rounded-xl bg-linear-to-r from-slate-200 to-slate-100">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent" />
            </div>
            <div className="relative h-5 w-2/5 overflow-hidden rounded-full bg-linear-to-r from-slate-200 to-slate-100">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent" />
            </div>
            <div className="mt-2 flex gap-4 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-4">
              <div className="relative h-6 w-1/3 overflow-hidden rounded-lg bg-slate-200">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent" />
              </div>
              <div className="relative h-6 w-1/3 overflow-hidden rounded-lg bg-slate-200">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
