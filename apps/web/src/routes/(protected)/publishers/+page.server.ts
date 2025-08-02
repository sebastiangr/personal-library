import type { Publisher } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/publishers');
    if (!response.ok) {
        throw new Error('Failed to fetch publishers');
    }
    const publishers: Publisher[] = await response.json();
    return { publishers };
  } catch (error) {
    console.error("Error fetching publishers:", error);
    return { publishers: [] };
  }
};