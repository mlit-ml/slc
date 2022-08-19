import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { registerGuard } from './Guard'

const routerBase = import.meta.env.VITE_ROUTER_BASE

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/HomePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Scheduling',
    path: '/scheduling',
    component: () => import('../views/SchedulingPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Orders',
    path: '/scheduling/orders',
    component: () => import('../views/OrdersOverviewPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Routes',
    path: '/scheduling/routes',
    component: () => import('../views/RoutesPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Order',
    path: '/scheduling/orders/:orderId',
    component: () => import('../views/OrderPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'OrderSample',
    path: '/scheduling/orders/:orderId/samples/:sampleId',
    component: () => import('../views/SamplePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Sample',
    path: '/scheduling/samples/:sampleId',
    component: () => import('../views/SamplePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(routerBase),
  routes,
})

registerGuard(router)

export default router
