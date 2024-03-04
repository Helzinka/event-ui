import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';
import * as Service from '@/service/parameter.service';

const parameterState = {
  users: [] as any,
  edit: false,
  editingUser: {},
};

/** Parameter Store */
export const useParameterStore = defineStore('parameter', {
  state: () => parameterState,
  getters: {
    getColumns: state => {
      if (state.users.length)
        // filter createdAt in backend better ?
        return Object.keys(state.users[0]).filter(
          item => item !== 'createdAt' && item !== 'updatedAt'
        );
    },
  },
  actions: {
    async findUsers(options: any) {
      this.users = await Service.findUsers(options);
    },
    async deleteUser(options: any) {
      // check if it's status ok
      const userDeleted = await Service.deleteUser(options);
      this.users = this.users.filter(
        (item: any) => item.id !== options.where.id
      );
    },
    async saveUser() {
      const { id, ...nextUser } = this.editingUser;
      const userUpdated = await Service.updateUser({
        where: { id },
        data: { ...nextUser },
      });
      // check if it true
      const indexUser = this.users.findIndex(
        (item: any) => item.id == this.editingUser.id
      );
      this.users[indexUser] = userUpdated;
      this.edit = false;
      this.editingUser = {};
    },
    editUser(id: number) {
      this.edit = true;
      this.editingUser = cloneDeep(
        this.users.find((item: any) => item.id == id)
      );
    },
  },
});
