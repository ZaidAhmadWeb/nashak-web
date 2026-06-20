import type { Metadata } from 'next';
import { getLegalPage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('terms-and-conditions');
  return { title: page?.title || 'Terms & Conditions' };
}

export default async function TermsPage() {
  const page = await getLegalPage('terms-and-conditions');

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-(--primary) mb-3">{page?.title || 'Terms & Conditions'}</h1>
        {page?.lastUpdated && (
          <p className="text-sm text-gray-500 mb-10">
            Last updated: {new Date(page.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
        {page?.body ? (
          <div className="prose-cms" dangerouslySetInnerHTML={{ __html: page.body }} />
        ) : (
          <p className="text-gray-500">Terms and conditions content coming soon.</p>
        )}
      </div>
    </section>
  );
}
