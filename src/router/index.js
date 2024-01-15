import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AccountView from '@/views/AccountView.vue'
import NewActivity from '@/components/NewActivity.vue'
import SingleActivityView from '../views/SingleActivityView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/account/add',
      name: 'activity',
      component: NewActivity
    },
    {
      path: '/activity/:id',
      name: 'singleactivity',
      component: SingleActivityView
    },
  ]
})

export default router
