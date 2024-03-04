import { instanceAxios } from './index';

export async function findUsers(options: any) {
  const { data } = await instanceAxios.post('user/findUsers', options);
  return data;
}

export async function deleteUser(options: any) {
  const { data } = await instanceAxios.post('user/deleteUser', options);
  return data;
}

export async function updateUser(options: any) {
  const { data } = await instanceAxios.put('user/updateUser', options);
  return data;
}

export async function createUser(options: any) {
  const { data } = await instanceAxios.post('user/create', options);
  return data;
}
