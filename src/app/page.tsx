import Hero from '@/components/pages/home/hero';
import BentoGrid from '@/components/pages/home/bento-grid';
import BestSellers from '@/components/pages/home/best-sellers';

import { getMetadata } from '@/lib/get-metadata';

import { SEO_DATA } from '@/constants/seo-data';

function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <BestSellers />
    </>
  );
}

export default Home;

export const metadata = getMetadata(SEO_DATA.index);
