'use client';

import { useState, useMemo } from 'react';

import FAQ from '@/components/shared/sections/faq';
import CTA from '@/components/shared/sections/cta';
import ProductCard from '@/components/shared/products/product-card';
import Filters from '@/components/shared/products/filters';
import { useCart } from '@/contexts/cart-context';
import { products } from '@/data/products';
import { filterProducts, sortProducts } from '@/lib/product-utils';
import { ProductFilters, ProductSort } from '@/types/product';

function StorePage() {
  const { addItem } = useCart();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<ProductSort>({ field: 'name', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (Object.keys(filters).length > 0) {
      filtered = filterProducts(filtered, filters);
    }

    return sortProducts(filtered, sort);
  }, [filters, sort, searchQuery]);

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="pt-40 px-safe bg-background md:pt-24">
      <section className="products pb-32 md:pb-24">
        <div className="container">
          <div className="mb-12">
            <h1 className="fs-48 font-bold text-foreground mb-4">Store</h1>
            <p className="text-18 text-muted-foreground">Discover our complete range of premium supplements</p>
          </div>

          <div className="grid grid-cols-4 gap-8 md:grid-cols-1">
            <Filters
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearFilters={clearFilters}
            />

            <main className="col-span-3 md:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
                </p>

                <div className="flex items-center gap-4">
                  <select
                    value={`${sort.field}-${sort.direction}`}
                    onChange={(e) => {
                      const [field, direction] = e.target.value.split('-');
                      setSort({ field: field as any, direction: direction as any });
                    }}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="createdAt-desc">Newest First</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showDescription={true}
                    showAddToCart={true}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </div>
  );
}

export default StorePage;
