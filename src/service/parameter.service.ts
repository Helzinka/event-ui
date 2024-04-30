import { instanceAxios } from './index';

// todo: add better type options
export async function findUsers(options: any) {
  const { data } = await instanceAxios.get('user/find', { params: options });
  return data;
}
// todo: add better type options
export async function deleteUser(options: any) {
  const { data } = await instanceAxios.delete('user/delete', {
    params: options,
  });
  return data;
}
// todo: add better type options
export async function updateUser(options: any) {
  const { data } = await instanceAxios.patch('user/update', options);
  return data;
}
// todo: add better type options
export async function createManager(options: any) {
  const { data } = await instanceAxios.post('user/createManager', options);
  return data;
}
