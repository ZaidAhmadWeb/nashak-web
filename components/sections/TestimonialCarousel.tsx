'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { Testimonial } from '@/lib/types';

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="bg-gray-50 section">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-(--accent) mb-8">
          What Our Clients Say
        </p>
        <blockquote className="text-2xl md:text-3xl font-medium text-(--primary) leading-snug italic">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          {t.clientLogo && (
            <Image
              src={getStrapiMediaUrl(t.clientLogo.url)}
              alt={t.clientName}
              width={80}
              height={40}
              className="h-10 w-auto object-contain opacity-70"
            />
          )}
          <p className="font-semibold text-gray-700">{t.clientName}</p>
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-(--accent)' : 'bg-gray-300'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
