<template>
    <a-button type="primary" :danger="props.danger" :disabled="props.disabled"
        @click="props.action">{{ props.content }}</a-button>
</template>

<script setup lang="ts">
const props = defineProps < {
    danger: boolean,
    content: string,
    disabled: boolean,

    action: () =>  any

    } > ()



</script>