import Image from 'next/image';

import Button from '@/components/ui/button';

import { ROUTE } from '@/constants/route';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover size-full"
          src="/images/covers/cover-main.jpg"
          alt="Supplement Store Hero"
          width={1920}
          height={1344}
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container text-center text-white">
        <div className="mx-auto flex max-w-[800px] flex-col gap-y-8">
          <h1 className="fs-64 font-bold leading-none">
            Premium Supplements for
            <span className="block"> Peak Performance</span>
          </h1>
          <p className="text-24 leading-tight tracking-tight sm:text-20 max-w-[600px] mx-auto">
            Discover our curated selection of high-quality supplements designed to support your fitness journey and overall wellness.
          </p>
          <div className="flex items-center justify-center gap-x-6 sm:flex-col sm:gap-y-4">
            <Button
              theme="primary"
              size="lg"
              href={ROUTE.products as any}
              className="text-lg px-8 py-4"
            >
              Shop Now
            </Button>
            <Button
              theme="secondary"
              size="lg"
              href={ROUTE.products as any}
              className="text-lg px-8 py-4"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
