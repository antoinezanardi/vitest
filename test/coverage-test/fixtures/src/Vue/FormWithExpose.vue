<script setup lang="ts">
import { ref } from 'vue'

const form = ref<HTMLFormElement | null>(null)
const inputValue = ref('')

function onSubmit(): void {
  // eslint-disable-next-line no-console
  console.log('submitted', inputValue.value)
}

async function triggerFormSubmit(): Promise<void> {
  if (!form.value) {
    return
  }
  form.value.requestSubmit()
}

defineExpose({ triggerFormSubmit })
</script>

<template>
  <form ref="form" @submit.prevent="onSubmit">
    <input v-model="inputValue" />
    <button type="submit">
      Submit
    </button>
  </form>
</template>
