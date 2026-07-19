import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import SocialLinks from '@/components/ui/SocialLinks';
import type { Global, ProductCategory } from '@/lib/types';

interface FooterProps {
  global: Global | null;
  categories: ProductCategory[];
}

const COMPANY_LINKS = [
  { label: 'Company', href: '/company' },
  { label: 'Our Difference', href: '/our-difference' },
  { label: 'Partnerships', href: '/partners' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Careers', href: '/careers' },
  { label: 'Gallery', href: '/gallery' },
];

export default function Footer({ global, categories }: FooterProps) {
  const logoUrl = global?.logoLight ? getStrapiMediaUrl(global.logoLight.url) : null;

  return (
    <footer className="bg-(--primary) text-gray-300">
      <div className="container mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          {logoUrl ? (
            <Image src={logoUrl} alt={global?.siteName || 'Brand'} width={160} height={48} className="h-10 w-auto object-contain mb-4" />
          ) : (
            <p className="text-2xl font-extrabold text-white mb-4">{global?.siteName || '[Brand]'}</p>
          )}
          {global?.officeAddress && (
            <p className="text-sm leading-relaxed mt-2">{global.officeAddress}</p>
          )}
          {global?.phoneNumber && (
            <a href={`tel:${global.phoneNumber}`} className="block mt-2 text-sm hover:text-(--accent)">
              {global.phoneNumber}
            </a>
          )}
          {global?.email && (
            <a href={`mailto:${global.email}`} className="block text-sm hover:text-(--accent)">
              {global.email}
            </a>
          )}
          <SocialLinks links={global?.socialLinks} className="flex gap-4 mt-5" />
        </div>

        {/* Company links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-(--accent) mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            {COMPANY_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-(--accent) mb-4">Products</p>
          <ul className="space-y-2 text-sm">
            {categories.map(cat => (
              <li key={cat.slug}>
                <Link href={`/${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="hover:text-white transition-colors font-medium">View All →</Link>
            </li>
          </ul>
        </div>

        {/* Legal / extra */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-(--accent) mb-4">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {global?.siteName || '[Brand]'}. All rights reserved.</p>
          <p>Headless CMS powered by Strapi · Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
