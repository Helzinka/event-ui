import type { z } from 'zod';

import { UserSchema } from '@/interfaces/prisma.interface';

export type User = z.infer<typeof UserSchema>;
