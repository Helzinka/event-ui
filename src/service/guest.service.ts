import { instanceAxios } from './index';
import type {
  GuestFindOneArg,
  GuestResponse,
} from '@/interfaces/guest.interface';

export async function findOneGuest(options: GuestFindOneArg) {
  const { data } = await instanceAxios.get<GuestResponse>('guest/findOne', {
    params: options,
  });
  return data;
}
