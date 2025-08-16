import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/shared/header/header';
import Footer from '@/components/shared/footer/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { CartProvider } from '@/contexts/cart-context';

import { SEO_DATA } from '@/constants/seo-data';

import '@/styles/globals.css';
import { getMetadata } from '@/lib/get-metadata';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = getMetadata(SEO_DATA.index);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("RootLayout rendering with ThemeProvider");
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};
