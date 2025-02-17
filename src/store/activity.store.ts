import { defineStore } from 'pinia';
import type { ActivityResponse } from '@/interfaces/activity.interface';
import type {
  TicketsResponse,
  TicketFindArg,
} from '@/interfaces/ticket.interfaces';
import * as serviceTicket from '@/service/ticket.service';

const state = {
  tickets: [] as TicketsResponse,
  loading: false,
  error: '',
};

export const useActivityStore = defineStore('Activity', {
  state: () => state,
  getters: {},
  actions: {
    async findTickets(option: TicketFindArg) {
      await serviceTicket.findTickets(option);
    },
  },
});
