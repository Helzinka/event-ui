import { useLoginStore } from '@/store/login.store';

import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL;

// [Base axios config]
export const instanceAxios = axios.create({
  baseURL: serverURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: 'Bearer ',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
// todo: add token type
// [Middleware interceptor]
instanceAxios.interceptors.request.use(config => {
  const loginStore = useLoginStore();
  config.headers.Authorization = `Bearer ${loginStore.user.token}`;
  return config;
});
