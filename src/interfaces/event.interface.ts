import type { z } from 'zod';

import { EventPartialWithRelationsSchema } from '@/model/index';

const EventPartialWithRelationsSchemaArray =
  EventPartialWithRelationsSchema.array();
export type EventsPartialWithRelationsSchema = z.infer<
  typeof EventPartialWithRelationsSchemaArray
>;
