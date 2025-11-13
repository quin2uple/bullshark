import type { CatalogItem } from "@/types";
import { Rating } from "@/elements";

type CatalogItemCardProps = {
  item: CatalogItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (value: number) => string;
};

export function CatalogItemCard({
  item,
  isFavorite,
  onToggleFavorite,
  formatPrice,
}: CatalogItemCardProps) {
  const cardClassName = [
    "group relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
    isFavorite
      ? "ring-amber-400/50 shadow-amber-100"
      : "ring-slate-200/50 hover:ring-blue-300/50",
  ].join(" ");

  const favouriteButtonClassName = [
    "absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
    isFavorite
      ? "bg-amber-100 text-amber-500 shadow-md"
      : "bg-slate-100 text-slate-400 hover:bg-slate-200",
  ].join(" ");

  return (
    <li className={cardClassName}>
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-linear-to-br from-blue-100 to-purple-100 opacity-20 transition-opacity duration-300 group-hover:opacity-40" />

      <button
        type="button"
        className={favouriteButtonClassName}
        onClick={() => onToggleFavorite(item.id)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${item.name} from favourites`
            : `Add ${item.name} to favourites`
        }
      >
        <span className="text-2xl">{isFavorite ? "★" : "☆"}</span>
      </button>

      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="pr-12 text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
            {item.name}
          </h2>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-linear-to-r from-blue-50 to-indigo-50 px-3 py-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {item.category}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between gap-4 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-4">
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Price
            </dt>
            <dd className="text-2xl font-extrabold text-blue-600">
              {formatPrice(item.price)}
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Rating
            </dt>
            <dd>
              <Rating rating={item.rating} />
            </dd>
          </div>
        </div>
      </div>
    </li>
  );
}
