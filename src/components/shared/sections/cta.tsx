import Button from '@/components/ui/button';
import { ROUTE } from '@/constants/route';

function CallToAction() {
  return (
    <section className="py-32 px-safe bg-muted/5 text-center relative overflow-hidden md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
      <div className="container max-w-3xl mx-auto relative z-10">
        <h2 className="fs-48 font-bold mb-4 leading-tight">
          Ready to Elevate Your Performance?
        </h2>
        <p className="fs-20 mb-10 leading-relaxed">
          Explore our premium selection of supplements designed to help you achieve your fitness goals.
        </p>
        <Button
          theme="secondary"
          size="lg"
          href={ROUTE.products as any}
          className="px-8 py-4 text-lg bg-background hover:bg-background/90 border-2 border-primary-foreground/20"
        >
          Shop All Products
        </Button>
      </div>
    </section>
  );
}

export default CallToAction;
