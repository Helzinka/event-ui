import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import type { User } from '@/interfaces/login.interface';
import * as service from '@/service/login.service';

const state = {
  isConnected: false,
  user: {} as User,
  error: {
    message: '',
  },
};

export const useLoginStore = defineStore('Login', {
  state: () => state,
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
      const router = useRouter();
      const data = await service.connect(email, password);
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
        await router.push({ name: 'reporting' });
      }
    },
    // ONLY DEV
    async autoConnect() {
      const email = import.meta.env.VITE_ADMIN_EMAIL;
      const password = import.meta.env.VITE_ADMIN_PASSWORD;
      const data = await service.connect(email, password);
      this.isConnected = true;
      this.user = data;
    },
  },
});
