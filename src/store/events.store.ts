import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import type {
  EventsResponse,
  EventCreateArg,
} from '@/interfaces/event.interface';
import * as service from '@/service/event.service';

const state = {
  events: [] as EventsResponse,
  loading: {
    event: false,
  },
  error: {
    message: '',
  },
};

export const useEventsStore = defineStore('Events', {
  state: () => state,
  getters: {
    getEvents: state => {
      return state.events;
    },
    filterEventsByName: state => {
      return (title: string) => {
        return state.events.filter(item => item.title?.includes(title));
      };
    },
  },
  actions: {
    async findEvents() {
      this.loading.event = true;
      const events = await service.findEvents();
      if (events.length > 0) {
        this.events = events;
      } else {
        this.error.message = 'No events found';
      }
      this.loading.event = false;
    },
    async createEvent(options: EventCreateArg) {
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
      const data = await service.deleteEvent(options);
      if (data) {
        this.events = this.events.filter(event => event.id !== data.id);
        ElMessage({
          message: `L'evènement ${data.title} a bien été supprimé`,
          type: 'success',
        });
      }
    },
    async updateEvent(options: any) {
      const data = await service.updateEvent(options);
      if (data) {
        this.events.find(
          event => event.id === data.id && Object.assign(event, data)
        );
        ElMessage({
          message: `l'évènement ${data.title} a été modifié`,
          type: 'success',
        });
      }
    },
  },
});
