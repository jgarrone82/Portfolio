'use client';

import { SectionTitle } from '@/src/components/ui/SectionTitle';
import { Button } from '@/src/components/ui/Button';
import { useContactForm } from '@/src/hooks/useContactForm';

export function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
    isSuccess,
    isError,
    errorMessage,
  } = useContactForm();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <SectionTitle
        title="Get in Touch"
        subtitle="Feel free to reach out for collaborations, job opportunities, or just to say hello!"
        align="center"
      />

      {isSuccess && (
        <div
          role="alert"
          className="mb-6 rounded-lg bg-surface border border-accent/40 px-4 py-3 text-sm text-accent text-center"
        >
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}

      {isError && (
        <div
          role="alert"
          className="mb-6 rounded-lg bg-surface border border-red-500/40 px-4 py-3 text-sm text-red-400 text-center"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Honeypot — hidden from humans, visible to bots */}
        <div style={{ visibility: 'hidden', position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-text-primary">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
            {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-text-primary">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="subject" className="block text-sm font-medium text-text-primary">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Project inquiry"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
            {...register('subject', { required: 'Subject is required', minLength: { value: 3, message: 'Subject must be at least 3 characters' } })}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="text-xs text-red-400">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-sm font-medium text-text-primary">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about your project or just say hello..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 resize-none"
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
