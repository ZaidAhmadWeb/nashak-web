'use client';

import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  successMessage: string;
  errorMessage: string;
}

export default function ContactForm({ successMessage, errorMessage }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-(--primary)">{successMessage}</p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-transparent transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input id="fullName" name="fullName" type="text" required className={inputClass} placeholder="Jane Smith" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
          Phone Number
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+1 (555) 000-0000" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us about your project, quantities, and timelines..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-(--accent) text-(--primary) font-bold py-3 px-8 rounded-lg hover:bg-[#e6c04d] transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
