import type { StrapiMedia } from '@/lib/types';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface BrochureCtaProps {
  brochureFile?: StrapiMedia | null;
}

export default function BrochureCta({ brochureFile }: BrochureCtaProps) {
  if (!brochureFile) return null;
  return (
    <section className="bg-(--primary) py-16">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Download Our Brochure</h3>
          <p className="text-gray-300 mt-1">Get the full catalog delivered as a PDF.</p>
        </div>
        <a
          href={getStrapiMediaUrl(brochureFile.url)}
          download
          className="inline-flex items-center gap-2 bg-(--accent) text-(--primary) font-semibold px-8 py-3 rounded hover:bg-(--accent-light) transition-colors shrink-0"
        >
          Download PDF
        </a>
      </div>
    </section>
  );
}
