import type { ActivityResponse } from '@/interfaces/activity.interface';
import type { EventResponse } from '@/interfaces/event.interface';
import { defineStore } from 'pinia';

const state = {
  event: {} as EventResponse,
  activity: {} as ActivityResponse,
};

export const useSelectorStore = defineStore('Selector', {
  state: () => state,
  getters: {
    currentEvent: state => state.event,
    currentActivity: state => state.activity,
  },
  actions: {
    setCurrentEvent(event: any) {
      this.event = event;
    },
    setCurrentActivity(activity: any) {
      this.activity = activity;
    },
  },
});
