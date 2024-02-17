import { instanceAxios } from './index';

import type { EventsPartialWithRelationsSchema } from '@/interfaces/event.interface';

export async function getEvent() {
  const data = await instanceAxios.post<EventsPartialWithRelationsSchema>(
    'event/find',
    {}
  );
  return data;
}
