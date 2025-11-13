import type { PropsWithChildren } from "react";

type NoCatalogProps = PropsWithChildren<{
  title?: string;
  message?: string;
}>;

export function NoCatalog({
  title = "No items to display",
  message = "Try adjusting your search or filters and give it another shot.",
  children,
}: NoCatalogProps) {
  return (
    <div
      className="rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 p-12 text-center shadow-xl ring-2 ring-slate-200/50"
      role="status"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-indigo-100">
        <span className="text-5xl">🔍</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-base text-slate-600">{message}</p>
      {children ? (
        <div className="mt-6 flex justify-center">{children}</div>
      ) : null}
    </div>
  );
}
