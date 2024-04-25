import { instanceAxios } from './index';

import type {
  ActivityFindOneArg,
  ActivityCreateArg,
  ActivitiesResponse,
  ActivityResponse,
} from '@/interfaces/activity.interface';

export async function findActivities(options: ActivityFindOneArg) {
  const { data } = await instanceAxios.get<ActivitiesResponse>(
    'activity/find',
    {
      params: options,
    }
  );
  return data;
}

export async function createActivity(options: ActivityCreateArg) {
  const { data } = await instanceAxios.post<ActivityResponse>(
    'activity/create',
    options
  );
  return data;
}
