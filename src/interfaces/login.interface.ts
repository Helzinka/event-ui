import type { z } from 'zod';

import { UserSchema } from '@/interfaces/prisma.interface';

// note: redo this type schema
export type User = z.infer<typeof UserSchema>;
