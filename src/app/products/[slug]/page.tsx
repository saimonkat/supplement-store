'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Package, Users, Calendar, CheckCircle } from 'lucide-react';

import Button from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { products } from '@/data/products';
import { ROUTE } from '@/constants/route';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const { addItem, getItemQuantity, isInCart } = useCart();

  const product = products.find(p => p.id === slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  const currentQuantity = getItemQuantity(product.id);
  const isProductInCart = isInCart(product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating)
          ? 'text-yellow-500 fill-current'
          : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="pt-40 px-safe bg-background md:pt-24">
      <div className="container">
        <div className="mb-8">
          <nav className="text-sm text-muted-foreground mb-4">
            <a href={ROUTE.products as any} className="hover:text-foreground transition-colors">
              Store
            </a>
            <span className="mx-2">/</span>
            <a href={`${ROUTE.products}?category=${product.category}` as any} className="hover:text-foreground transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-16 md:grid-cols-1">
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">Out of Stock</span>
                </div>
              )}
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  Best Seller
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-primary capitalize">
                  {product.category.replace('-', ' ')}
                </span>
                {product.isBestSeller && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>

              <h1 className="fs-48 font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-18 text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium text-foreground">{product.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Servings</p>
                  <p className="font-medium text-foreground">{product.servings}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="fs-32 font-bold text-foreground">
                  ${product.price}
                </span>
                <div className="flex items-center gap-2">
                  {isProductInCart && (
                    <span className="text-sm text-muted-foreground">
                      In cart: {currentQuantity}
                    </span>
                  )}
                </div>
              </div>

              {product.inStock ? (
                <div className="space-y-4">
                  <Button
                    theme="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full py-4 text-lg"
                    disabled={!product.inStock}
                  >
                    {isProductInCart ? 'Already in Cart' : 'Add to Cart'}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 bg-muted rounded-lg">
                  <p className="text-muted-foreground font-medium">This product is currently out of stock</p>
                  <Button
                    theme="outline"
                    size="sm"
                    href={ROUTE.products as any}
                    className="mt-3"
                  >
                    Browse Other Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-16 md:grid-cols-1">
          <div>
            <h2 className="fs-32 font-bold text-foreground mb-6">Ingredients</h2>
            <div className="space-y-2">
              {product.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="fs-32 font-bold text-foreground mb-6">Benefits</h2>
            <div className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            Have questions about this product?
          </p>
          <Button
            theme="outline"
            size="lg"
            href={ROUTE.products as any}
            className="px-8 py-3"
          >
            Back to Store
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
