import type { z } from 'zod';

import {
  ActivitySchema,
  ActivityFindManyArgsSchema,
  ActivityCreateArgsSchema,
} from '@/interfaces/prisma.interface';

const ActivitySchemaArray = ActivitySchema.array();
export type Actity = z.infer<typeof ActivitySchema>;
export type Activies = z.infer<typeof ActivitySchemaArray>;
export type ActityFind = z.infer<typeof ActivityFindManyArgsSchema>;
export type ActityCreate = z.infer<typeof ActivityCreateArgsSchema>;
