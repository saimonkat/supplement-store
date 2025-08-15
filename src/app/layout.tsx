import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '@/styles/globals.css';

import { inter } from './fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("RootLayout rendering with ThemeProvider");

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="grow">{children}</main>
          <Footer />
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
