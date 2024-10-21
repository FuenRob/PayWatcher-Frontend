<script lang="ts">
import TitleComponent from '@/components/TitleComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardView',
  components: {
    TitleComponent
  }
})
</script>

<template>
  <main>
    <TitleComponent title="Dashboard" />
    <p>Welcome to the dashboard</p>
  </main>
</template>
