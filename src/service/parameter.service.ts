import { instanceAxios } from './index';

export async function findUsers(options: any) {
  const { data } = await instanceAxios.post('user/findUsers', options);
  return data;
}

export async function deleteUser(options: any) {
  console.log(options);
  const { data } = await instanceAxios.post('user/deleteUser', options);
  return data;
}
