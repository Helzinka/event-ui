import type { z } from 'zod';

import {
  EventFindManyArgsSchema,
  EventPartialWithRelationsSchema,
  EventCreateArgsSchema,
} from '@/interfaces/prisma.interface';

const EventPartialWithRelationsSchemaArray =
  EventPartialWithRelationsSchema.array();
export type Event = z.infer<typeof EventPartialWithRelationsSchema>;
export type Events = z.infer<typeof EventPartialWithRelationsSchemaArray>;
export type EventFind = z.infer<typeof EventFindManyArgsSchema>;
export type EventCreate = z.infer<typeof EventCreateArgsSchema>;
