/** Scripts */
<script lang="ts">
import { defineComponent, ref } from 'vue'
import TitleComponent from '@/components/TitleComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateCategoryView',
  components: {
    TitleComponent,
    InputComponent,
    ButtonComponent
  },
  setup() {
    const name = ref('')
    const priority = ref(0)
    const recurrent = ref(false)
    const notify = ref(false)
    const errorMessage = ref('')
    const router = useRouter()

    const createCategory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name: name.value,
            priority: Number(priority.value),
            recurrent: Boolean(recurrent.value),
            notify: Boolean(notify.value)
          })
        })
        if (response.ok) {
          router.push('/categories')
        } else {
          errorMessage.value = 'Failed to create category'
        }
      } catch (error) {
        errorMessage.value = 'An error occurred'
      }
    }

    return {
      name,
      priority,
      recurrent,
      notify,
      errorMessage,
      createCategory
    }
  }
})
</script>

/** Template */
<template>
  <main class="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <TitleComponent title="Crear Categoria" class="text-4xl font-bold mb-8" />
      <form @submit.prevent="createCategory" class="space-y-6">
        <InputComponent label="Nombre" id="name" name="name" v-model="name" />
        <InputComponent
          label="Prioridad"
          id="priority"
          name="priority"
          type="number"
          v-model="priority"
        />
        <InputComponent
          label="¿Recurrente?"
          id="recurrent"
          name="recurrent"
          type="checkbox"
          v-model="recurrent"
        />
        <InputComponent
          label="¿Notificar?"
          id="notify"
          name="notify"
          type="checkbox"
          v-model="notify"
        />
        <ButtonComponent
          label="Crear"
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        />
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
    </div>
  </main>
</template>
