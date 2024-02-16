import axios from 'axios';

const serverURL = process.env.VITE_SERVER_URL;

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
