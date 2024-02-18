import { defineStore } from 'pinia';

import { ElNotification } from 'element-plus';

import type { User } from '@/interfaces/login.interface';

import * as client from '@/service/login.service';

const loginState = {
  isConnected: false,
  user: {} as User,
  error: {
    message: '',
  },
};

/** login Store */
export const useLoginStore = defineStore('login', {
  state: () => loginState,
  getters: {
    showName: state => {
      return state.user.name;
    },
    showIsConnected: state => {
      return state.isConnected;
    },
  },
  actions: {
    async connect(email: string, password: string) {
      const data = await client.connect(email, password);
      if (data.message) {
        this.error.message = data.message;
        this.isConnected = false;
      } else {
        this.user = data;
        this.isConnected = true;
        ElNotification({
          title: 'Connection',
          message: `Bienvenue ${data.name}`,
          type: 'success',
        });
        this.router.push({ name: 'reporting' });
      }
    },
    // ONLY DEV
    async autoConnect() {
      const email = import.meta.env.VITE_ADMIN_EMAIL;
      const password = import.meta.env.VITE_ADMIN_PASSWORD;
      const data = await client.connect(email, password);
      this.isConnected = true;
      this.user = data;
    },
  },
});
