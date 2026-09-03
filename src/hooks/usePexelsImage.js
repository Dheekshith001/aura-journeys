import { useState, useEffect } from 'react';
import { getPexelsImage } from '../services/pexelsService';

/**
 * Custom React hook to dynamically load Pexels image for a given search query
 * with fallback safety and non-disruptive loading states.
 *
 * @param {string} searchQuery Search query string (e.g. destination or landmark name)
 * @param {string} fallbackUrl Default image URL from mockData
 * @returns {{ imageSrc: string, loading: boolean }}
 */
export function usePexelsImage(searchQuery, fallbackUrl) {
  const [imageSrc, setImageSrc] = useState(fallbackUrl);
  const [loading, setLoading] = useState(Boolean(searchQuery));

  useEffect(() => {
    let isMounted = true;

    if (!searchQuery) {
      return;
    }

    getPexelsImage(searchQuery, fallbackUrl)
      .then((url) => {
        if (isMounted) {
          setImageSrc(url || fallbackUrl);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImageSrc(fallbackUrl);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, fallbackUrl]);

  return { imageSrc, loading };
}
