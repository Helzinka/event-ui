import { defineStore } from 'pinia';
import * as Service from '@/service/parameter.service';

const parameterState = {
  users: [],
};

/** Parameter Store */
export const useParameterStore = defineStore('parameter', {
  state: () => parameterState,
  getters: {
    getColumns: state => {
      if (state.users.length) return Object.keys(state.users[0]);
    },
  },
  actions: {
    async findUsers(options: any) {
      this.users = await Service.findUsers(options);
    },
  },
});
