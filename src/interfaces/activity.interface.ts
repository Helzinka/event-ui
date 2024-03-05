import type { z } from 'zod';

import {
  ActivityFindManyArgsSchema,
  ActivityCreateArgsSchema,
  ActivityWithPartialRelationsSchema,
} from '@/interfaces/prisma.interface';

const ActivityWithPartialRelationsSchemaArray =
  ActivityWithPartialRelationsSchema.array();
export type Actity = z.infer<typeof ActivityWithPartialRelationsSchema>;
export type Activies = z.infer<typeof ActivityWithPartialRelationsSchemaArray>;
export type ActityFind = z.infer<typeof ActivityFindManyArgsSchema>;
export type ActityCreate = z.infer<typeof ActivityCreateArgsSchema>;
