<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '',
      required: false
    }
  }
})
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :name="name" :value="value" required />
  </div>
</template>
