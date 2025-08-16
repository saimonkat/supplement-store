'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '@/types/product';
import { CartItem, Cart } from '@/types/cart';
import { addToCart, removeFromCart, clearCart, calculateCartTotals } from '@/lib/cart-utils';

interface CartContextType {
  cart: Cart;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCartItems: () => void;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      return addToCart(state, product, 1);
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      return removeFromCart(state, productId);
    }
    case 'CLEAR_CART':
      return clearCart();
    default:
      return state;
  }
}

const initialState: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const clearCartItems = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: string): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  const getCartItemCount = (): number => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    clearCartItems,
    getItemQuantity,
    isInCart,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
