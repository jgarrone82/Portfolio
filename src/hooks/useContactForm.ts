'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ContactFormData } from '@/src/types';

type FormFields = ContactFormData;

export interface UseContactFormReturn {
  register: ReturnType<typeof useForm<FormFields>>['register'];
  handleSubmit: ReturnType<typeof useForm<FormFields>>['handleSubmit'];
  formState: ReturnType<typeof useForm<FormFields>>['formState'];
  onSubmit: (data: FormFields) => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  reset: ReturnType<typeof useForm<FormFields>>['reset'];
}

export function useContactForm(): UseContactFormReturn {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong. Please try again.');

  const { register, handleSubmit, reset, formState } = useForm<FormFields>({
    defaultValues: { name: '', email: '', subject: '', message: '', honeypot: '' },
  });

  async function onSubmit(data: FormFields) {
    // Honeypot check on client side as well
    if (data.honeypot) return;

    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          website: data.honeypot ?? '',
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body?.message ?? 'Something went wrong. Please try again.');
        setIsError(true);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsError(true);
    }
  }

  return {
    register,
    handleSubmit,
    formState,
    onSubmit,
    isSuccess,
    isError,
    errorMessage,
    reset,
  };
}
