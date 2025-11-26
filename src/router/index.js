import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import CrearPostView from '../views/CrearPost.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/crear-post',
    name: 'CrearPost',
    component: CrearPostView,
    meta: { 
      requiresAuth: true 
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/crear-post')
  } else {
    next()
  }
})

export default router