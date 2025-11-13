export function CatalogHeader() {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl sm:p-12">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <span className="text-3xl">🛍️</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Catalog Explorer
          </h1>
        </div>
        <p className="max-w-3xl text-base text-blue-50 sm:text-lg">
          Discover amazing products, compare features, and save your favorites
          with ease.
        </p>
      </div>
    </header>
  );
}

