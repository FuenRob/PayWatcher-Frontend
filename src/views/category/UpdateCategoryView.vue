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
    const name = ref('')
    const priority = ref(1)
    const recurrent = ref(true)
    const notify = ref(true)
    const statusMessage = ref('')

    const getCategoryById = async (id: string) => {
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
        const response = await fetch('http://localhost:3000/api/categories', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name: name.value,
            priority: priority.value,
            recurrent: recurrent.value,
            notify: notify.value
          })
        })
        if (response.ok) {
          const res = await response.json()
          statusMessage.value = 'Categoria editada con éxito'
          console.log(res)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error')
      }
    }

    onMounted(() => {
      const categoryId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
      getCategoryById(categoryId)
      console.log('Component is mounted')
    })

    return {
      name,
      priority,
      recurrent,
      notify,
      statusMessage,
      updateCategory
    }
  }
})
</script>

/** Template */
<template>
  <main>
    <TitleComponent title="Editar categoría" />
    <form @submit.prevent="updateCategory">
      <InputComponent label="name" id="name" name="name" v-model="name" />
      <InputComponent label="priority" id="priority" name="priority" v-model="priority" />
      <InputComponent label="recurrent" id="recurrent" name="recurrent" v-model="recurrent" />
      <InputComponent label="notify" id="notify" name="notify" v-model="notify" />
      <ButtonComponent label="Update" type="submit" />
    </form>
  </main>
</template>
