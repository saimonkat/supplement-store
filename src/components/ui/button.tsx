import type { Route } from 'next';

import clsx from 'clsx';

import Link from '@/components/ui/link';

import { ClassName } from '@/types/classname';

import { STATE } from '@/constants/forms';

const styles = {
  transition: 'transition-colors duration-300',
  base: 'group inline-flex justify-center items-center outline-none relative justify-center tracking-tight',
  size: {
    md: 'h-10 text-14 px-4 rounded-md',
    sm: 'h-9 text-14 px-4 rounded-md',
    icon: 'h-10 w-10',
    lg: 'h-11 text-16 px-8 rounded-md',
  },
  theme: {
    'black-filled': 'bg-[#000] text-[#fff] hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200',
    'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
    'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    'ghost': 'hover:text-accent-foreground',
    'destructive': 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    'link': 'text-primary underline-offset-4 hover:underline',
  },
};

type ButtonProps<T extends string> = ClassName & {
  href?: Route<T> | URL;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  children: React.ReactNode;
  state?: (typeof STATE)[keyof typeof STATE];
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  variant?: keyof typeof styles.theme; // shadcn/ui compatibility
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

function Button({
  className: additionalClassName,
  size,
  theme,
  variant,
  href = undefined,
  children,
  state = STATE.DEFAULT,
  type = 'button',
  disabled = false,
  onClick,
  ...props
}: ButtonProps<string>) {
  // Use variant if provided, fallback to theme for backward compatibility
  const buttonTheme = variant || theme;

  const linkClassName = clsx(
    styles.transition,
    size && buttonTheme && styles.base,
    size && styles.size[size],
    buttonTheme && styles.theme[buttonTheme],
    additionalClassName,
  );

  if (href) {
    return (
      <Link className={linkClassName} href={href} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={linkClassName}
      disabled={disabled || state === STATE.LOADING}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
