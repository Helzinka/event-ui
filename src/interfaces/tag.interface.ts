import { z } from 'zod';

export const TagSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const categories = z.infer<typeof TagSchema>;
