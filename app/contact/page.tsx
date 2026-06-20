import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import HeroBanner from '@/components/ui/HeroBanner';
import BrochureCta from '@/components/ui/BrochureCta';
import { getContactPage, getGlobal } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {
    title: page?.seo?.metaTitle || 'Contact',
    description: page?.seo?.metaDescription || undefined,
  };
}

export default async function ContactPage() {
  const [page, global] = await Promise.all([getContactPage(), getGlobal()]);

  return (
    <>
      <HeroBanner heading={page?.heroHeading || 'Get In Touch'} />

      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-(--primary) mb-6">Contact Information</h2>
            <div className="space-y-5 text-gray-700">
              {global?.phoneNumber && (
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${global.phoneNumber}`} className="hover:text-(--accent)">{global.phoneNumber}</a>
                </div>
              )}
              {global?.email && (
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${global.email}`} className="hover:text-(--accent)">{global.email}</a>
                </div>
              )}
              {global?.officeAddress && (
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="whitespace-pre-line">{global.officeAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <ContactForm
            successMessage={page?.formSuccessMessage || 'Thank you! We\'ll be in touch within 48 hours.'}
            errorMessage={page?.formErrorMessage || 'Something went wrong. Please try again or email us directly.'}
          />
        </div>
      </section>

      <BrochureCta brochureFile={global?.brochureFile} />
    </>
  );
}
