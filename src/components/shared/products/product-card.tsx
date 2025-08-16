import Image from 'next/image';

import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
  className?: string;
}

function ProductCard({ product, showDescription = true, className = '' }: ProductCardProps) {
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
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary capitalize">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{product.rating}</span>
            <span className="text-yellow-500 text-xs md:text-sm">★</span>
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

        <div className="flex items-center justify-between">
          <span className="text-base md:text-lg font-bold text-foreground">
            ${product.price}
          </span>
          <Button
            theme="primary"
            size="sm"
            href={`${ROUTE.product.replace('[id]', product.id)}` as any}
            disabled={!product.inStock}
            className="text-xs px-2 py-1 md:px-3 md:py-1"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
