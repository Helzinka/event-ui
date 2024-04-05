import { instanceAxios } from './index';

import type {
  Activity,
  Activities,
  ActivityFindOneArg,
  ActivityCreateArg,
} from '@/interfaces/activity.interface';

export async function findActivities(options: ActivityFindOneArg) {
  const { data } = await instanceAxios.post<Activities>('event/find', options);
  return data;
}

export async function createActivity(options: ActivityCreateArg) {
  const { data } = await instanceAxios.post<Activity>(
    'activity/create',
    options
  );
  return data;
}
