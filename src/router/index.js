import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {AuthStore} from '@/stores/auth.js';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },

  ]
})

//será executado antes de cada rota, para verificar o retorno do endpoint de validação de token
router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const auth = AuthStore();
    if (auth.token) {
      const isAuthenticated = await auth.checkToken();
      console.log('retorno do endpoint /api/auth/verify', isAuthenticated);
      if (isAuthenticated) {
        next();
      } else {
        next({
          name: 'login'
        });
      }
    }
    else {
      next({
        name: 'login'
      });
    }
    console.log(to.name);
  }
  else {
    next();
  }
});

export default router
