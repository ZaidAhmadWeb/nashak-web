import type { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCardGrid from '@/components/ui/IconCard';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getCompanyPage, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage();
  return {
    title: page?.seo?.metaTitle || 'Company',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function CompanyPage() {
  const [page, global] = await Promise.all([getCompanyPage(), getGlobal()]);

  return (
    <>
      <HeroBanner
        image={page?.heroImage}
        heading={page?.heroHeading || 'About Our Company'}
        subheading={page?.introText || undefined}
      />

      {/* Capabilities Grid */}
      {!!page?.capabilities?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="What We Do" title="Manufacturing Capabilities" center />
            <div className="mt-12">
              <IconCardGrid cards={page.capabilities} />
            </div>
          </div>
        </section>
      )}

      {/* History + Timeline */}
      {!!page?.timeline?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <SectionHeading
                eyebrow="Our Story"
                title={page.historyHeading || 'Company History'}
                description={page.historyDescription || undefined}
              />
              <div className="mt-12 relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
                <ul className="space-y-10">
                  {page.timeline.map((entry, i) => (
                    <li key={i} className="relative pl-14">
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-(--primary) flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-white leading-none text-center">{entry.year}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{entry.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
