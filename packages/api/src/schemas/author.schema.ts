import { z } from 'zod';

export const createAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    birth_date: z.string().datetime().optional(),
    death_date: z.string().datetime().optional(),
    birth_city: z.string().optional(),
    birth_country: z.string().optional(),
    nationality: z.string().optional(),
    gender: z.string().optional(),
    bio: z.string().optional(),
    photo_url: z.string().url().optional(),
  }),
});