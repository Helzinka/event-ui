import { defineStore } from 'pinia';
import type { ActivityResponse } from '@/interfaces/activity.interface';

const state = {
  currentActivity: {} as ActivityResponse,
  loading: false,
  error: '',
};

export const useActivityStore = defineStore('Activity', {
  state: () => state,
  getters: {},
  actions: {
    setCurrentActivity(activity: any) {
      this.currentActivity = activity;
    },
  },
});
