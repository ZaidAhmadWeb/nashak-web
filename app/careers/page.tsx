import type { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getCareersPage, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCareersPage();
  return {
    title: page?.seo?.metaTitle || 'Careers',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function CareersPage() {
  const [page, global] = await Promise.all([getCareersPage(), getGlobal()]);

  return (
    <>
      <HeroBanner
        image={page?.heroImage}
        heading={page?.heroHeading || 'Join Our Team'}
        subheading={page?.introText || undefined}
      />

      {/* Apply CTA */}
      {page?.applyEmail && (
        <section className="bg-(--accent) py-10">
          <div className="container mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold text-(--primary)">Ready to apply? Send your CV directly to our team.</p>
            <a
              href={`mailto:${page.applyEmail}`}
              className="inline-flex items-center gap-2 bg-(--primary) text-white font-bold px-8 py-3 rounded hover:bg-[#1a3a5c] transition-colors shrink-0"
            >
              Apply Now
            </a>
          </div>
        </section>
      )}

      {/* Job Categories */}
      {!!page?.jobCategories?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Open Positions" title="Where Could You Fit In?" center />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.jobCategories.map((cat, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6 hover:border-(--accent) hover:shadow-md transition-all">
                  <h3 className="text-lg font-bold text-(--primary) mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{cat.description}</p>
                  {page.applyEmail && (
                    <a
                      href={`mailto:${page.applyEmail}?subject=Application: ${encodeURIComponent(cat.title)}`}
                      className="mt-4 inline-flex text-sm font-semibold text-(--accent) hover:underline"
                    >
                      Apply for this role →
                    </a>
                  )}
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
