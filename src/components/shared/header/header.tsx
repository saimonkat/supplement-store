'use client';

import { usePathname } from 'next/navigation';

import { useMobileMenu } from '@/hooks/use-mobile-menu';

import Button from '@/components/ui/button';
import Burger from './burger';
import Link from '@/components/ui/link';
import MobileMenu from '@/components/shared/mobile-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import { MENUS } from '@/constants/menus';
import { ROUTE } from '@/constants/route';

import CartIcon from '@/svgs/icons/cart.inline.svg';
import Logo from '@/svgs/logo.inline.svg';

function Header() {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith('/admin');
  const isHomepage = pathname === '/';

  // Use white colors on homepage for visibility over black hero
  const textColor = isHomepage ? 'text-white' : 'text-foreground';
  const bgColor = isHomepage ? 'bg-white' : 'bg-foreground';

  return (
    <>
      <header className='absolute left-0 right-0 top-0 z-50 h-16 px-safe pt-safe'>
        <nav className="container flex h-full items-center justify-between" aria-label="Global">
          <Link href="/" className={`flex items-center gap-2 ${textColor}`}>
            <Logo className="sm:size-8" width={40} height={40} alt="Logo" />
            <div className={`flex flex-col text-lg font-extrabold leading-none sm:text-md ${textColor}`}>
              <span>SUPPLEMENT</span>
              <span>STORE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-x-6 md:hidden">
            {MENUS.header.map(({ label, href }, index) => (
              <li key={index}>
                <Link
                  size="sm"
                  theme={isHomepage ? "white" : "black"}
                  href={href as any}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-4">
            <ThemeToggle className={textColor} />

            {/* Cart Icon for Store Routes */}
            <Link href={ROUTE.cart as any} className="relative p-2">
              <span className="sr-only">Shopping Cart</span>
              <CartIcon width={24} height={24} className={textColor} />
              {/* Cart Badge - will be dynamic later */}
              <span className={`absolute -top-1 -left-1 h-5 w-5 rounded-full text-xs flex items-center justify-center ${isHomepage ? 'text-black bg-white' : 'bg-foreground text-background'}`}>
                0
              </span>
            </Link>

            <Button
              className='font-medium md:hidden'
              theme={isHomepage ? "outline" : "black-filled"}
              size="sm"
              href={ROUTE.admin as any}
            >
              Admin
            </Button>

            <Burger
              className="hidden md:block"
              spanClassName={bgColor}
              isToggled={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
    </>
  );
}

export default Header;
