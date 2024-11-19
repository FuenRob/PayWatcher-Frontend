<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button'
    }
  }
})
</script>

<template>
  <button
    class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
    :type="type"
  >
    {{ label }}
  </button>
</template>
