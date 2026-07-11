import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import {
  getStrapiMediaUrl,
  getAllSubCategories,
  getSubCategoryBySlug,
  getProductsBySubCategory,
  getGlobal,
} from '@/lib/strapi';

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateStaticParams() {
  const subCategories = await getAllSubCategories();
  return subCategories
    .filter(sub => sub.category?.slug)
    .map(sub => ({ category: sub.category!.slug, subcategory: sub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const sub = await getSubCategoryBySlug(category, subcategory);
  if (!sub) return { title: 'Not Found' };
  return {
    title: sub.seo?.metaTitle || sub.name,
    description: sub.seo?.metaDescription || undefined,
  };
}

export default async function SubCategoryPage({ params }: Props) {
  const { category, subcategory } = await params;
  const [sub, products, global] = await Promise.all([
    getSubCategoryBySlug(category, subcategory),
    getProductsBySubCategory(category, subcategory),
    getGlobal(),
  ]);

  if (!sub) notFound();

  return (
    <>
      <HeroBanner
        image={sub.heroImage}
        heading={sub.name}
        subheading={sub.introHeading || undefined}
      />

      {/* Intro */}
      {sub.introDescription && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
            <div
              className="prose-cms"
              dangerouslySetInnerHTML={{ __html: sub.introDescription }}
            />
          </div>
        </section>
      )}

      {/* Products grid */}
      {!!products.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Products" title={`${sub.name} Products`} />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <Link
                  key={product.slug}
                  href={`/${category}/${subcategory}/${product.slug}`}
                  className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-(--primary)">
                    {product.cardImage && (
                      <Image
                        src={getStrapiMediaUrl(product.cardImage.url)}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-(--primary)">{product.name}</h3>
                    {product.shortDescription && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                    )}
                  </div>
                </Link>
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
