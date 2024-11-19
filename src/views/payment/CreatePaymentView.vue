// Scripts
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
export default defineComponent({
  name: 'CreatePaymentView',
  components: {
    TitleComponent,
    InputComponent,
    ButtonComponent
  },
  setup() {
    const name = ref('')
    const category_id = ref(0)
    const net_amount = ref(0)
    const gross_amount = ref(0)
    const deductible = ref(0)
    const charge_date = ref('')
    const recurrent = ref(true)
    const payment_type = ref('')
    const paid = ref(true)
    const errorMessage = ref('')

    const createPayment = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            name: name.value,
            category_id: Number(category_id.value),
            net_amount: Number(net_amount.value),
            gross_amount: Number(gross_amount.value),
            deductible: Number(deductible.value),
            charge_date: charge_date.value,
            recurrent: Boolean(recurrent.value),
            payment_type: payment_type.value,
            paid: Boolean(paid.value)
          })
        })
        if (response.ok) {
          const res = await response.json()
          errorMessage.value = 'Categoria creada con éxito'
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
      category_id,
      net_amount,
      gross_amount,
      deductible,
      charge_date,
      recurrent,
      payment_type,
      paid,
      errorMessage,
      createPayment
    }
  }
})
</script>

// Template
<template>
  <main class="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <TitleComponent title="Crear Pago" class="text-4xl font-bold mb-8" />
      <form @submit.prevent="createPayment" class="space-y-6">
        <InputComponent label="Nombre" id="name" name="name" v-model="name" />
        <!-- TODO: Create component Select -->
        <InputComponent
          label="Categoria"
          id="category_id"
          name="category_id"
          type="number"
          v-model="category_id"
        />
        <InputComponent label="Total Neto" id="net_amount" name="net_amount" v-model="net_amount" />
        <InputComponent
          label="Total Bruto"
          id="gross_amount"
          name="gross_amount"
          v-model="gross_amount"
        />
        <InputComponent label="Deducible" id="deductible" name="deductible" v-model="deductible" />
        <InputComponent
          label="Fecha del cargo"
          id="charge_date"
          name="charge_date"
          v-model="charge_date"
        />
        <InputComponent
          label="¿Recurrente?"
          id="recurrent"
          name="recurrent"
          type="checkbox"
          v-model="recurrent"
        />
        <InputComponent
          label="Tipo de Pago"
          id="payment_type"
          name="payment_type"
          v-model="payment_type"
        />
        <InputComponent label="¿Pagado?" id="paid" name="paid" type="checkbox" v-model="paid" />
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
