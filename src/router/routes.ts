import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { RouteRecordRaw } from 'vue-router';

const authGuard = (to, from, next) => {
  const store = useAuthStore();
  if (localStorage.getItem('token')) {
    api.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    api.get('auth/profile').then((res) => {
      if (res.data?.email) {
        store.$patch({
          authInfo: res.data,
        });
        next();
      } else {
        next('/signin');
      }
    });
  } else {
    next('/signin');
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/signin',
    component: () => import('src/pages/login/SignInPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('src/pages/login/SignUpPage.vue'),
  },
  {
    path: '/tasks/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TaskPage.vue') }],
    beforeEnter: authGuard,
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserPage.vue') }],
    beforeEnter: authGuard,
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    beforeEnter: authGuard,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
