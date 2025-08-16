import ProductCard from '@/components/shared/products/product-card';

import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';
import { getBestSellers } from '@/lib/product-utils';
import { products } from '@/data/products';

function BestSellers() {
  const bestSellers = getBestSellers(products, 5);

  return (
    <section id="best-sellers" className="py-20 px-safe">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fs-48 font-bold text-foreground mb-4">
            Best Sellers
          </h2>
          <p className="text-18 text-muted-foreground max-w-[600px] mx-auto">
            Our most popular supplements trusted by fitness enthusiasts worldwide
          </p>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            theme="outline"
            size="lg"
            href={ROUTE.products as any}
            className="text-lg px-8 py-4"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
