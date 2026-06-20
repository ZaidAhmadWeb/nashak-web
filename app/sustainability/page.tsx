import type { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCardGrid from '@/components/ui/IconCard';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getSustainabilityPage, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSustainabilityPage();
  return {
    title: page?.seo?.metaTitle || 'Sustainability',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function SustainabilityPage() {
  const [page, global] = await Promise.all([getSustainabilityPage(), getGlobal()]);

  return (
    <>
      <HeroBanner
        image={page?.heroImage}
        heading={page?.heroHeading || 'Sustainability'}
        subheading={page?.introText || undefined}
      />

      {/* Environment */}
      {!!page?.environmentCards?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading
              eyebrow="Environment"
              title={page.environmentHeading || 'Environmental Commitment'}
              description={page.environmentDescription || undefined}
            />
            <div className="mt-12">
              <IconCardGrid cards={page.environmentCards} />
            </div>
          </div>
        </section>
      )}

      {/* Corporate / People */}
      {!!page?.corporateCards?.length && (
        <section className="section bg-(--primary)">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading
              eyebrow="Corporate Responsibility"
              title={page.corporateHeading || 'People &amp; Community'}
              description={page.corporateDescription || undefined}
              light
            />
            <div className="mt-12">
              <IconCardGrid cards={page.corporateCards} light />
            </div>
          </div>
        </section>
      )}

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
