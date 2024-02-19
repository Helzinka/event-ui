import { instanceAxios } from './index';

import type {
  Actity,
  Activies,
  ActityFind,
  ActityCreate,
} from '@/interfaces/activity.interface';

export async function findActivitiesFromEvent(options: ActityFind) {
  const { data } = await instanceAxios.post('event/findUnique', options);
  return data;
}

export async function createActivity(options: ActityCreate) {
  const { data } = await instanceAxios.post<Actity>('activity/create', options);
  return data;
}
