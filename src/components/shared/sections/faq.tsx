'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What are the benefits of taking supplements?",
    answer: "Supplements can help fill nutritional gaps, support specific health goals, improve athletic performance, boost energy levels, and enhance overall wellness when used as part of a balanced diet and healthy lifestyle."
  },
  {
    question: "How do I know which supplements are right for me?",
    answer: "Consider your health goals, current diet, lifestyle, and any deficiencies. Consult with a healthcare professional or nutritionist to determine which supplements would be most beneficial for your specific needs."
  },
  {
    question: "Are your supplements third-party tested?",
    answer: "Yes, all our supplements undergo rigorous third-party testing for purity, potency, and quality. We partner with certified laboratories to ensure every product meets our high standards and contains exactly what's listed on the label."
  },
  {
    question: "What's the difference between protein powders?",
    answer: "Whey protein isolate is fast-absorbing with minimal lactose, perfect for post-workout. Whey concentrate contains more nutrients but may have more lactose. Casein protein digests slowly, ideal for overnight muscle recovery. Plant-based proteins are great for those with dairy sensitivities."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping are also available. Free shipping on orders over $50. International shipping times vary by location."
  },
  {
    question: "Can I return supplements if I'm not satisfied?",
    answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unused products for a full refund or exchange. Contact our customer service team to initiate a return."
  }
];

function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-32 px-safe bg-background md:py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fs-48 font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-18 text-muted-foreground max-w-[600px] mx-auto">
            Get answers to common questions about our supplements and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${openItems.has(index) ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
