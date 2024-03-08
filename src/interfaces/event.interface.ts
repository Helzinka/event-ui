import type { z } from 'zod';

import {
  EventSchema,
  EventFindManyArgsSchema,
  EventWithRelationsSchema,
  EventCreateArgsSchema,
  EventUpdateArgsSchema,
  EventDeleteArgsSchema,
} from '@/interfaces/prisma.interface';

const EventArray = EventSchema.array();

export type Event = z.infer<typeof EventSchema>;
export type Events = z.infer<typeof EventArray>;
export type EventWithRelations = z.infer<typeof EventWithRelationsSchema>;
export type EventFind = z.infer<typeof EventFindManyArgsSchema>;
export type EventCreate = z.infer<typeof EventCreateArgsSchema>;
export type EventUpdate = z.infer<typeof EventUpdateArgsSchema>;
export type EventDelete = z.infer<typeof EventDeleteArgsSchema>;
