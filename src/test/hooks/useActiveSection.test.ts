import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useActiveSection } from '@/src/hooks/useActiveSection';

// IntersectionObserver is mocked globally in src/test/setup.ts.
// We override it per-test to capture the callback so we can trigger it.

let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  document.body.innerHTML = '';

  // Must use a regular function (not arrow) so `new IntersectionObserver()` works.
  const MockObserver = vi.fn(function (
    this: IntersectionObserver,
    callback: IntersectionObserverCallback,
  ) {
    intersectionCallback = callback;
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.disconnect = vi.fn();
  });

  global.IntersectionObserver = MockObserver as unknown as typeof IntersectionObserver;
});

describe('useActiveSection', () => {
  it('returns empty string initially', () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current).toBe('');
  });

  it('returns the section id when IntersectionObserver fires for that section', () => {
    const el = document.createElement('section');
    el.id = 'about';
    document.body.appendChild(el);

    const { result } = renderHook(() => useActiveSection());

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe('about');
  });

  it('updates to the last intersecting section when multiple entries fire', () => {
    const homeEl = document.createElement('section');
    homeEl.id = 'home';
    const skillsEl = document.createElement('section');
    skillsEl.id = 'skills';
    document.body.appendChild(homeEl);
    document.body.appendChild(skillsEl);

    const { result } = renderHook(() => useActiveSection());

    act(() => {
      intersectionCallback(
        [
          { isIntersecting: true, target: homeEl } as unknown as IntersectionObserverEntry,
          { isIntersecting: true, target: skillsEl } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    // Last intersecting entry in the loop wins
    expect(result.current).toBe('skills');
  });

  it('does not update when entry is not intersecting', () => {
    const el = document.createElement('section');
    el.id = 'projects';
    document.body.appendChild(el);

    const { result } = renderHook(() => useActiveSection());

    act(() => {
      intersectionCallback(
        [{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe('');
  });
});
