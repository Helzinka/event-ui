import { defineStore } from 'pinia';

import { cloneDeep } from 'lodash';

import { ElMessage } from 'element-plus';

import * as Service from '@/service/parameter.service';

// todo: add user type && editinguser type
const parameterState = {
  users: [] as any,
  edit: false,
  editingUser: {} as any,
};

/** Parameter Store */
export const useUserManagerStore = defineStore('userManager', {
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
      // todo: check if user is really delete
      await Service.deleteUser(options);
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
        (item: any) => item.id === this.editingUser.id
      );
      this.users[indexUser] = userUpdated;
      this.edit = false;
      this.editingUser = {};
    },
    async createUser(option: any) {
      const data = await Service.createUser(option);
      if (data) {
        this.users.push(data);
        ElMessage({
          message: `Utilisateru ${data.title} a bien été créé`,
          type: 'success',
        });
      }
    },
    editUser(id: number) {
      this.edit = true;
      this.editingUser = cloneDeep(
        this.users.find((item: any) => item.id === id)
      );
    },
  },
});
