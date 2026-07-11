import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import {
  getStrapiMediaUrl,
  getAllProducts,
  getProductBySlug,
  getGlobal,
} from '@/lib/strapi';

interface Props {
  params: Promise<{ category: string; subcategory: string; product: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products
    .filter(product => product.subCategory?.slug && product.subCategory.category?.slug)
    .map(product => ({
      category: product.subCategory!.category!.slug,
      subcategory: product.subCategory!.slug,
      product: product.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const prod = await getProductBySlug(category, subcategory, product);
  if (!prod) return { title: 'Not Found' };
  return {
    title: prod.seo?.metaTitle || prod.name,
    description: prod.seo?.metaDescription || prod.shortDescription || undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, subcategory, product } = await params;
  const [prod, global] = await Promise.all([
    getProductBySlug(category, subcategory, product),
    getGlobal(),
  ]);

  if (!prod) notFound();

  return (
    <>
      <HeroBanner
        image={prod.cardImage}
        heading={prod.name}
        subheading={prod.shortDescription || undefined}
      />

      {/* Description */}
      {prod.description && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
            <div
              className="prose-cms"
              dangerouslySetInnerHTML={{ __html: prod.description }}
            />
          </div>
        </section>
      )}

      {/* Gallery */}
      {!!prod.gallery?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Gallery" title="Product Gallery" />
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {prod.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={getStrapiMediaUrl(img.url)}
                    alt={img.alternativeText || prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materials */}
      {!!prod.materials?.length && (
        <section className="section bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Materials" title="Available Materials" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prod.materials.map((mat, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    {mat.image && (
                      <Image src={getStrapiMediaUrl(mat.image.url)} alt={mat.name} fill className="object-cover" />
                    )}
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
      {!!prod.colors?.length && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Colors" title="Available Colors" />
            <div className="mt-8 flex flex-wrap gap-4">
              {prod.colors.map((swatch, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow">
                    {swatch.image && (
                      <Image src={getStrapiMediaUrl(swatch.image.url)} alt={swatch.name} fill className="object-cover" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{swatch.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Size Options */}
      {!!prod.sizeOptions?.length && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <SectionHeading eyebrow="Specifications" title="Available Options" />
            <div className="mt-6 flex flex-wrap gap-3">
              {prod.sizeOptions.map((opt, i) => (
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
