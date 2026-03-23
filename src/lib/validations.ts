import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters').max(200, 'Subject must be at most 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be at most 5000 characters'),
  // Honeypot field — must be empty on legitimate submissions
  website: z.string().optional(),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
