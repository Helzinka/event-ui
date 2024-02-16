import { defineStore } from 'pinia';

/** Event Store */
export const useEventStore = defineStore('event', {
  state: () => ({
    count: 0,
  }),
  actions: {
    getEvents() {
      this.count++;
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
  },
});
