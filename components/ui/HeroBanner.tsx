import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiMedia } from '@/lib/types';

interface HeroBannerProps {
  image?: StrapiMedia | null;
  heading: string;
  subheading?: string;
  overlay?: boolean;
}

export default function HeroBanner({ image, heading, subheading, overlay = true }: HeroBannerProps) {
  return (
    <section className="relative h-[420px] md:h-[540px] flex items-center">
      {image ? (
        <Image
          src={getStrapiMediaUrl(image.url)}
          alt={image.alternativeText || heading}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-(--primary)" />
      )}
      {overlay && <div className="absolute inset-0 bg-(--primary)/60" />}
      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">{subheading}</p>
        )}
      </div>
    </section>
  );
}
