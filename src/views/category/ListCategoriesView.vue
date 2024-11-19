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
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="container mx-auto">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <TitleComponent title="Categorias" class="text-4xl font-bold mb-8" />
        <div class="mb-4">
          <router-link
            to="/categories/create"
            class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          >
            Crear categoria
          </router-link>
        </div>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Prioridad
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Recurrente
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Notificar
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in listCategories" :key="category.id" class="border-t">
              <td class="py-2 px-4">{{ category.id }}</td>
              <td class="py-2 px-4">{{ category.name }}</td>
              <td class="py-2 px-4">{{ category.priority }}</td>
              <td class="py-2 px-4">{{ category.recurrent }}</td>
              <td class="py-2 px-4">{{ category.notify }}</td>
              <td class="py-2 px-4">
                <router-link
                  :to="{ name: 'edit-category', params: { id: category.id } }"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Editar
                </router-link>
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 ml-2"
                  @click="deleteCategory(category.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
