import { ArrowRight, CircleHelp, MessageCircleQuestion, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does gear rental work?',
    answer:
      'Browse available equipment, choose your rental dates, and review the provider details. Once you complete secure payment, you can pick up your gear or arrange delivery according to the provider’s policy.',
  },
  {
    question: 'How are rental prices calculated?',
    answer:
      'Each provider sets a daily rental rate for their gear. Your total is based on the rate multiplied by the number of rental days, plus any applicable delivery fees, deposits, or platform charges shown at checkout.',
  },
  {
    question: 'Can I cancel a booking?',
    answer:
      'You can request a cancellation from your rental details. Eligibility and any cancellation fee depend on the provider’s policy, the booking status, and how close the request is to the rental start date.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'When a cancellation qualifies for a refund, GearUp sends it back to the original payment method after the cancellation is approved. Processing times vary by payment provider, but you will receive an update when the refund is initiated.',
  },
  {
    question: 'What happens if gear is damaged?',
    answer:
      'Report the issue to the provider and GearUp support as soon as possible, ideally with photos. We review the condition, rental agreement, and available evidence with both parties before determining responsibility and any applicable charge.',
  },
];

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-6xl py-4">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <CircleHelp className="size-7" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Need to know
          </p>
          <h2 id="faq-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Quick answers to help you book with confidence, understand your rental, and enjoy a
            smoother GearUp experience.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white shadow-xl shadow-primary/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">Still need help?</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Our support team is ready to help with your booking.
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                <MessageCircleQuestion className="size-5" />
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center text-sm font-semibold text-blue-300 transition-colors hover:text-white"
            >
              Contact support
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-600" />
            Secure booking support from GearUp
          </div>
        </div>

        <Accordion type="single" collapsible className="gap-3 overflow-visible border-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`faq-${index + 1}`}
              key={faq.question}
              className="rounded-2xl border bg-card px-5 shadow-sm transition-all data-open:border-primary/30 data-open:shadow-md sm:px-6"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold hover:no-underline sm:py-6 sm:text-lg">
                <span className="flex min-w-0 items-center gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground transition-colors group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 pl-12 text-sm leading-7 text-muted-foreground sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
