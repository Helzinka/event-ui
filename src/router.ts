import ActivityView from '@/views/ActivityView.vue';
import EventView from '@/views/EventView.vue';
import EventsView from '@/views/EventsView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFound from '@/views/NotFoundView.vue';
import ParameterView from '@/views/ParameterView.vue';
import ReportingView from '@/views/ReportingView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from './store/login.store';

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
      meta: {
        breadCrumb: [
          {
            text: 'Evénements',
          },
        ],
      },
    },
    {
      path: '/event/:eventTitle/activities',
      name: 'acitiviesByEvent',
      component: EventView,
      meta: {
        test(route: any) {
          console.log('test', route);
          return ['test'];
        },
        breadCrumb(route: any) {
          const eventTitle = route.params.eventTitle;
          return [
            {
              text: 'Evénement',
              to: { name: 'events' },
            },
            {
              text: eventTitle,
            },
          ];
        },
      },
    },
    {
      path: '/event/:eventTitle/activity/:activityTitle',
      name: 'activityById',
      component: ActivityView,
      meta: {
        breadCrumb(route: any) {
          const eventTitle = route.params.eventTitle;
          const activityTitle = route.params.activityTitle;
          return [
            {
              text: 'Evénement',
              to: { name: 'events' },
            },
            {
              text: eventTitle,
              to: {
                name: 'acitiviesByEvent',
                params: {
                  eventTitle: eventTitle,
                },
              },
            },
            {
              text: activityTitle,
            },
          ];
        },
      },
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
    next('/events');
  } else next();
});

export default router;

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: async () => await import('@/views/AboutView.vue'),
