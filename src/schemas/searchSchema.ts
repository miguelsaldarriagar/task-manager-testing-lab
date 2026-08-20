// ==== Actividad 4: esquema Zod propio para GET /tasks/search ====
import { z } from 'zod';

export const SearchResultItemSchema = z.object({
  id: z.string().min(1, 'El id no puede estar vacío'),
  title: z.string().min(1, 'El título no puede estar vacío'),
  status: z.enum(['pending', 'completed'], {
    errorMap: () => ({ message: 'El estado debe ser "pending" o "completed"' }),
  }),
});

export const SearchResponseSchema = z.array(SearchResultItemSchema);

export type SearchResultItem = z.infer<typeof SearchResultItemSchema>;