/** Scripts */
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import TitleComponent from '@/components/TitleComponent.vue'

// TODO: Migrate interface to global file?
interface Category {
  id: number
  user_id: number
  name: string
  priority: number
  recurrent: boolean
  notify: boolean
}

export default defineComponent({
  name: 'ListCategoriesView',
  components: {
    TitleComponent
  },
  setup() {
    const listCategories = ref<Category[]>([])
    const listCategoriesFetch = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const res = await response.json()
          listCategories.value = res.data
          console.log(res)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteCategory = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:3000/api/category/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          listCategoriesFetch()
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error')
      }
    }

    onMounted(() => {
      listCategoriesFetch()
      console.log('ListCategoriesView mounted')
    })

    return {
      listCategories,
      deleteCategory
    }
  }
})
</script>
/** Template */
<template>
  <main>
    <TitleComponent title="List Categories" />
    <router-link to="/categories/create">Create Category</router-link>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Recurrent</th>
            <th>Notify</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in listCategories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.priority }}</td>
            <td>{{ category.recurrent }}</td>
            <td>{{ category.notify }}</td>
            <td>
              <router-link :to="{ name: 'edit-category', params: { id: category.id } }">
                Edit
              </router-link>
              <button @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

/** Styles */
