<template>
  <a-modal :open="showModal" :title="`${action} Confirmation`" @ok="handleProceed" @cancel="handleCancel">
    <p class="py-2">Do you want to {{ action }}?</p>
  </a-modal>
</template>

<script setup lang="ts">
const { action, showModal, proceed, cancel } = defineProps<{
  action: string,
  showModal: boolean,
  proceed?: () => void,
  cancel?: () => void
}>()

const emit = defineEmits(['update:showModal'])

function handleProceed() {
  proceed && proceed()
  emit('update:showModal', false)
}

function handleCancel() {
  cancel && cancel()
  emit('update:showModal', false)
}
</script>
