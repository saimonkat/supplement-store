import Image from 'next/image';

import Link from '@/components/ui/link';

import { ROUTE } from '@/constants/route';

const categories = [
  {
    id: 1,
    title: 'Protein Power',
    description: 'Premium protein supplements for muscle growth and recovery',
    image: '/images/covers/cover-1.jpg',
    href: ROUTE.products,
    className: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    title: 'Pre-Workout',
    description: 'Energy boosters for maximum performance',
    image: '/images/covers/cover-2.jpg',
    href: ROUTE.products,
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    title: 'Vitamins & Minerals',
    description: 'Essential nutrients for overall health',
    image: '/images/covers/cover-3.jpg',
    href: ROUTE.products,
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    title: 'Amino Acids',
    description: 'Building blocks for muscle development',
    image: '/images/covers/cover-4.jpg',
    href: ROUTE.products,
    className: 'col-span-2 row-span-1',
  },
];

function Categories() {
  return (
    <section id="categories" className="py-20 px-safe">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fs-48 font-bold text-foreground mb-4">
            Explore Our Categories
          </h2>
          <p className="text-18 text-muted-foreground max-w-[600px] mx-auto">
            Discover the perfect supplements for your fitness goals and wellness journey
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 h-[600px] sm:grid-cols-2 sm:h-auto sm:gap-4">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={item.href as any}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 ${item.className}`}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-24 font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-16 text-gray-200 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
