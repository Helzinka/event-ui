import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { ElMessage } from 'element-plus';

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
        ElMessage.success({
          message: `Bienvenue ${data.name}`,
          type: 'succes',
        });
        this.router.push({ name: 'reporting' });
      }
    },
  },
});
