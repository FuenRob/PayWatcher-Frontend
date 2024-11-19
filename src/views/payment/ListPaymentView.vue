// Scripts
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import TitleComponent from '@/components/TitleComponent.vue'

interface Payment {
  id: number
  name: string
  category_id: number
  net_amount: number
  gross_amount: number
  deductible: number
  charge_date: string
  recurrent: boolean
  payment_type: string
  paid: boolean
}

export default defineComponent({
  name: 'ListPaymentView',
  components: {
    TitleComponent
  },
  setup() {
    const listPayment = ref<Payment[]>([])

    const listPaymentFetch = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const res = await response.json()
          listPayment.value = res.data
          console.log(res)
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deletePayment = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:3000/api/payment/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          listPaymentFetch()
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error')
      }
    }

    onMounted(() => {
      listPaymentFetch()
      console.log('ListPaymentView Mounted')
    })

    return {
      listPayment,
      deletePayment
    }
  }
})
</script>
// template
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="container mx-auto">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <TitleComponent title="Listado de Pagos" class="text-4xl font-bold mb-8" />
        <div class="mb-4">
          <router-link
            to="/payments/create"
            class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          >
            Crear Pago
          </router-link>
        </div>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Total Neto
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Total Bruto
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Deducible
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Fecha de Cargo
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Recurrente
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tipo de Pago
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Pagado
              </th>
              <th
                class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in listPayment" :key="payment.id" class="border-t">
              <td class="py-2 px-4">{{ payment.name }}</td>
              <td class="py-2 px-4">{{ payment.category_id }}</td>
              <td class="py-2 px-4">{{ payment.net_amount }}</td>
              <td class="py-2 px-4">{{ payment.gross_amount }}</td>
              <td class="py-2 px-4">{{ payment.deductible }}</td>
              <td class="py-2 px-4">{{ payment.charge_date }}</td>
              <td class="py-2 px-4">{{ payment.recurrent }}</td>
              <td class="py-2 px-4">{{ payment.payment_type }}</td>
              <td class="py-2 px-4">{{ payment.paid }}</td>
              <td class="py-2 px-4">
                <router-link
                  :to="{ name: 'edit-payment', params: { id: payment.id } }"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Editar
                </router-link>
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 ml-2"
                  @click="deletePayment(payment.id)"
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
