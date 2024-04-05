import { pa } from 'element-plus/es/locales.mjs';
import { instanceAxios } from './index';

import type {
  Event,
  Events,
  EventFindOneArg,
  EventCreateArg,
  EventUpdateArg,
  EventDeleteArg,
} from '@/interfaces/event.interface';

export async function findEvents() {
  const { data } = await instanceAxios.get<Events>('event/find');
  return data;
}

export async function findOneEvent(options: EventFindOneArg) {
  const { data } = await instanceAxios.get<Event>('event/findOne', {
    params: options,
  });
  return data;
}

export async function createEvent(options: EventCreateArg) {
  const { data } = await instanceAxios.post<Event>('event/create', options);
  return data;
}

export async function updateEvent(options: EventUpdateArg) {
  const { data } = await instanceAxios.patch<Event>('event/update', options);
  return data;
}

export async function deleteEvent(options: EventDeleteArg) {
  const { data } = await instanceAxios.delete<Event>('event/delete', {
    params: options,
  });
  return data;
}
