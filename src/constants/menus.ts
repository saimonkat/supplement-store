import { ROUTE } from '@/constants/route';

export const MENUS = {
  header: [
    { label: 'Products', href: ROUTE.products },
    { label: 'Categories', href: ROUTE.categories },
    { label: 'Best Sellers', href: ROUTE.bestSellers },
    { label: 'FAQ', href: ROUTE.faq },
    { label: 'Contact Us', href: ROUTE.contact },
  ],
  footer: {
    main: [
      {
        heading: 'Store',
        links: [
          { label: 'Home', href: ROUTE.index },
          { label: 'Products', href: ROUTE.products },
          { label: 'Best Sellers', href: ROUTE.bestSellers },
          { label: 'Categories', href: ROUTE.categories },
        ],
      },
      {
        heading: 'Support',
        links: [
          { label: 'Contact Us', href: ROUTE.contact },
          { label: 'Shipping Info', href: ROUTE.index },
          { label: 'Returns', href: ROUTE.index },
          { label: 'FAQ', href: ROUTE.index },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About Us', href: ROUTE.index },
          { label: 'Privacy Policy', href: ROUTE.index },
          { label: 'Terms of Service', href: ROUTE.index },
          { label: 'Admin Portal', href: ROUTE.admin },
        ],
      },
    ],
    social: [
      { label: 'X.com (Twitter)', href: 'https://x.com', icon: 'xcom-icon' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin-icon' },
      { label: 'GitHub', href: 'https://github.com', icon: 'github-icon' },
      { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube-icon' },
      { label: 'Discord', href: 'https://discord.com', icon: 'discord-icon' },
    ],
  },
};
