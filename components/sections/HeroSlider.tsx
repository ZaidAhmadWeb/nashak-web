"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { HeroSlide } from "@/lib/types";

export default function HeroSlider({ slides }: { slides?: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (!slides?.length) return;
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  if (!slides?.length) {
    return (
      <div className="relative h-[380px] sm:h-[480px] md:h-[680px] bg-(--primary) flex items-center">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Premium B2B Manufacturing
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-xl">
            World-class sports equipment crafted for brands that demand the
            best.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-(--accent) text-(--primary) font-bold px-8 py-4 rounded hover:bg-(--accent-light) transition-colors text-lg"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[380px] sm:h-[480px] md:h-[680px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Image
            src={getStrapiMediaUrl(slide.image?.url)}
            alt={slide.image?.alternativeText || slide.heading}
            fill
            className="w-full h-full object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-(--primary)/60" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-16">
              {slide.eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-widest text-(--accent) mb-3">
                  {slide.eyebrow}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
                {slide.heading}
              </h1>
              {slide.description && (
                <p className="mt-4 text-lg text-gray-200 max-w-xl">
                  {slide.description}
                </p>
              )}
              {slide.ctaLabel && slide.ctaLink && (
                <Link
                  href={slide.ctaLink}
                  className="mt-8 inline-flex items-center gap-2 bg-(--accent) text-(--primary) font-bold px-8 py-4 rounded hover:bg-(--accent-light) transition-colors text-lg"
                >
                  {slide.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-(--accent)" : "bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((c) => (c - 1 + slides.length) % slides.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
