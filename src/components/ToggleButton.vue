<template>
  <a-switch v-model:checked="props.isOn" @click="onToggle" />
</template>
<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'toggle'): void
}>()
const props = defineProps<{
  isOn: boolean
}>()
function onToggle() {
  emits("toggle")
}
</script>
