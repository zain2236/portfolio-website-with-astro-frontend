/**
 * Get the Strapi base URL, ensuring it uses HTTPS in production
 */
export function getStrapiUrl() {
  const url = import.meta.env.PUBLIC_STRAPI_URL;
  
  if (!url) {
    throw new Error('PUBLIC_STRAPI_URL environment variable is not set');
  }

  // If URL is localhost, return as is (for local development)
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return url;
  }

  // For production URLs, ensure HTTPS
  try {
    const urlObj = new URL(url);
    // Force HTTPS for non-localhost URLs
    if (urlObj.protocol === 'http:' && !urlObj.hostname.includes('localhost')) {
      urlObj.protocol = 'https:';
      return urlObj.toString().replace(/\/$/, ''); // Remove trailing slash
    }
    return url.replace(/\/$/, ''); // Remove trailing slash
  } catch {
    return url;
  }
}

/**
 * Construct a full image URL from Strapi
 * Handles cases where the image path might already be a full URL
 */
export function getStrapiImageUrl(imagePath) {
  if (!imagePath) {
    return null;
  }

  // If imagePath is already a full URL, return it (but ensure HTTPS)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // Ensure HTTPS for non-localhost URLs
    if (imagePath.startsWith('http://') && !imagePath.includes('localhost')) {
      return imagePath.replace('http://', 'https://');
    }
    return imagePath;
  }

  // Otherwise, construct the full URL
  const baseUrl = getStrapiUrl();
  // Ensure imagePath starts with /
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${path}`;
}

