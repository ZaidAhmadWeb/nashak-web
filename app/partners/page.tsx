import type { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getPartnersPage, getGlobal, getTestimonials } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPartnersPage();
  return {
    title: page?.seo?.metaTitle || 'Partnerships',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function PartnersPage() {
  const [page, global, testimonials] = await Promise.all([
    getPartnersPage(),
    getGlobal(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroBanner heading={page?.heroHeading || 'Our Partners'} subheading={page?.introText || undefined} />

      {/* Partner Logo Wall */}
      {!!page?.partnerLogos?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Global Reach" title="Our Partners &amp; Clients" center />
            <div className="mt-12 flex flex-wrap justify-center items-center gap-10">
              {page.partnerLogos.map((item, i) => (
                item.link ? (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={getStrapiMediaUrl(item.logo.url)}
                      alt={item.name}
                      width={150}
                      height={70}
                      className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </a>
                ) : (
                  <Image
                    key={i}
                    src={getStrapiMediaUrl(item.logo.url)}
                    alt={item.name}
                    width={150}
                    height={70}
                    className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && <TestimonialCarousel testimonials={testimonials} />}

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
