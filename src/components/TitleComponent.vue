<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleComponent',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <h1 class="text-3xl font-bold underline">{{ title }}</h1>
</template>
