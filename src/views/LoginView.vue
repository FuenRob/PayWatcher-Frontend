/** functionality */
<script lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  components: {
    ButtonComponent,
    InputComponent,
    TitleComponent
  },
  setup(_, { emit }) {
    const identity = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const login = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ identity: identity.value, password: password.value })
        })
        if (response.ok) {
          const res = await response.json()
          localStorage.setItem('token', res.data)
          emit('login') // Emit the login event
          router.push('/')
        } else {
          errorMessage.value = 'Invalid username or password'
        }
      } catch (error) {
        errorMessage.value = 'An error occurred'
      }
    }
    return {
      identity,
      password,
      errorMessage,
      login
    }
  }
})
</script>

/** template */
<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <TitleComponent title="Login" class="text-4xl font-bold mb-8" />
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <form @submit.prevent="login" class="space-y-6">
        <InputComponent label="Usuario o Email" id="identity" name="identity" v-model="identity" />
        <InputComponent
          label="Contraseña"
          id="password"
          name="password"
          type="password"
          v-model="password"
        />
        <ButtonComponent
          label="Entrar"
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        />
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
    </div>
  </main>
</template>

/** Style */
