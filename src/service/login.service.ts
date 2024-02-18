import { instanceAxios } from './index';

import type { User } from '@/interfaces/login.interface';

import { parseErrorMessage } from '@/plugins/utils';

export async function connect(email: string, password: string) {
  try {
    const { data } = await instanceAxios.post('user/signin', {
      email,
      password,
    });
    return data;
  } catch (err) {
    return parseErrorMessage(err);
  }
}
