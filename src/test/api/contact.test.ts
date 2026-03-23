import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the resend lib module BEFORE importing the route handler
vi.mock('@/src/lib/resend', () => ({
  resend: {
    emails: {
      send: vi.fn(),
    },
  },
}));

import { POST } from '@/src/app/api/contact/route';
import { resend } from '@/src/lib/resend';

const mockResendSend = vi.mocked(resend.emails.send);

const validBody = {
  name: 'Jorge Garrone',
  email: 'jorge@example.com',
  subject: 'Test subject',
  message: 'This is a test message with enough characters.',
};

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  // Provide required env vars by default
  vi.stubEnv('RESEND_API_KEY', 'test-api-key');
  vi.stubEnv('CONTACT_TO_EMAIL', 'contact@example.com');
});

describe('POST /api/contact', () => {
  it('returns 200 silently when honeypot field (website) is filled', async () => {
    const req = makeRequest({ ...validBody, website: 'https://bot.example.com' });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    // Resend must NOT have been called
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('returns 400 with validation errors when data is invalid', async () => {
    const req = makeRequest({ name: 'A', email: 'bad-email', subject: '', message: 'short' });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBe('Validation failed');
    expect(json.details).toBeDefined();
  });

  it('returns 200 with success message when data is valid and Resend succeeds', async () => {
    mockResendSend.mockResolvedValueOnce({ data: { id: 'email-id-123' }, error: null } as any);

    const req = makeRequest(validBody);
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toBe('Message sent successfully');
    expect(mockResendSend).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when Resend returns an error', async () => {
    mockResendSend.mockResolvedValueOnce({
      data: null,
      error: { name: 'validation_error', message: 'API key is invalid', statusCode: 401 },
    } as any);

    const req = makeRequest(validBody);
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe('Failed to send message');
  });

  it('returns 500 when RESEND_API_KEY is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');

    const req = makeRequest(validBody);
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
  });
});
