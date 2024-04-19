import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as client from '@/service/activity.service';

const activityState = {
  activies: [] as any[],
  categories: [] as any[],
  loading: {
    activies: false,
  },
  error: {
    message: 'string',
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
        state.activies.filter((item: any) => item.title?.includes(title));
    },
    showCategories: state => {
      // bug: replace with categories from bdd
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
    async findActivities(option: any) {
      const activies = await client.findActivities(option);
      this.activies = activies;
    },
    async findCategories(option: any) {
      const categories = await client.findCategories(option);
      this.categories = categories;
    },
    async createActivity(option: any) {
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
