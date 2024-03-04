import { defineStore } from 'pinia';
import * as Service from '@/service/parameter.service';

const parameterState = {
  users: [] as any,
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
    async deleteUser(options: any) {
      const userDeleted = await Service.deleteUser(options);
      this.users = this.users.filter(
        (item: any) => item.id !== options.where.id
      );
    },
  },
});
