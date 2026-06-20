'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { Global, ProductCategory } from '@/lib/types';

interface HeaderProps {
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

const GROUP_LABELS: Record<string, string> = {
  'ring-and-cage': 'Ring & Cage',
  'martial-arts': 'Martial Arts',
  'apparel-and-gear': 'Apparel & Gear',
};

export default function Header({ global, categories }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);

  const grouped = categories.reduce<Record<string, ProductCategory[]>>((acc, cat) => {
    (acc[cat.group] = acc[cat.group] || []).push(cat);
    return acc;
  }, {});

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (productRef.current && !productRef.current.contains(e.target as Node)) {
        setProductMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const logoUrl = global?.logoDark
    ? getStrapiMediaUrl(global.logoDark.url)
    : null;
  console.log('Global data in Header:', global); // Debugging log
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 lg:px-16 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {logoUrl ? (
            <Image src={logoUrl} alt={global?.siteName || 'Brand'} width={160} height={48} className="h-10 w-auto object-contain" />
          ) : (
            <span className="text-2xl font-extrabold text-(--primary)">
              {global?.siteName || '[Brand]'}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          {/* Company dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-(--accent) transition-colors"
              onMouseEnter={() => setCompanyMenuOpen(true)}
              onMouseLeave={() => setCompanyMenuOpen(false)}
              onClick={() => setCompanyMenuOpen(v => !v)}
            >
              Company
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {companyMenuOpen && (
              <div
                className="absolute top-full left-0 pt-2 z-50"
                onMouseEnter={() => setCompanyMenuOpen(true)}
                onMouseLeave={() => setCompanyMenuOpen(false)}
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 w-56">
                  {COMPANY_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 hover:bg-gray-50 hover:text-(--accent) transition-colors"
                      onClick={() => setCompanyMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products mega-menu */}
          <div className="relative" ref={productRef}>
            <button
              className="flex items-center gap-1 hover:text-(--accent) transition-colors"
              onClick={() => setProductMenuOpen(v => !v)}
            >
              Our Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[700px]">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(grouped).map(([group, cats]) => (
                      <div key={group}>
                        <p className="text-xs font-bold uppercase tracking-widest text-(--accent) mb-3">
                          {GROUP_LABELS[group] || group}
                        </p>
                        <ul className="space-y-1">
                          {cats.map(cat => (
                            <li key={cat.slug}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block text-sm text-gray-700 hover:text-(--accent) py-1 transition-colors"
                                onClick={() => setProductMenuOpen(false)}
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/products"
                      className="text-sm font-semibold text-(--accent) hover:underline"
                      onClick={() => setProductMenuOpen(false)}
                    >
                      View all products →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {global?.phoneNumber && (
            <a href={`tel:${global.phoneNumber}`} className="hover:text-(--accent) transition-colors">
              {global.phoneNumber}
            </a>
          )}
        </nav>

        {/* CTA */}
        {global?.headerCta && (
          <Link
            href={global.headerCta.url}
            className="hidden lg:inline-flex items-center gap-2 bg-(--accent) text-(--primary) font-bold px-6 py-2.5 rounded hover:bg-(--accent-light) transition-colors text-sm shrink-0"
          >
            {global.headerCta.label}
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 text-sm font-medium text-gray-700">
          {COMPANY_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="block py-2 hover:text-(--accent)" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-200" />
          <p className="text-xs font-bold uppercase tracking-widest text-(--accent) pt-1">Products</p>
          {categories.map(cat => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="block py-1.5 pl-3 hover:text-(--accent)" onClick={() => setMobileOpen(false)}>
              {cat.name}
            </Link>
          ))}
          {global?.headerCta && (
            <Link href={global.headerCta.url} className="block mt-3 text-center bg-(--accent) text-(--primary) font-bold px-6 py-2.5 rounded" onClick={() => setMobileOpen(false)}>
              {global.headerCta.label}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
