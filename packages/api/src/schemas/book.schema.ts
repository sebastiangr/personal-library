import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'El título es obligatorio',
    }).min(3, 'El título debe tener al menos 3 caracteres'),

    subtitle: z.string().optional(),

    isbn_13: z.string().length(13, 'El ISBN-13 debe tener 13 caracteres').optional(),
    
    isbn_10: z.string().length(10, 'El ISBN-10 debe tener 10 caracteres').optional(),
    
    page_count: z.number({
      invalid_type_error: 'El número de páginas debe ser un número',
    }).positive('El número de páginas debe ser positivo').optional(),

    published_year: z.number({
      invalid_type_error: 'El año de publicación debe ser un número',
    }).int().min(1000).max(new Date().getFullYear()).optional(),
    
    cover_image_url: z.string().url('La URL de la imagen de portada no es válida').optional(),
    
    description: z.string().optional(),

    authorIds: z.array(z.string().uuid(), { required_error: 'Se requiere al menos un autor' }).min(1),
    genreIds: z.array(z.string().uuid()).optional(),
    publisherId: z.string().uuid().optional(),
  }),
});

export const updateBookSchema = z.object({
  body: createBookSchema.shape.body.partial(), // Hace todos los campos opcionales
  params: z.object({
    id: z.string().uuid('El ID del libro debe ser un UUID válido'),
  }),
});