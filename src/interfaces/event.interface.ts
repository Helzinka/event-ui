import type { z } from 'zod';

import {
  EventFindManyArgsSchema,
  EventPartialWithRelationsSchema,
} from '@/interfaces/prisma.interface';

const EventPartialWithRelationsSchemaArray =
  EventPartialWithRelationsSchema.array();
export type Events = z.infer<typeof EventPartialWithRelationsSchemaArray>;

export type EventFind = z.infer<typeof EventFindManyArgsSchema>;
