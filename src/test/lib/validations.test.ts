import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/src/lib/validations';

const validData = {
  name: 'Jorge Garrone',
  email: 'jorge@example.com',
  subject: 'Hello there',
  message: 'This is a valid message with enough characters.',
};

describe('contactSchema', () => {
  it('passes validation with valid form data', () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = contactSchema.safeParse({ ...validData, name: '' });
    expect(result.success).toBe(false);
  });

  it('fails when name is shorter than 2 characters', () => {
    const result = contactSchema.safeParse({ ...validData, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('fails when email is invalid', () => {
    const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('fails when message is shorter than 10 characters', () => {
    const result = contactSchema.safeParse({ ...validData, message: 'Short' });
    expect(result.success).toBe(false);
  });

  it('fails when subject is empty', () => {
    const result = contactSchema.safeParse({ ...validData, subject: '' });
    expect(result.success).toBe(false);
  });

  it('honeypot field (website) is optional and passes when omitted', () => {
    const { website: _w, ...withoutHoneypot } = { ...validData, website: undefined };
    const result = contactSchema.safeParse(withoutHoneypot);
    expect(result.success).toBe(true);
  });

  it('honeypot field (website) is accepted when present and non-empty', () => {
    // The schema itself accepts the field — the route handler is responsible for the bot check
    const result = contactSchema.safeParse({ ...validData, website: 'https://bot.example.com' });
    expect(result.success).toBe(true);
  });

  it('includes a descriptive error message when name is too short', () => {
    const result = contactSchema.safeParse({ ...validData, name: 'A' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameErrors = result.error.flatten().fieldErrors.name;
      expect(nameErrors).toBeDefined();
      expect(nameErrors?.[0]).toMatch(/2/);
    }
  });
});
