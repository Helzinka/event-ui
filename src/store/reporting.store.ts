import { defineStore } from 'pinia';

import dayjs from 'dayjs';

import type { Events } from '@/interfaces/event.interface';

import * as client from '@/service/event.service';

const reportingState = {
  events: [] as Events,
};

/** Reporting Store */
export const useReportingStore = defineStore('reporting', {
  state: () => reportingState,
  getters: {
    showNumberEvents: state => {
      return state.events.length;
    },
    showNumberEventsPending: state => {
      return state.events.filter(
        item =>
          dayjs().isAfter(dayjs(item.start)) &&
          dayjs().isBefore(dayjs(item.end))
      ).length;
    },
    showNumberEventsFuture: state => {
      return state.events.filter(item => dayjs().isBefore(dayjs(item.start)))
        .length;
    },
    showNumberEventsPast: state => {
      return state.events.filter(item => dayjs().isAfter(dayjs(item.end)))
        .length;
    },
  },
  actions: {
    async findEvents() {
      this.events = await client.getEvents({});
    },
  },
});
