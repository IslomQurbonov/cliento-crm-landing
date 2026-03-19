// Client-side: use relative URL (proxied via next.config.mjs rewrites)
// Server-side: use API_URL env directly
const API_URL = typeof window === 'undefined'
  ? (process.env.API_URL || 'http://localhost:4010')
  : '';

export async function fetchActivePlans() {
  const res = await fetch(`${API_URL}/api/v1/public/plans`);
  if (!res.ok) {
    throw new Error('Failed to fetch plans');
  }
  return res.json();
}
