import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? '';
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendNotificationEmail(data: { fullName: string; email: string; phone?: string; message: string }) {
  if (!resend || !CONTACT_EMAIL_TO) return;

  try {
    await resend.emails.send({
      from: `Website Contact Form <${CONTACT_EMAIL_FROM}>`,
      to: CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `New contact form submission from ${data.fullName}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch (err) {
    console.error('Resend email error:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;

    const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: { fullName, email, phone, message } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Strapi contact submission error:', err);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    // Best-effort: the submission is already durably saved in Strapi above,
    // so an email failure shouldn't fail the request the visitor sees.
    await sendNotificationEmail({ fullName, email, phone, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
