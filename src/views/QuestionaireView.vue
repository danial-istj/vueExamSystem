<template>
    <div class=" flex flex-col justify-center items-center gap-10">
        <CurrentQuestion />
        <AddedQuestions/>
    </div>
</template>

<script setup lang="ts">
import CurrentQuestion from '@/components/CurrentQuestion.vue';
import AddedQuestions from '@/components/AddedQuestions.vue';
</script>

<style></style>