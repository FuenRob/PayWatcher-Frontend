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
      type: [String, Number, Boolean],
      default: '',
      required: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
    },
    onCheckboxChange(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).checked)
    }
  }
})
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="block text-lg font-medium text-gray-700 mb-2">{{ label }}</label>
    <template v-if="type === 'checkbox'">
      <input
        class="w-6 h-6"
        :type="type"
        :id="id"
        :name="name"
        :checked="Boolean(modelValue)"
        @input="onCheckboxChange"
      />
    </template>
    <template v-else>
      <input
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        :type="type"
        :id="id"
        :name="name"
        :value="modelValue"
        @input="onInput"
        required
      />
    </template>
  </div>
</template>

<style scoped>
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  accent-color: #46e563;
  border-radius: 4px;
  border: 2px solid #d1d5db;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

input[type='checkbox']:checked {
  background-color: #46e563;
  border-color: #46e563;
}

input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(104, 241, 99, 0.5);
}
</style>
