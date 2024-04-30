import { instanceAxios } from './index';

import type {
  ActivityFindOneArg,
  ActivityCreateArg,
  ActivitiesResponse,
  ActivityResponse,
  ActivityDeleteArg,
  ActivityUpdateArg,
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

export async function deleteActivity(options: ActivityDeleteArg) {
  const { data } = await instanceAxios.delete<ActivityResponse>(
    'activity/delete',
    {
      params: options,
    }
  );
  return data;
}

export async function updateActivity(options: ActivityUpdateArg) {
  const { data } = await instanceAxios.patch<ActivityResponse>(
    'activity/delete',
    options
  );
  return data;
}
