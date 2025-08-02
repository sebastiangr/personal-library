import type { Genre } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/genres');
    if (!response.ok) {
        throw new Error('Failed to fetch genres');
    }
    const genres: Genre[] = await response.json();
    return { genres };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { genres: [] };
  }
};