import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContactForm } from '@/src/hooks/useContactForm';

const validFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test Subject',
  message: 'This is a test message with enough characters.',
  honeypot: '',
};

describe('useContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBe('Something went wrong. Please try again.');
  });

  it('should set isSuccess to true after a successful submit', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Sent' }),
    } as Response);

    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('should set isError to true after a failed submit (non-ok response)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error occurred.' }),
    } as Response);

    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Server error occurred.');
  });

  it('should set isError to true when fetch throws (network error)', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Network failure');
  });

  it('should not call fetch when honeypot is filled (bot detection)', async () => {
    const mockFetch = vi.mocked(fetch);
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.onSubmit({ ...validFormData, honeypot: 'bot-filled' });
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should reset success state between calls', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) } as Response)
      .mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Oops' }) } as Response);

    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(result.current.isSuccess).toBe(true);

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
