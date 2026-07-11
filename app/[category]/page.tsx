import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import StatBar from '@/components/ui/StatBar';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import {
  getStrapiMediaUrl,
  getAllProductCategories,
  getProductCategoryBySlug,
  getSubCategoriesByCategory,
  getGlobal,
} from '@/lib/strapi';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllProductCategories();
  return categories.map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getProductCategoryBySlug(category);
  if (!cat) return { title: 'Not Found' };
  return {
    title: cat.seo?.metaTitle || cat.name,
    description: cat.seo?.metaDescription || undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [cat, subCategories, global] = await Promise.all([
    getProductCategoryBySlug(category),
    getSubCategoriesByCategory(category),
    getGlobal(),
  ]);

  if (!cat) notFound();

  return (
    <>
      <HeroBanner
        image={cat.heroImage}
        heading={cat.name}
        subheading={cat.introHeading || undefined}
      />

      {/* Stats */}
      <StatBar stats={cat.stats} />

      {/* Intro */}
      {cat.introDescription && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
            <div
              className="prose-cms"
              dangerouslySetInnerHTML={{ __html: cat.introDescription }}
            />
          </div>
        </section>
      )}

      {/* Sub-categories grid */}
      {!!subCategories.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Browse" title={`${cat.name} Sub-Categories`} />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subCategories.map(sub => (
                <Link
                  key={sub.slug}
                  href={`/${category}/${sub.slug}`}
                  className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-(--primary)">
                    {sub.cardImage && (
                      <Image
                        src={getStrapiMediaUrl(sub.cardImage.url)}
                        alt={sub.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-(--primary)">{sub.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subtypes grid */}
      {!!cat.subtypes?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Product Range" title={`${cat.name} Styles`} />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.subtypes.map((sub, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square bg-(--primary)">
                    <Image
                      src={getStrapiMediaUrl(sub.image.url)}
                      alt={sub.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-(--primary)">{sub.name}</h3>
                    {sub.modelsAvailable && (
                      <p className="text-sm text-gray-500 mt-1">{sub.modelsAvailable} models</p>
                    )}
                    {sub.link && (
                      <a href={sub.link} className="mt-2 inline-flex text-sm font-semibold text-(--accent) hover:underline">
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materials */}
      {!!cat.materials?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Materials" title="Available Materials" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.materials.map((mat, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image src={getStrapiMediaUrl(mat.image.url)} alt={mat.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-(--primary)">{mat.name}</h3>
                    {mat.description && <p className="text-sm text-gray-600 mt-1">{mat.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Colors */}
      {!!cat.readyToGoColors?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Colors" title="Ready-to-Go Colors" />
            {cat.specialColorsNote && (
              <p className="mt-2 text-sm text-gray-500">{cat.specialColorsNote}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {cat.readyToGoColors.map((swatch, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow">
                    <Image src={getStrapiMediaUrl(swatch.image.url)} alt={swatch.name} fill className="object-cover" />
                  </div>
                  <p className="text-xs text-gray-600">{swatch.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weight / Size Options */}
      {!!cat.weightOrSizeOptions?.length && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Specifications" title="Available Options" />
            <div className="mt-6 flex flex-wrap gap-3">
              {cat.weightOrSizeOptions.map((opt, i) => (
                <span key={i} className="px-4 py-2 rounded-full border-2 border-(--primary) text-(--primary) text-sm font-semibold">
                  {opt.label}
                </span>
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
