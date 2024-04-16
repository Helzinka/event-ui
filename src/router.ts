import { createRouter, createWebHistory } from 'vue-router';

import { useLoginStore } from './store/login.store';

import ActivityView from '@/views/ActivityView.vue';
import EventView from '@/views/EventView.vue';
import EventsView from '@/views/EventsView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFound from '@/views/NotFoundView.vue';
import ParameterView from '@/views/ParameterView.vue';
import ReportingView from '@/views/ReportingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/reporting',
      name: 'reporting',
      component: ReportingView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/event/:eventId/',
      name: 'eventByid',
      component: EventView,
    },
    {
      path: '/event/:eventId/activty/:activityId',
      name: 'activityById',
      component: ActivityView,
    },
    {
      path: '/parameter',
      name: 'parameter',
      component: ParameterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

// route guard global
// to force a specifque path
router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore();
  if (!loginStore.showIsConnected) {
    await loginStore.autoConnect();
    next('/parameter');
  } else next();
});

export default router;

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: async () => await import('@/views/AboutView.vue'),
