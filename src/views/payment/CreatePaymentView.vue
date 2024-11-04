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
    const statusMessage = ref('')

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
      category_id,
      net_amount,
      gross_amount,
      deductible,
      charge_date,
      recurrent,
      payment_type,
      paid,
      statusMessage,
      createPayment
    }
  }
})
</script>

// Template
<template>
  <main>
    <TitleComponent title="Create Payment" />
    <form @submit.prevent="createPayment">
      <InputComponent label="Name" id="name" name="name" v-model="name" />
      <!-- TODO: Create component Select -->
      <InputComponent
        label="Category ID"
        id="category_id"
        name="category_id"
        type="number"
        v-model="category_id"
      />
      <InputComponent label="Net Amount" id="net_amount" name="net_amount" v-model="net_amount" />
      <InputComponent
        label="Gross Amount"
        id="gross_amount"
        name="gross_amount"
        v-model="gross_amount"
      />
      <InputComponent label="Deductible" id="deductible" name="deductible" v-model="deductible" />
      <InputComponent
        label="Charge Date"
        id="charge_date"
        name="charge_date"
        v-model="charge_date"
      />
      <InputComponent
        label="Recurrent"
        id="recurrent"
        name="recurrent"
        type="checkbox"
        v-model="recurrent"
      />
      <!-- TODO: Create component Select -->
      <InputComponent
        label="Payment Type"
        id="payment_type"
        name="payment_type"
        v-model="payment_type"
      />
      <InputComponent label="Paid" id="paid" name="paid" type="checkbox" v-model="paid" />
      <ButtonComponent label="Create Payment" type="submit" />
    </form>
  </main>
</template>
