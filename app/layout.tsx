import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getGlobal, getAllProductCategories, getStrapiMediaUrl } from '@/lib/strapi';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  const siteName = global?.siteName || 'Nashak Enterprises';
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description: global?.defaultSeo?.metaDescription || 'Premium B2B manufacturing.',
    icons: global?.favicon ? { icon: getStrapiMediaUrl(global.favicon.url) } : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [global, categories] = await Promise.all([
    getGlobal(),
    getAllProductCategories(),
  ]);

  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header global={global} categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer global={global} categories={categories} />
      </body>
    </html>
  );
}
