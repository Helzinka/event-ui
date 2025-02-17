import ActivityView from '@/views/ActivityView.vue';
import Activities from '@/views/ActivitiesView.vue';
import EventsView from '@/views/EventsView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFound from '@/views/NotFoundView.vue';
import ParameterView from '@/views/ParameterView.vue';
import ReportingView from '@/views/ReportingView.vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
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
      path: '/event/:eventId',
      name: 'acitiviesByEvent',
      component: Activities,
      meta: {
        breadCrumb(route: any) {
          const eventId = route.params.eventId;
          return [
            {
              text: 'Evénement',
              to: { name: 'events' },
            },
            {
              text: eventId,
            },
          ];
        },
      },
    },
    {
      path: '/event/:eventId/activity/:activityId',
      name: 'activityById',
      component: ActivityView,
      meta: {
        breadCrumb(route: any) {
          const eventId = route.params.eventId;
          const activityId = route.params.activityId;
          return [
            {
              text: 'Evénement',
              to: { name: 'events' },
            },
            {
              text: eventId,
              to: {
                name: 'acitiviesByEvent',
                params: {
                  eventId: eventId,
                },
              },
            },
            {
              text: activityId,
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
  const router = useRouter();
  const loginStore = useLoginStore();
  if (!loginStore.showIsConnected) {
    await loginStore.autoConnect();
    router.push({
      name: 'events',
    });
    next();
  } else next();
});

export default router;

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: async () => await import('@/views/AboutView.vue'),
