import Link from 'next/link';

interface ContactBannerProps {
  heading?: string;
  sub?: string;
}

export default function ContactBanner({
  heading = 'Ready to get started?',
  sub = 'Tell us about your project and receive a quote within 48 hours.',
}: ContactBannerProps) {
  return (
    <section className="bg-(--accent) py-16">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-(--primary)">{heading}</h3>
          <p className="text-(--primary)/80 mt-1">{sub}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-(--primary) text-white font-semibold px-8 py-3 rounded hover:bg-(--primary-light) transition-colors shrink-0"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
