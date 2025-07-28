import { z } from 'zod';

export const createGenreSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    description: z.string().optional(),
  }),
});