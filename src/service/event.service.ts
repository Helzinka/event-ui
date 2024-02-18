import { instanceAxios } from './index';

import type { Events, EventFind } from '@/interfaces/event.interface';

export async function getEvents(options: EventFind) {
  const { data } = await instanceAxios.post<Events>('event/find', options);
  return data;
}
