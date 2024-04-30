import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import type { EventsResponse } from '@/interfaces/event.interface';
import * as service from '@/service/event.service';

const reportingState = {
  events: [] as EventsResponse,
};

/** Reporting Store */
export const useReportingStore = defineStore('reporting', {
  state: () => reportingState,
  // todo: make call to db instead of get all events
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
      this.events = await service.findEvents();
    },
  },
});
