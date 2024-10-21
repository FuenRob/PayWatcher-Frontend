/** functionality */
<script lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  components: {
    ButtonComponent,
    InputComponent
  },
  setup() {
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
  <main>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <InputComponent label="Username or Email" id="identity" name="identity" v-model="identity" />
      <InputComponent
        label="Password"
        id="password"
        name="password"
        type="password"
        v-model="password"
      />
      <ButtonComponent label="Login" type="submit" />
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </main>
</template>

/** Style */
