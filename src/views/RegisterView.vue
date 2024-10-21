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
  <main>
    <TitleComponent title="Register" />
    <form @submit.prevent="register">
      <InputComponent label="Nombre" id="name" name="name" v-model="name" />
      <InputComponent label="Dirección de correo" id="email" name="email" v-model="email" />
      <InputComponent label="Usuario" id="username" name="username" v-model="username" />
      <InputComponent
        label="Password"
        id="password"
        name="password"
        type="password"
        v-model="password"
      />
      <ButtonComponent label="register" type="submit" />
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </main>
</template>

/** Style */
