import { instanceAxios } from './index';

export async function findUsers(options: any) {
  const { data } = await instanceAxios.post('user/findUsers', options);
  return data;
}
