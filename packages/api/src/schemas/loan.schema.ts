import { z } from 'zod';

export const createLoanSchema = z.object({
  params: z.object({
    bookId: z.string().uuid("El ID del libro debe ser un UUID válido."),
  }),
  body: z.object({
    borrowerId: z.string().uuid("El ID del prestatario debe ser un UUID válido."),
    expectedReturnDate: z.string().date().optional(),
  }),
});
