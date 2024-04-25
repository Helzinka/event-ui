import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as client from '@/service/activity.service';
import * as clientCategory from '@/service/category.service';
import type { ActivityCreateArg } from '@/interfaces/activity.interface';
import type { CategoriesFindArg } from '@/interfaces/category.interfaces';

const activityState = {
  activies: [] as any[],
  categories: [] as string[],
  currentEvent: {} as any,
  loading: false,
  error: '',
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
      return state.categories;
    },
  },
  actions: {
    async findActivities(option: any) {
      const activies = await client.findActivities(option);
      this.activies = activies;
    },
    async findCategories(option: CategoriesFindArg) {
      const categories = await clientCategory.findCategories(option);
      if (categories.length)
        this.categories = categories.map(item => item.name);
    },
    async createActivity(option: any) {
      option.eventId = this.currentEvent.id;
      const data = await client.createActivity(option);
      if (data) {
        this.activies.push(data);
        this.findCategories({ eventTitle: this.currentEvent.title });
        ElMessage({
          message: `Evènement ${data.title} bien créé`,
          type: 'success',
        });
      }
    },
    setCurrentEvent(event: any) {
      this.currentEvent = event;
    },
  },
});
