'use client';

import { useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    observers.push(observer);

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, []);

  return activeSection;
}
