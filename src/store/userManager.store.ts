import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';
import { ElMessage } from 'element-plus';
import * as service from '@/service/parameter.service';

// todo: add user type && editinguser type
const parameterState = {
  users: [] as any,
  edit: false,
  editingUser: {} as any,
};

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
    async findUsers() {
      this.users = await service.findUsers({ role: ['MANAGER', 'ADMIN'] });
    },
    async deleteUser(options: any) {
      // todo: check if user is really delete
      const data = await service.deleteUser(options);
      if (data)
        this.users = this.users.filter((item: any) => item.id !== data.id);
    },
    async saveUser() {
      const userUpdated = await service.updateUser(this.editingUser);
      if (userUpdated) {
        const indexUser = this.users.findIndex(
          (item: any) => item.id === userUpdated.id
        );
        if (indexUser !== -1) {
          this.users.splice(indexUser, 1, userUpdated);
        }
      }
      this.edit = false;
      this.editingUser = {};
    },
    async createManager(option: any) {
      const data = await service.createManager(option);
      if (data) {
        this.users.push(data);
        ElMessage({
          message: `Utilisateur ${data.name} a bien été créé`,
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
