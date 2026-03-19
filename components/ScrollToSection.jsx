'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * URL query param orqali sahifadagi section ga scroll qilish.
 * Masalan: /?scrollTo=features
 */
export default function ScrollToSection() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // URL dan param olib tashlash
          window.history.replaceState({}, '', '/');
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryScroll, 150);
        }
      };
      tryScroll();
    }
  }, [searchParams]);

  return null;
}
