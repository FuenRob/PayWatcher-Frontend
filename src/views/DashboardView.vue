<script lang="ts">
import TitleComponent from '@/components/TitleComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardView',
  components: {
    TitleComponent
  }
})
</script>

<template>
  <main class="min-h-screen bg-gray-100 p-8">
    <div class="container mx-auto">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <TitleComponent title="Dashboard" class="text-4xl font-bold mb-8" />
        <p class="text-lg text-gray-700 mb-4">Welcome to the dashboard</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            to="/categories"
            class="bg-blue-500 text-white p-6 rounded-lg shadow-md block"
          >
            <h2 class="text-2xl font-semibold mb-2">Categorias</h2>
            <p class="text-sm">Puedes crear, ver o eliminar tus categorias.</p>
          </router-link>
          <router-link
            to="/payments"
            class="bg-green-500 text-white p-6 rounded-lg shadow-md block"
          >
            <h2 class="text-2xl font-semibold mb-2">Pagos</h2>
            <p class="text-sm">Puedes crear, ver o eliminar tus pagos.</p>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
