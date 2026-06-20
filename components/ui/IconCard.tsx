import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { IconTextCard } from '@/lib/types';

interface IconCardGridProps {
  cards?: IconTextCard[];
  light?: boolean;
}

export default function IconCardGrid({ cards, light = false }: IconCardGridProps) {
  if (!cards?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card, i) => (
        <div key={i} className="flex flex-col items-start gap-4">
          {card.icon && (
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src={getStrapiMediaUrl(card.icon.url)}
                alt={card.icon.alternativeText || card.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <h3 className={`font-semibold text-lg ${light ? 'text-white' : 'text-(--primary)'}`}>
              {card.title}
            </h3>
            <p className={`mt-1 text-sm leading-relaxed ${light ? 'text-gray-300' : 'text-gray-600'}`}>
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
