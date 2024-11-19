<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  // Simulate a check to see if the user is logged in
  const user = localStorage.getItem('token')
  isLoggedIn.value = !!user
})

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}

// Watch for changes in isLoggedIn to update the menu
watch(isLoggedIn, (newValue) => {
  console.log('User login status changed:', newValue)
})

const handleLogin = () => {
  isLoggedIn.value = true
}
</script>

<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container mx-auto px-4">
      <nav class="flex justify-end">
        <template v-if="isLoggedIn">
          <div class="flex-grow">
            <RouterLink to="/" class="text-lg font-semibold hover:text-gray-300 mr-8"
              >PayWatcher</RouterLink
            >
            <RouterLink to="/categories" class="text-lg font-semibold hover:text-gray-300 mr-4"
              >Categorias</RouterLink
            >
            <RouterLink to="/payments" class="text-lg font-semibold hover:text-gray-300 mr-4"
              >Pagos</RouterLink
            >
          </div>
          <a href="#" @click.prevent="logout" class="text-lg font-semibold hover:text-gray-300"
            >Cerrar sesión</a
          >
        </template>
        <template v-else>
          <div class="flex-grow">
            <RouterLink to="/login" class="text-lg font-semibold hover:text-gray-300 mr-8"
              >PayWatcher</RouterLink
            >
          </div>
          <RouterLink to="/login" class="text-lg font-semibold hover:text-gray-300 mr-4"
            >Entrar</RouterLink
          >
          <RouterLink to="/register" class="text-lg font-semibold hover:text-gray-300"
            >Registro</RouterLink
          >
        </template>
      </nav>
    </div>
  </header>

  <main class="w-full">
    <RouterView @login="handleLogin" />
  </main>
</template>
