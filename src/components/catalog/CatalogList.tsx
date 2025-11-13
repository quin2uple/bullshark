import type { CatalogItem } from "@/types";
import { CatalogItemCard } from "@/components/catalog";

type CatalogListProps = {
  items: CatalogItem[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (value: number) => string;
};

export function CatalogList({
  items,
  isFavorite,
  onToggleFavorite,
  formatPrice,
}: CatalogListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CatalogItemCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          formatPrice={formatPrice}
        />
      ))}
    </ul>
  );
}
