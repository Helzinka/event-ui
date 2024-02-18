import { defineStore } from 'pinia';

import type { Events } from '@/interfaces/event.interface';

import * as client from '@/service/event.service';

const eventState = {
  events: [] as Events,
};

/** Event Store */
export const useEventStore = defineStore('event', {
  state: () => eventState,
  getters: {
    showEvents: state => {
      return state.events;
    },
    filterEventByName: state => {
      return (title: string) =>
        state.events.filter(item => item.title?.includes(title));
    },
  },
  actions: {
    async findEvents() {
      this.events = await client.getEvents({});
    },
  },
});
