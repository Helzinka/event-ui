import { instanceAxios } from './index';

import type {
  Event,
  Events,
  EventFind,
  EventCreate,
  EventUpdate,
} from '@/interfaces/event.interface';

export async function getEvents(options: EventFind) {
  const { data } = await instanceAxios.post<Events>('event/find', options);
  return data;
}

export async function createEvent(options: EventCreate) {
  const { data } = await instanceAxios.post<Event>('event/create', options);
  return data;
}

export async function updateEvent(options: EventUpdate) {
  const { data } = await instanceAxios.post<Event>('event/update', options);
  return data;
}
