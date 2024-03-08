import { instanceAxios } from './index';

// todo: add better type options
export async function findUsers(options: any) {
  const { data } = await instanceAxios.post('user/findUsers', options);
  return data;
}
// todo: add better type options
export async function deleteUser(options: any) {
  const { data } = await instanceAxios.post('user/deleteUser', options);
  return data;
}
// todo: add better type options
export async function updateUser(options: any) {
  const { data } = await instanceAxios.post('user/updateUser', options);
  return data;
}
// todo: add better type options
export async function createUser(options: any) {
  const { data } = await instanceAxios.post('user/create', options);
  return data;
}
