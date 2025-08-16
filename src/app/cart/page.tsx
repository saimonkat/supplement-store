'use client';

import Image from 'next/image';
import { Trash2, ShoppingBag } from 'lucide-react';

import Button from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { ROUTE } from '@/constants/route';

function CartPage() {
  const { cart, removeItem, clearCartItems, getCartItemCount } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCartItems();
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  };

  if (cart.items.length === 0) {
    return (
      <div className="py-40 px-safe md:py-24">
        <div className="container">
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="fs-48 font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-18 text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button
              theme="primary"
              size="lg"
              href={ROUTE.products as any}
              className="px-8 py-4 text-lg"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 px-safe md:pt-24">
      <div className="container">
        <div className="mb-12">
          <h1 className="fs-48 font-bold text-foreground mb-4">Shopping Cart</h1>
          <p className="text-18 text-muted-foreground">
            {getCartItemCount()} item{getCartItemCount() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 md:grid-cols-1">
          <div className="col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div key={item.product.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg border border-border">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 capitalize">
                          {item.product.category.replace('-', ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.product.weight} • {item.product.servings} servings
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground mb-2">
                          ${item.product.price}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-2"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Cart Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${cart.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    theme="primary"
                    size="lg"
                    href={ROUTE.checkout as any}
                    className="w-full py-4 text-lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    theme="outline"
                    size="lg"
                    onClick={handleClearCart}
                    className="w-full py-3"
                  >
                    Clear Cart
                  </Button>

                  <Button
                    theme="ghost"
                    size="lg"
                    href={ROUTE.products as any}
                    className="w-full py-3"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
