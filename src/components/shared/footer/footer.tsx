import Image from 'next/image';

import clsx from 'clsx';

import Link from '@/components/ui/link';

import { MENUS } from '@/constants/menus';
import { ROUTE } from '@/constants/route';

import Logo from '@/svgs/logo.inline.svg';


function Footer() {
  return (
    <footer className="relative border-t border-border py-10 px-safe pb-safe-or-10">
      <div className="container">
        <div className="flex justify-between md:flex-col">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="sm:size-8" width={40} height={40} alt="Logo" />
            <div className="flex flex-col text-lg font-extrabold text-foreground leading-none sm:text-md">
              <span>SUPPLEMENT</span>
              <span>STORE</span>
            </div>
          </Link>
          <nav className="flex w-fit justify-between gap-x-32 gap-y-8 lg:gap-x-20 md:mt-8 md:gap-x-24 xs:grid xs:w-full xs:grid-cols-2 xs:gap-x-5">
            {MENUS.footer.main.map(({ heading, links }, columnIndex) => (
              <div className="flex flex-col" key={columnIndex}>
                <span className="text-14 leading-none tracking-tight text-muted-foreground">
                  {heading}
                </span>
                <ul className="mt-7 flex flex-col gap-y-5 sm:mt-6">
                  {links?.map(({ label, href }, index) => {
                    const isExternalUrl = (href as string).startsWith('http');

                    return (
                      <li className="flex" key={index}>
                        <Link
                          className="whitespace-nowrap font-medium leading-none tracking-tight opacity-80 hover:opacity-100 transition-opacity"
                          href={href as any}
                          size="md"
                          rel={isExternalUrl ? 'noopener noreferrer' : undefined}
                          target={isExternalUrl ? '_blank' : undefined}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-11 flex items-center justify-between gap-y-8 md:mt-8 md:flex-col-reverse md:items-start sm:mt-10 sm:gap-y-10">
          <p className="text-14 leading-none tracking-tight text-muted-foreground">
            © {new Date().getFullYear()} — Copyright
          </p>
          <ul className="flex gap-x-5">
            {MENUS.footer.social.map(({ label, href, icon }, index) => (
              <li className="flex" key={index}>
                <Link
                  className="group h-5 w-5"
                  href={href as any}
                  theme="white"
                  rel="noopener noreferrer"
                  title={label}
                  target="_blank"
                >
                  <span className="sr-only">{label}</span>
                  <span
                    className={clsx(
                      'inline-block h-5 w-5 bg-muted-foreground transition-colors duration-200 group-hover:bg-foreground',
                      icon,
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
