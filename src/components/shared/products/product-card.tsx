import Image from 'next/image';

import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

function ProductCard({
  product,
  showDescription = true,
  showAddToCart = false,
  onAddToCart,
  className = ''
}: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-xs md:text-sm">Out of Stock</span>
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary capitalize">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{product.rating}</span>
            <span className="text-yellow-500 text-xs md:text-sm">★</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>

        {showDescription && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2 sm:hidden">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="text-base md:text-lg font-bold text-foreground">
            ${product.price}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.weight} • {product.servings} servings
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            theme="outline"
            size="sm"
            href={`${ROUTE.products}/${product.id}` as any}
            className="flex-1 text-xs px-2 py-1 md:px-3 md:py-1"
          >
            View Details
          </Button>

          {showAddToCart && product.inStock && (
            <Button
              theme="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="text-xs px-2 py-1 md:px-3 md:py-1"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
