import axios from 'axios';

import { instanceAxios } from '.';

export async function getEvent() {
  const data = await instanceAxios.post(
    'http://localhost:3000/api/event/find',
    {}
  );
  console.log(data);
  // return res;
}
