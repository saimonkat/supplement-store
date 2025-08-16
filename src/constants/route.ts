import type { Route } from 'next';

export const ROUTE = {
  index: '/',
  categories: '/#categories',
  bestSellers: '/#best-sellers',
  faq: '/#faq',
  products: '/products',
  cart: '/cart',
  checkout: '/checkout',
  admin: '/admin',
  orders: '/admin/orders',
  order: '/admin/orders/[id]',
  contact: 'mailto:contact@supplementstore.com',
} as const;
