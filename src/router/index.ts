import { createRouter, createWebHistory } from 'vue-router'
import TheOrder from '@/views/TheOrder.vue'

import routes from '@/router/routes';

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: TheOrder
    },
    /*{
      path: routes.news.path,
      name: routes.news.name,
      component: () => import('../views/TheNews.vue')
    },
    {
      path: routes.newOrders.path,
      name: routes.newOrders.name,
      component: () => import('../views/NewOrders.vue')
    },
    {
      path: routes.admin.path,
      name: routes.admin.name,
      component: () => import('../views/TheAdmin.vue')
    }*/
  ]
})

export default router
