import { Cart, CartItem } from '@/types/cart';
import { Product } from '@/types/product';

export function addToCart(cart: Cart, product: Product, quantity: number = 1): Cart {
  const existingItemIndex = cart.items.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    // Update existing item quantity
    const updatedItems = [...cart.items];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + quantity,
    };

    return calculateCartTotals({ ...cart, items: updatedItems });
  } else {
    // Add new item
    const newItem: CartItem = { product, quantity };
    const updatedItems = [...cart.items, newItem];

    return calculateCartTotals({ ...cart, items: updatedItems });
  }
}

export function removeFromCart(cart: Cart, productId: string): Cart {
  const updatedItems = cart.items.filter(item => item.product.id !== productId);
  return calculateCartTotals({ ...cart, items: updatedItems });
}

export function updateCartItemQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }

  const updatedItems = cart.items.map(item =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );

  return calculateCartTotals({ ...cart, items: updatedItems });
}

export function clearCart(): Cart {
  return {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  };
}

export function calculateCartTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return {
    ...cart,
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export function getCartItemCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function isProductInCart(cart: Cart, productId: string): boolean {
  return cart.items.some(item => item.product.id === productId);
}

export function getCartItemQuantity(cart: Cart, productId: string): number {
  const item = cart.items.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
}
