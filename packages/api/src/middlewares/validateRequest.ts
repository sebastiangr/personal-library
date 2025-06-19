import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// Este es un "higher-order function". Es una función que devuelve otra función.
// Esto nos permite pasarle el esquema que queremos usar para la validación.
export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Si la validación falla, Zod lanza un error. Lo atrapamos aquí.
      res.status(400).json(error);
    }
};