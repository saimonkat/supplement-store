import { ProductFilters, ProductCategory } from '@/types/product';
import Search from './search';

interface FiltersProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters | ((prev: ProductFilters) => ProductFilters)) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

function Filters({ filters, setFilters, searchQuery, setSearchQuery, clearFilters }: FiltersProps) {
  const categories: ProductCategory[] = ['protein', 'amino-acids', 'pre-workout', 'vitamins', 'general-health', 'post-workout'];

  return (
    <aside className="col-span-1 md:col-span-1">
      <div className="sticky top-24 space-y-6">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Categories</h3>
            {filters.category && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    category: prev.category === category ? undefined : category
                  }))}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground capitalize">
                  {category.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Price Range</h3>
            {filters.priceRange && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, priceRange: undefined }))}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange?.[1] === 25}
                onChange={() => setFilters(prev => ({
                  ...prev,
                  priceRange: prev.priceRange?.[1] === 25 ? undefined : [0, 25]
                }))}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Under $25</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange?.[0] === 25 && filters.priceRange?.[1] === 50}
                onChange={() => setFilters(prev => ({
                  ...prev,
                  priceRange: (prev.priceRange?.[0] === 25 && prev.priceRange?.[1] === 50) ? undefined : [25, 50]
                }))}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">$25 - $50</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange?.[0] === 50}
                onChange={() => setFilters(prev => ({
                  ...prev,
                  priceRange: prev.priceRange?.[0] === 50 ? undefined : [50, 100]
                }))}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Over $50</span>
            </label>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Availability</h3>
            {(filters.inStock !== undefined || filters.isBestSeller !== undefined) && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, inStock: undefined, isBestSeller: undefined }))}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  inStock: e.target.checked ? true : undefined
                }))}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isBestSeller === true}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  isBestSeller: e.target.checked ? true : undefined
                }))}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Best Sellers</span>
            </label>
          </div>
        </div>

        {(Object.keys(filters).length > 0 || searchQuery) && (
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
}

export default Filters;
