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

    const deletePayment = async (id: String) => {
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
  <main>
    <TitleComponent title="Listado de Pagos" />
    <router-link to="/payment/create" class="btn btn-primary">Crear Pago</router-link>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Monto Neto</th>
            <th>Monto Bruto</th>
            <th>Deducible</th>
            <th>Fecha de Cargo</th>
            <th>Recurrente</th>
            <th>Tipo de Pago</th>
            <th>Pagado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in listPayment" :key="payment.id">
            <td>{{ payment.name }}</td>
            <td>{{ payment.category_id }}</td>
            <td>{{ payment.net_amount }}</td>
            <td>{{ payment.gross_amount }}</td>
            <td>{{ payment.deductible }}</td>
            <td>{{ payment.charge_date }}</td>
            <td>{{ payment.recurrent }}</td>
            <td>{{ payment.payment_type }}</td>
            <td>{{ payment.paid }}</td>
            <td>
              <router-link :to="'/payment/edit/' + payment.id">Editar</router-link>
              <button @click="deletePayment(payment.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
