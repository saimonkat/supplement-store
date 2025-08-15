import type { Route } from 'next';

export const ROUTE = {
  index: '/',
  store: '/store',
  products: '/store/products',
  product: '/store/products/[id]',
  cart: '/store/cart',
  checkout: '/store/checkout',
  admin: '/admin',
  orders: '/admin/orders',
  order: '/admin/orders/[id]',
} as const;
