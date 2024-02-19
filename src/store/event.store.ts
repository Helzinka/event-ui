import { defineStore } from 'pinia';

import { ElMessage } from 'element-plus';

import type { Events, EventCreate } from '@/interfaces/event.interface';

import * as client from '@/service/event.service';

const eventState = {
  events: [] as Events,
  loading: {
    event: false,
  },
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
      this.loading.event = true;
      this.events = await client.getEvents({});
      this.loading.event = false;
    },
    async createEvent(options: EventCreate) {
      const data = await client.createEvent(options);
      if (data) {
        this.events.push(data);
        ElMessage({
          message: `Evènement ${data.title} a été créé`,
          type: 'success',
        });
      }
    },
    async deleteEvent(options: any) {
      const data = await client.createEvent(options);
      if (data) {
        this.events.push(data);
        ElMessage({
          message: `Evènement ${data.title} a été supprimé`,
          type: 'success',
        });
      }
    },
  },
});
