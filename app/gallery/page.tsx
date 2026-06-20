import type { Metadata } from 'next';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import BrochureCta from '@/components/ui/BrochureCta';
import ContactBanner from '@/components/ui/ContactBanner';
import { getStrapiMediaUrl, getGalleryPage, getGalleryImages, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGalleryPage();
  return {
    title: page?.seo?.metaTitle || 'Gallery',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function GalleryPage() {
  const [page, images, global] = await Promise.all([
    getGalleryPage(),
    getGalleryImages(),
    getGlobal(),
  ]);

  return (
    <>
      <HeroBanner heading={page?.heroHeading || 'Our Gallery'} />

      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          {images.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No images yet — add them in the CMS portal.</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map(img => (
                <div key={img.id} className="break-inside-avoid overflow-hidden rounded-lg group relative">
                  <Image
                    src={getStrapiMediaUrl(img.image.url)}
                    alt={img.caption || img.image.alternativeText || 'Gallery image'}
                    width={img.image.width || 800}
                    height={img.image.height || 600}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-3">
                      <p className="text-white text-sm">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BrochureCta brochureFile={global?.brochureFile} />
      <ContactBanner />
    </>
  );
}
