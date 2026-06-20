import { type NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
