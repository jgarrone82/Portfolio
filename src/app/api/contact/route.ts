import { type NextRequest, NextResponse } from 'next/server';
import { resend } from '@/src/lib/resend';
import { contactSchema } from '@/src/lib/validations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Guard: missing API key
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact/route] RESEND_API_KEY is not configured');
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 },
    );
  }

  // Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    );
  }

  // Honeypot check — if the hidden "website" field is non-empty a bot filled it in.
  // Return 200 silently so the bot learns nothing about the filter.
  const rawBody = body as Record<string, unknown>;
  if (rawBody?.website && rawBody.website !== '') {
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 },
    );
  }

  // Zod v4 validation
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: result.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = result.data;

  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    console.error('[contact/route] CONTACT_TO_EMAIL is not configured');
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 },
    );
  }

  // Send email via Resend — SDK returns { data, error }, does NOT throw
  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: [toEmail],
    replyTo: email,
    subject: `[Portfolio] ${subject} - from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3B82F6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <p style="font-weight: bold; margin-bottom: 8px;">Message:</p>
          <div style="background: #f5f5f5; border-left: 4px solid #3B82F6; padding: 16px; border-radius: 4px; white-space: pre-wrap;">
            ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          Sent from the contact form at jorgegarrone.com
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[contact/route] Resend error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, message: 'Message sent successfully' },
    { status: 200 },
  );
}

// Return 405 for all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
