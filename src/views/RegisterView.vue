/** functionality */
<script lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterView',
  components: {
    ButtonComponent,
    InputComponent,
    TitleComponent
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            username: username.value,
            password: password.value
          })
        })
        if (response.ok) {
          router.push('/login')
        } else {
          errorMessage.value = 'Invalid username or password'
        }
      } catch (error) {
        errorMessage.value = 'An error occurred'
      }
    }
    return {
      name,
      email,
      username,
      password,
      errorMessage,
      register
    }
  }
})
</script>

/** template */
<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <TitleComponent title="Register" class="text-4xl font-bold mb-8" />
    <form @submit.prevent="register" class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <InputComponent label="Nombre" id="name" name="name" v-model="name" class="mb-4" />
      <InputComponent
        label="Dirección de correo"
        id="email"
        name="email"
        v-model="email"
        class="mb-4"
      />
      <InputComponent
        label="Usuario"
        id="username"
        name="username"
        v-model="username"
        class="mb-4"
      />
      <InputComponent
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        v-model="password"
        class="mb-4"
      />
      <ButtonComponent
        label="Registro"
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      />
    </form>
    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
  </main>
</template>
