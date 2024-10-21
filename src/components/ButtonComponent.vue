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
  <button :type="type">{{ label }}</button>
</template>
