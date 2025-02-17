import { z } from 'zod';

export const CategoryResponse = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const CategoriesResponse = z.array(CategoryResponse);
export const CategoriesFindArg = z.object({ eventId: z.string() });

export type CategoryResponse = z.infer<typeof CategoryResponse>;
export type CategoriesResponse = z.infer<typeof CategoriesResponse>;
export type CategoriesFindArg = z.infer<typeof CategoriesFindArg>;
