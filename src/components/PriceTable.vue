<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const test = 'Test'
    return {
      test
    }
  }
})
</script>

<template>
  <h1>Price Edit {{ test }}</h1>
</template>
