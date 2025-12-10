<template>
    <p v-if="props.noCorrectSelected && props.showValidation" class="text-xs pl-1">One Option must be
        Correct</p>
    <p v-if="props.lessOptions && props.showValidation" class="text-xs pl-1">There must be atleast 4
        options.</p>
    <p v-if="props.moreOptions && props.showValidation" class="text-xs pl-1">There can be maximum 6
        options.</p>
</template>

<script setup lang="ts">

const props = defineProps<{
    showValidation: boolean, noCorrectSelected: boolean, lessOptions: boolean, moreOptions: boolean
}>()

</script>