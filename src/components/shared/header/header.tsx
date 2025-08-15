'use client';


import { useMobileMenu } from '@/hooks/use-mobile-menu';

import Button from '@/components/ui/button';
import Burger from '@/components/shared/header/burger';
import Link from '@/components/ui/link';
import MobileMenu from '@/components/shared/mobile-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import { MENUS } from '@/constants/menus';
import { ROUTE } from '@/constants/route';

import Logo from '@/svgs/logo.inline.svg';

function Header() {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-50 h-16 px-safe pt-safe">
        <nav className="container flex h-full items-center justify-between" aria-label="Global">
          <Link href="/">
            <Logo width={40} height={40} alt="Logo" />
            <span className="sr-only">Supplement Store</span>
          </Link>
          <ul className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-x-6 md:hidden">
            {MENUS.header.map(({ label, href }, index) => (
              <li key={index}>
                <Link size="sm" theme="black" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <Button
              className="font-medium md:hidden"
              theme="black-filled"
              size="sm"
              href={ROUTE.index}
            >
              Contact us
            </Button>
          </div>
          <Burger
            className="hidden md:block"
            isToggled={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
    </>
  );
}

export default Header;
