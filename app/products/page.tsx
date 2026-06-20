import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCardGrid from '@/components/ui/IconCard';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getProductsPage, getAllProductCategories, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProductsPage();
  return {
    title: page?.seo?.metaTitle || 'Products',
    description: page?.seo?.metaDescription || undefined,
  };
}

const GROUP_LABELS: Record<string, string> = {
  'ring-and-cage': 'Ring & Cage',
  'martial-arts': 'Martial Arts',
  'apparel-and-gear': 'Apparel & Gear',
};

export default async function ProductsPage() {
  const [page, categories, global] = await Promise.all([
    getProductsPage(),
    getAllProductCategories(),
    getGlobal(),
  ]);

  const grouped = categories.reduce<Record<string, typeof categories>>((acc, cat) => {
    (acc[cat.group] = acc[cat.group] || []).push(cat);
    return acc;
  }, {});

  return (
    <>
      <HeroBanner heading={page?.heroHeading || 'Our Products'} />

      {/* Intro */}
      {(page?.introHeading || page?.introDescription) && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
            <SectionHeading title={page.introHeading || ''} description={page.introDescription || undefined} />
          </div>
        </section>
      )}

      {/* Categories grouped */}
      {Object.entries(GROUP_LABELS).map(([group, label]) => {
        const cats = grouped[group];
        if (!cats?.length) return null;
        return (
          <section key={group} className="section bg-gray-50">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeading eyebrow="Category" title={label} />
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cats.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[4/3] bg-(--primary)">
                      {cat.cardImage && (
                        <Image
                          src={getStrapiMediaUrl(cat.cardImage.url)}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-(--primary)">{cat.name}</h3>
                      {cat.subtypes?.length ? (
                        <p className="text-sm text-gray-500 mt-1">{cat.subtypes.length} styles available</p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Supplementary Services */}
      {!!page?.supplementaryServices?.length && (
        <section className="section bg-(--primary)">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Also Available" title="Additional Services" light center />
            <div className="mt-12">
              <IconCardGrid cards={page.supplementaryServices} light />
            </div>
          </div>
        </section>
      )}

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
