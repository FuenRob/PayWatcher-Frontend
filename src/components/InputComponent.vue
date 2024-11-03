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
    modelValue: {
      type: String,
      default: '',
      required: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
})
</script>

<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
      class="form-control mb-3 mt-1 border border-2 border-primary"
      :type="type"
      :id="id"
      :name="name"
      :value="modelValue"
      @input="onInput"
      required
    />
  </div>
</template>
