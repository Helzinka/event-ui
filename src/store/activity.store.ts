import { defineStore } from 'pinia';

import { ElMessage } from 'element-plus';

import type {
  ActityFind,
  Activies,
  ActityCreate,
} from '@/interfaces/activity.interface';
import type { Event } from '@/interfaces/event.interface';

import * as client from '@/service/activity.service';

const activityState = {
  event: {} as Event,
  activies: [] as Activies,
  loading: {
    activies: false,
  },
};

/** Event Store */
export const useActivityStore = defineStore('activity', {
  state: () => activityState,
  getters: {
    showEvents: state => {
      return state.activies;
    },
    filterEventByName: state => {
      return (title: string) =>
        state.activies.filter(item => item.title?.includes(title));
    },
  },
  actions: {
    async findActivitiesFromEvent(option: ActityFind) {
      const { activity, ...event } =
        await client.findActivitiesFromEvent(option);
      this.activies = activity;
      this.event = event;
    },
    async createActivity(options: ActityCreate) {
      const data = await client.createActivity(options);
      if (data) {
        this.activies.push(data);
        ElMessage({
          message: `Evènement ${data.title} bien créé`,
          type: 'success',
        });
      }
    },
  },
});
