import { apiClient } from '$lib/api';
import type { Publisher } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  console.log('Token from publishers>page.server.ts: ', token);

  if (!token) {
    return { publishers: [] };
  }

  try {
    const publishers = await apiClient<Publisher[]>('/publishers', {}, token);
    return { publishers };
  } catch (error) {
    console.error("Error fetching publishers:", error);
    return { authors: [] };
  }
};