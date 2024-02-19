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
    filterActivityByName: state => {
      return (title: string) =>
        state.activies.filter(item => item.title?.includes(title));
    },
    showCategories: state => {
      // replace with bdd
      const categories: string[] = [];

      for (const item of state.activies) {
        if (item.category) {
          for (const item2 of item.category) {
            if (item2.name && categories.length <= 0 && item2.name) {
              categories.push(item2.name);
            }
            if (item2.name && !categories.includes(item2.name)) {
              categories.push(item2.name);
            }
          }
        }
      }
      return categories;
    },
  },
  actions: {
    async findActivitiesFromEvent(option: ActityFind) {
      const { activity, ...event } =
        await client.findActivitiesFromEvent(option);
      this.activies = activity;
      this.event = event;
    },
    async createActivity(option: ActityCreate) {
      const data = await client.createActivity(option);
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
