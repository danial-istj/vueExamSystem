<template>
    <div class=" flex flex-col my-0 gap-0">
        <!-- <p v-if="props.lessOptions && props.showValidation" class="text-xs border border-black">There must be atleast 4
            options.</p> -->
        <p v-if="props.noCorrectSelected && props.showValidation" class="text-xs pt-2">One Option must be
            Correct</p>
        <!-- <p v-if="props.moreOptions && props.showValidation" class="text-xs border border-black">There can be maximum 6
            options.</p> -->
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    showValidation: boolean, noCorrectSelected: boolean, lessOptions: boolean, moreOptions: boolean
}>()

</script>