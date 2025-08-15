import { Product, ProductFilters, ProductSort } from '@/types/product';

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Best seller filter
    if (filters.isBestSeller !== undefined && product.isBestSeller !== filters.isBestSeller) {
      return false;
    }

    // In stock filter
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'createdAt':
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      default:
        return 0;
    }

    if (sort.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return sortedProducts;
}

export function getBestSellers(products: Product[], limit: number = 4): Product[] {
  return products
    .filter(product => product.isBestSeller)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}
