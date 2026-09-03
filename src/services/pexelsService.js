// In-memory cache to store fetched image URLs by query key to prevent duplicate API requests
const imageCache = new Map();

/**
 * Fetches a high-quality landscape photo URL from Pexels Search API for a given search query.
 * Falls back to the provided fallbackUrl if the request fails, API key is missing/invalid,
 * 0 results are returned, or network errors occur.
 *
 * @param {string} query Location or landmark name to search (e.g. "Swiss Alps", "Matterhorn")
 * @param {string} fallbackUrl Default fallback image URL from mockData.js
 * @returns {Promise<string>} Resolved Pexels image URL or fallback URL
 */
export async function getPexelsImage(query, fallbackUrl) {
  if (!query || typeof query !== 'string') {
    return fallbackUrl;
  }

  const cacheKey = query.trim().toLowerCase();

  // Return cached result if already fetched in this session
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  // Return fallbackUrl immediately if API key is missing or blank
  if (!apiKey || apiKey === 'MY_PEXELS_API_KEY' || apiKey.trim() === '') {
    imageCache.set(cacheKey, fallbackUrl);
    return fallbackUrl;
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query.trim())}&per_page=1`,
      {
        headers: {
          Authorization: apiKey.trim()
        }
      }
    );

    if (!response.ok) {
      console.warn(`Pexels API returned status ${response.status} for query "${query}". Using fallback image.`);
      imageCache.set(cacheKey, fallbackUrl);
      return fallbackUrl;
    }

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      const photo = data.photos[0];
      // Select best landscape orientation image or fallback to large/medium
      const imageUrl =
        photo.src?.landscape ||
        photo.src?.large2x ||
        photo.src?.large ||
        photo.src?.medium ||
        fallbackUrl;

      imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    } else {
      // No photos found for query
      imageCache.set(cacheKey, fallbackUrl);
      return fallbackUrl;
    }
  } catch (error) {
    console.warn(`Failed to fetch Pexels image for "${query}":`, error.message);
    imageCache.set(cacheKey, fallbackUrl);
    return fallbackUrl;
  }
}
