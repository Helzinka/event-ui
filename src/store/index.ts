import { createPinia, type Pinia } from 'pinia';
import { markRaw } from 'vue';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Pinia Stores
import router from '@/router';
import { useActivityStore } from '@/store/activity.store';
import { useEventStore } from '@/store/event.store';
import { useLoginStore } from '@/store/login.store';
import { useReportingStore } from '@/store/reporting.store';

/** Pinia Store */
const pinia: Pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);

export default pinia;

export { useEventStore, useReportingStore, useLoginStore, useActivityStore };
