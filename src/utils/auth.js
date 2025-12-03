// Lightweight helper to extract user id or identifier from a JWT stored in localStorage
// Safe to use in browser (no external deps). If your token is not a JWT, this will return null.

export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    // token format: header.payload.signature
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    // Common claim names: id, userId, sub
    return payload?.id || payload?.userId || payload?.sub || null;
  } catch (err) {
    // token might be not base64 or malformed
    console.warn('Failed to decode token to get user id', err);
    return null;
  }
}
