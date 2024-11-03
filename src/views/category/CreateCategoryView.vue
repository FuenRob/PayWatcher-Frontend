/** Scripts */
<script lang="ts">
import { defineComponent, ref } from 'vue'
import TitleComponent from '@/components/TitleComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

export default defineComponent({
  name: 'CreateCategoryView',
  components: {
    TitleComponent,
    InputComponent,
    ButtonComponent
  },
  setup() {
    const name = ref('')
    const priority = ref(1)
    const recurrent = ref(true)
    const notify = ref(true)
    const statusMessage = ref('')

    const createCategory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category', {
          method: 'POST',
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
          statusMessage.value = 'Categoria creada con éxito'
          console.log(res)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log(error)
      }
    }
    return {
      name,
      priority,
      recurrent,
      notify,
      statusMessage,
      createCategory
    }
  }
})
</script>

/** Template */
<template>
  <main>
    <TitleComponent title="Create Category" />
    <form @submit.prevent="createCategory">
      <InputComponent label="Name" id="name" name="name" v-model="name" />
      <InputComponent label="Priority" id="priority" name="priority" v-model="priority" />
      <InputComponent
        label="Recurrent"
        id="recurrent"
        name="recurrent"
        type="checkbox"
        v-model="recurrent"
      />
      <InputComponent label="Notify" id="notify" name="notify" type="checkbox" v-model="notify" />
      <ButtonComponent label="Create" type="submit" />
    </form>
    <p>{{ statusMessage }}</p>
  </main>
</template>

/** Styles */
