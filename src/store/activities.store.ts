import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as service from '@/service/activity.service';
import * as clientCategory from '@/service/category.service';
import type { CategoriesFindArg } from '@/interfaces/category.interfaces';
import type {
  ActivityDeleteArg,
  ActivityResponse,
} from '@/interfaces/activity.interface';
import type { EventResponse } from '@/interfaces/event.interface';

const state = {
  activies: [] as any[],
  categories: [] as string[],
  currentEvent: {} as EventResponse,
  currentActivity: {} as ActivityResponse,
  loading: false,
  error: '',
};

export const useActivitiesStore = defineStore('Activities', {
  state: () => state,
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
      const activies = await service.findActivities(option);
      this.activies = activies;
    },
    async findCategories(option: CategoriesFindArg) {
      const categories = await clientCategory.findCategories(option);
      if (categories.length)
        this.categories = categories.map(item => item.name);
    },
    async createActivity(option: any) {
      option.eventId = this.currentEvent.id;
      const data = await service.createActivity(option);
      if (data) {
        this.activies.push(data);
        this.findCategories({ eventTitle: this.currentEvent.title });
        ElMessage({
          message: `Evènement ${data.title} bien créé`,
          type: 'success',
        });
      }
    },
    async deleteActivity(option: ActivityDeleteArg) {
      const data = await service.deleteActivity(option);
      if (data) {
        this.activies = this.activies.filter(
          activity => activity.id !== data.id
        );
        ElMessage({
          message: `L'activitée ${data.title} a bien été supprimé`,
          type: 'success',
        });
      }
    },
    async updateActivity(option: any) {
      const data = await service.updateActivity(option);
      if (data) {
        this.activies = this.activies.map(activity =>
          activity.id === data.id ? data : activity
        );
        ElMessage({
          message: `L'activitée ${data.title} a bien été modifié`,
          type: 'success',
        });
      }
    },
    setCurrentEvent(event: any) {
      this.currentEvent = event;
    },
    setCurrentActivity(activity: any) {
      this.currentActivity = activity;
    },
  },
});
