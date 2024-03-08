import { defineStore } from 'pinia';

import { ElMessage } from 'element-plus';

import type {
  Events,
  Event,
  EventCreate,
  EventUpdate,
} from '@/interfaces/event.interface';

import * as service from '@/service/event.service';

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
    showEventById: state => {
      return (id: number) => {
        return state.events.find(item => item.id === id) as Event;
      };
    },
    showEventByName: state => {
      return (title: string) => {
        return state.events.filter(item => item.title?.includes(title));
      };
    },
  },
  actions: {
    async findEvents() {
      this.loading.event = true;
      this.events = await service.getEvents({});
      this.loading.event = false;
    },
    async createEvent(options: EventCreate) {
      const data = await service.createEvent(options);
      if (data) {
        this.events.push(data);
        ElMessage({
          message: `Evènement ${data.title} a été créé`,
          type: 'success',
        });
      }
    },
    async deleteEvent(options: any) {
      const data = await service.createEvent(options);
      if (data) {
        this.events.push(data);
        ElMessage({
          message: `Evènement ${data.title} a été supprimé`,
          type: 'success',
        });
      }
    },
    async updateEvent(options: EventUpdate) {
      const data = await service.updateEvent(options);
      if (data) {
        this.events = this.events.map(item => {
          if (item.id === data.id) {
            return { ...data };
          }
        });
        ElMessage({
          message: `l'évènement ${data.title} a été modifié`,
          type: 'success',
        });
      }
    },
  },
});
