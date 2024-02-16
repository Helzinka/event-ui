import { createRouter, createWebHistory } from 'vue-router';

import EventView from '@/views/EventView.vue';
import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFoundView.vue';
import ParameterView from '@/views/ParameterView.vue';
import ReportingView from '@/views/ReportingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reporting',
      name: 'reporting',
      component: ReportingView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventView,
    },
    {
      path: '/parameter',
      name: 'parameter',
      component: ParameterView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: async () => await import('@/views/AboutView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export default router;
