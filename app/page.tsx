import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/sections/HeroSlider';
import ProcessSteps from '@/components/sections/ProcessSteps';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import StatBar from '@/components/ui/StatBar';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCardGrid from '@/components/ui/IconCard';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getHomePage, getGlobal, getAllProductCategories, getTestimonials } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  const seo = page?.seo;
  return {
    title: seo?.metaTitle || undefined,
    description: seo?.metaDescription || undefined,
    openGraph: seo?.ogImage ? { images: [{ url: getStrapiMediaUrl(seo.ogImage.url) }] } : undefined,
  };
}

export default async function HomePage() {
  const [page, global, allCategories, testimonials] = await Promise.all([
    getHomePage(),
    getGlobal(),
    getAllProductCategories(),
    getTestimonials(true),
  ]);

  const featuredCategories = page?.featuredCategories?.data?.length
    ? page.featuredCategories.data
    : allCategories.slice(0, 4);

  const featuredProducts = page?.featuredProducts?.data ?? [];

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={page?.heroSlides} />

      {/* 3-Step Process */}
      {!!page?.processSteps?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading title="Our Process" center />
            <div className="mt-12">
              <ProcessSteps steps={page.processSteps} />
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories */}
      {!!featuredCategories.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Our Specialties" title="What We Manufacture" center />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group relative overflow-hidden rounded-lg aspect-square bg-(--primary)"
                >
                  {cat.cardImage && (
                    <Image
                      src={getStrapiMediaUrl(cat.cardImage.url)}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-(--primary)/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white font-bold text-lg">{cat.name}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border-2 border-(--primary) text-(--primary) font-semibold px-8 py-3 rounded hover:bg-(--primary) hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {!!featuredProducts.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Featured" title="Featured Products" center />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <div
                  key={product.slug}
                  className="rounded-xl overflow-hidden bg-white shadow"
                >
                  <div className="relative aspect-[4/3] bg-(--primary)">
                    {product.cardImage && (
                      <Image
                        src={getStrapiMediaUrl(product.cardImage.url)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-(--primary)">{product.name}</h3>
                    {typeof product.modelsAvailable === 'number' && (
                      <p className="text-sm text-gray-500 mt-1">{product.modelsAvailable} models available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <StatBar stats={page?.stats} />

      {/* Quote Block */}
      {page?.quoteText && (
        <section className="section bg-(--primary)">
          <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
            <svg className="w-10 h-10 text-(--accent) mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
              {page.quoteText}
            </p>
            {page.quoteAuthorName && (
              <div className="mt-8 flex items-center justify-center gap-4">
                {page.quoteAuthorSignature && (
                  <Image
                    src={getStrapiMediaUrl(page.quoteAuthorSignature.url)}
                    alt={page.quoteAuthorName}
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                )}
                <p className="text-(--accent) font-semibold">{page.quoteAuthorName}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Legacy */}
      {page?.legacyHeading && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Our Legacy" title={page.legacyHeading} description={page.legacyDescription || undefined} />
            </div>
            {page.legacyImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src={getStrapiMediaUrl(page.legacyImage.url)}
                  alt={page.legacyImage.alternativeText || page.legacyHeading}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Capabilities */}
      {!!page?.capabilities?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Why Us" title="Our Capabilities" center />
            <div className="mt-12">
              <IconCardGrid cards={page.capabilities} />
            </div>
          </div>
        </section>
      )}

      {/* Certification Logos */}
      {!!page?.certificationLogos?.length && (
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
              Certifications & Accreditations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {page.certificationLogos.map((item, i) => item.logo && (
                <Image
                  key={i}
                  src={getStrapiMediaUrl(item.logo.url)}
                  alt={item.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sustainability & Difference teasers */}
      {(page?.sustainabilityTeaserHeading || page?.differenceTeaserHeading) && (
        <section className="section bg-(--primary)">
          <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {page?.sustainabilityTeaserHeading && (
              <div className="bg-white/5 rounded-xl p-8">
                <SectionHeading
                  eyebrow="Sustainability"
                  title={page.sustainabilityTeaserHeading}
                  description={page.sustainabilityTeaserDescription || undefined}
                  light
                />
                {page.sustainabilityTeaserLink && (
                  <Link href={page.sustainabilityTeaserLink} className="mt-6 inline-flex items-center gap-2 text-(--accent) font-semibold hover:underline">
                    Learn more →
                  </Link>
                )}
              </div>
            )}
            {page?.differenceTeaserHeading && (
              <div className="bg-white/5 rounded-xl p-8">
                <SectionHeading
                  eyebrow="Our Difference"
                  title={page.differenceTeaserHeading}
                  description={page.differenceTeaserDescription || undefined}
                  light
                />
                {page.differenceTeaserLink && (
                  <Link href={page.differenceTeaserLink} className="mt-6 inline-flex items-center gap-2 text-(--accent) font-semibold hover:underline">
                    Learn more →
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && <TestimonialCarousel testimonials={testimonials} />}

      {/* Client Logos */}
      {!!page?.clientLogos?.length && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
              Trusted By Leading Brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {page.clientLogos.map((item, i) => item.logo && (
                <Image
                  key={i}
                  src={getStrapiMediaUrl(item.logo.url)}
                  alt={item.name}
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
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
