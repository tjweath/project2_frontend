import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NewActivity from '@/components/NewActivity.vue'
import AllActivityView from '@/views/AllActivityView.vue'
import SingleActivityView from '../views/SingleActivityView.vue'
import ActivityEditView from '@/views/ActivityEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account/add',
      name: 'activity',
      component: NewActivity
    },
    {
      path: '/activity',
      name: 'activity',
      component: AllActivityView
    },
    {
      path: '/activity/:id',
      name: 'singleactivity',
      component: SingleActivityView
    },
    {
      path: '/activity/update/:id',
      name: 'editactivity',
      component: ActivityEditView
    },
  ]
})

export default router
