import { instanceAxios } from './index';

import type {
  EventResponse,
  EventsResponse,
  EventFindOneArg,
  EventCreateArg,
  EventUpdateArg,
  EventDeleteArg,
} from '@/interfaces/event.interface';

export async function findEvents() {
  const { data } = await instanceAxios.get<EventsResponse>('event/find');
  return data;
}

export async function findOneEvent(options: EventFindOneArg) {
  const { data } = await instanceAxios.get<EventResponse>('event/findOne', {
    params: options,
  });
  return data;
}

export async function createEvent(options: EventCreateArg) {
  const { data } = await instanceAxios.post<EventResponse>(
    'event/create',
    options
  );
  return data;
}

export async function updateEvent(options: EventUpdateArg) {
  const { data } = await instanceAxios.patch<EventResponse>(
    'event/update',
    options
  );
  return data;
}

export async function deleteEvent(options: EventDeleteArg) {
  const { data } = await instanceAxios.delete<EventResponse>('event/delete', {
    params: options,
  });
  return data;
}
