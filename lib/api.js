const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4010';

export async function fetchActivePlans() {
  const res = await fetch(`${API_URL}/api/v1/public/plans`);
  if (!res.ok) {
    throw new Error('Failed to fetch plans');
  }
  return res.json();
}
