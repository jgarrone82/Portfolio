import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactSection } from '@/src/components/sections/ContactSection';

const mockUseContactForm = {
  register: vi.fn(() => ({})),
  handleSubmit: vi.fn((fn) => fn),
  formState: { errors: {}, isSubmitting: false },
  onSubmit: vi.fn(),
  isSuccess: false,
  isError: false,
  errorMessage: 'Something went wrong. Please try again.',
};

vi.mock('@/src/hooks/useContactForm', () => ({
  useContactForm: () => mockUseContactForm,
}));

describe('ContactSection', () => {
  beforeEach(() => {
    mockUseContactForm.formState = { errors: {}, isSubmitting: false };
    mockUseContactForm.isSuccess = false;
    mockUseContactForm.isError = false;
    mockUseContactForm.errorMessage = 'Something went wrong. Please try again.';
  });

  it('renders all form fields', () => {
    render(<ContactSection />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactSection />);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders the Download CV link', () => {
    render(<ContactSection />);
    const link = screen.getByRole('link', { name: 'Download CV' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/resume.pdf');
  });

  it('shows success alert when isSuccess is true', () => {
    mockUseContactForm.isSuccess = true;
    render(<ContactSection />);
    expect(screen.getByRole('alert')).toHaveTextContent("Message sent!");
  });

  it('shows error alert when isError is true', () => {
    mockUseContactForm.isError = true;
    mockUseContactForm.errorMessage = 'Server error occurred.';
    render(<ContactSection />);
    expect(screen.getByRole('alert')).toHaveTextContent('Server error occurred.');
  });

  it('shows "Sending…" on submit button while submitting', () => {
    mockUseContactForm.formState = { errors: {}, isSubmitting: true };
    render(<ContactSection />);
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeInTheDocument();
  });
});
