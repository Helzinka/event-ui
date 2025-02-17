import type {
  TicketFindArg,
  TicketResponse,
} from '@/interfaces/ticket.interfaces';
import { instanceAxios } from './index';

export async function findTickets(options: TicketFindArg) {
  const { data } = await instanceAxios.get<TicketResponse>('ticket/find', {
    params: options,
  });
  return data;
}
