import { instanceAxios } from './index';

// todo: add better type options
export async function find() {
  const { data } = await instanceAxios.get('user/find');
  return data;
}
// todo: add better type options
export async function deleteUser(options: any) {
  const { data } = await instanceAxios.delete('user/deleteUser', options);
  return data;
}
// todo: add better type options
export async function updateUser(options: any) {
  const { data } = await instanceAxios.patch('user/updateUser', options);
  return data;
}
// todo: add better type options
export async function createUser(options: any) {
  const { data } = await instanceAxios.post('user/create', options);
  return data;
}
