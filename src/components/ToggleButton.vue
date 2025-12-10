<template>
    <div @click="emits('toggle')" :class="{
        'relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out': true, 'bg-blue-500': props.isOn, 'bg-gray-300': !props.isOn
    }">

        <div :class="{
            'absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out': true,
            'translate-x-6': props.isOn, 'translate-x-0.5': !props.isOn
        }"></div>

    </div>
</template>



<script setup lang="ts">
const emits = defineEmits<{
    (e: 'toggle'): void
}>()

const props = defineProps<{
    isOn: boolean
}>()
</script>