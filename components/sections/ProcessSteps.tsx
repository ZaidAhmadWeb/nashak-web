'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { ProcessStep } from '@/lib/types';

function StepContent({ step }: { step: ProcessStep }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-(--primary) text-white flex items-center justify-center text-2xl font-extrabold mb-4">
        {step.stepNumber}
      </div>
      {step.icon && (
        <Image
          src={getStrapiMediaUrl(step.icon.url)}
          alt={step.title}
          width={48}
          height={48}
          className="mb-3 object-contain"
        />
      )}
      <h3 className="text-lg font-bold text-(--primary)">{step.title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}

export default function ProcessSteps({ steps }: { steps?: ProcessStep[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (!steps?.length) return;
    setCurrent(c => (c + 1) % steps.length);
  }, [steps]);

  const prev = useCallback(() => {
    if (!steps?.length) return;
    setCurrent(c => (c - 1 + steps.length) % steps.length);
  }, [steps]);

  useEffect(() => {
    if (!steps || steps.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, steps]);

  if (!steps?.length) return null;

  return (
    <>
      {/* Mobile: auto-advancing slider, one step at a time */}
      <div className="md:hidden">
        <StepContent step={steps[current]} />
        {steps.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 shrink-0 rounded-full border-2 border-(--primary) text-(--primary) flex items-center justify-center hover:bg-(--primary) hover:text-white transition-colors"
              aria-label="Previous step"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-(--accent)' : 'bg-gray-300'}`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 shrink-0 rounded-full border-2 border-(--primary) text-(--primary) flex items-center justify-center hover:bg-(--primary) hover:text-white transition-colors"
              aria-label="Next step"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Desktop: static grid, all steps visible */}
      <div className="hidden md:grid md:grid-cols-3 gap-10">
        {steps.map(step => (
          <StepContent key={step.stepNumber} step={step} />
        ))}
      </div>
    </>
  );
}
