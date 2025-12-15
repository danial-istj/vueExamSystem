<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-90">
    <div class="rounded-md bg-gray-500 p-4">
      <h1 class="text-lg mb-4">
        Do you want to {{ action }}?
      </h1>
      <div class="flex gap-2">
        <button @click="cancel" class="bg-green-600 hover:bg-green-500 rounded text-white px-4 py-2">
          Cancel
        </button>
        <button @click="proceed" class="bg-red-600 hover:bg-red-500 rounded text-white px-4 py-2">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  action: string,
  proceed: () => void,
  cancel: () => void
}>()

const { proceed, cancel } = props
</script>
