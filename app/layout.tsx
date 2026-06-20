import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getGlobal, getAllProductCategories } from '@/lib/strapi';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: { default: '[Brand]', template: '%s | [Brand]' },
  description: 'Premium B2B manufacturing.',
};

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
