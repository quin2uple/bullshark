export type CatalogItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

export type SortField = "price" | "rating" | "";
export type SortDirection = "asc" | "desc";
