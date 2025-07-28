import { z } from 'zod';

export const createPublisherSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name is required'),
    country: z.string().optional(),
    city: z.string().optional(),
    // TODO: Verify if website is without http:// or https://
    website: z.string().url().optional()
  }),
});