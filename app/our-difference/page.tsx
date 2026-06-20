import type { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getDifferencePage, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDifferencePage();
  return {
    title: page?.seo?.metaTitle || 'Our Difference',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function OurDifferencePage() {
  const [page, global] = await Promise.all([getDifferencePage(), getGlobal()]);

  return (
    <>
      <HeroBanner
        image={page?.heroImage}
        heading={page?.heroHeading || 'Our Difference'}
        subheading={page?.introText || undefined}
      />

      {/* Service Principles */}
      {!!page?.servicePrinciples?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Why Choose Us" title="Our Service Principles" center />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.servicePrinciples.map((sp, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-8 flex flex-col gap-4">
                  {sp.icon && (
                    <div className="w-12 h-12 relative">
                      <Image
                        src={getStrapiMediaUrl(sp.icon.url)}
                        alt={sp.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-(--primary)">{sp.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{sp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Manufacturing Cycle */}
      {!!page?.cycleSteps?.length && (
        <section className="section bg-(--primary)">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="How It Works" title="Our Manufacturing Cycle" light center />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.cycleSteps.map((step, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-(--accent) text-(--primary) font-extrabold text-sm flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-widest text-(--accent)">{step.duration}</p>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  {step.note && <p className="text-gray-400 text-sm">{step.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
