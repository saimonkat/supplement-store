import type { Route } from 'next';
import NextLink from 'next/link';

import clsx from 'clsx';

const styles = {
  transition: 'transition-colors duration-200',
  base: 'inline-flex items-center',
  size: {
    md: 'text-16 tracking-tight',
    sm: 'text-15 tracking-tight',
    xs: 'text-14 tracking-tight',
  },
  theme: {
    white: 'text-white hover:text-gray-80 dark:text-white dark:hover:text-gray-200',
    gray: 'text-gray-94 hover:text-gray-70 dark:text-gray-300 dark:hover:text-gray-100',
    black: 'text-black hover:text-gray-20 dark:text-white dark:hover:text-gray-200',
    primary: 'text-primary hover:text-primary/80',
    secondary: 'text-secondary hover:text-secondary/80',
  },
};

type LinkProps<T extends string = string> = {
  className?: string;
  href: Route<T> | URL;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  children: React.ReactNode;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  withArrow?: boolean;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function Link({
  className: additionalClassName,
  size,
  theme,
  href,
  children,
  ...props
}: LinkProps) {
  const linkClassName = clsx(
    styles.transition,
    size && theme && styles.base,
    size && styles.size[size],
    theme && styles.theme[theme],
    additionalClassName,
  );

  /*
    Using next/link component only for internal navigation.
    https://github.com/vercel/next.js/blob/canary/errors/invalid-href-passed.md
  */
  if (href.toString().startsWith('/')) {
    return (
      <NextLink className={linkClassName} href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a className={linkClassName} href={href.toString()} {...props}>
      {children}
    </a>
  );
}

export default Link;
