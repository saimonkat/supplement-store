import Hero from '@/components/pages/home/hero';
import Categories from '@/components/pages/home/categories';
import BestSellers from '@/components/pages/home/best-sellers';
import FAQ from '@/components/shared/sections/faq';
import CTA from '@/components/shared/sections/cta';

import { getMetadata } from '@/lib/get-metadata';

import { SEO_DATA } from '@/constants/seo-data';

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;

export const metadata = getMetadata(SEO_DATA.index);
