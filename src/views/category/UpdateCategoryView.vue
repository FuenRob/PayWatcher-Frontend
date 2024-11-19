/** Scripts */
<script lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'UpdateCategoryView',
  components: {
    ButtonComponent,
    InputComponent,
    TitleComponent
  },
  setup() {
    const route = useRoute()
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const name = ref('')
    const priority = ref(1)
    const recurrent = ref(true)
    const notify = ref(true)
    const errorMessage = ref('')

    const getCategoryById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/category/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const res = await response.json()
          name.value = res.data.name
          priority.value = res.data.priority
          recurrent.value = res.data.recurrent
          notify.value = res.data.notify
          console.log(res)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updateCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/category/${id}`, {
          method: 'PUT',
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
          errorMessage.value = 'Categoria editada con éxito'
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error')
      }
    }

    onMounted(() => {
      getCategoryById()
      console.log('Component is mounted')
    })

    return {
      name,
      priority,
      recurrent,
      notify,
      errorMessage,
      updateCategory
    }
  }
})
</script>

/** Template */
<template>
  <main class="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <TitleComponent title="Actualizar categoria" class="text-4xl font-bold mb-8" />
      <form @submit.prevent="updateCategory" class="space-y-6">
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
          label="Update"
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        />
      </form>
      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
    </div>
  </main>
</template>
