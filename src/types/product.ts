export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isBestSeller: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  weight: string;
  servings: number;
  ingredients: string[];
  benefits: string[];
  createdAt: Date;
}

export type ProductCategory =
  | 'protein'
  | 'vitamins'
  | 'minerals'
  | 'amino-acids'
  | 'pre-workout'
  | 'post-workout'
  | 'weight-loss'
  | 'muscle-gain'
  | 'general-health';

export interface ProductFilters {
  category?: ProductCategory;
  priceRange?: [number, number];
  isBestSeller?: boolean;
  inStock?: boolean;
  searchQuery?: string;
}

export interface ProductSort {
  field: 'price' | 'name' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
}
