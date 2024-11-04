import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateCategoryView from '@/views/category/CreateCategoryView.vue'
import UpdateCategoryView from '@/views/category/UpdateCategoryView.vue'
import ListCategoriesView from '@/views/category/ListCategoriesView.vue'
import ListPaymentView from '@/views/payment/ListPaymentView.vue'
import CreatePaymentView from '@/views/payment/CreatePaymentView.vue'
import UpdatePaymentView from '@/views/payment/UpdatePaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    // Categories
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: ListCategoriesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories/create',
      name: 'create-category',
      component: CreateCategoryView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories/:id/edit',
      name: 'edit-category',
      component: UpdateCategoryView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payments/',
      name: 'payments',
      component: ListPaymentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payments/create',
      name: 'create-payment',
      component: CreatePaymentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payments/:id/edit',
      name: 'edit-payment',
      component: UpdatePaymentView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
