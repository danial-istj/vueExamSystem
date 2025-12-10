<template>
    <button @click="setDifficulty">Set Difficulty</button>
    <p>Note:Quiz will restart on resetting difficulty.</p>
    <SetDifficulty v-if="!isDifficultySet" />
    <AttemptQuiz v-else />
    <ShowResults v-if="showResults" :score="score" />






</template>

<script setup lang="ts">
import SetDifficulty from '@/components/SetDifficulty.vue';
import AttemptQuiz from '@/components/AttemptQuiz.vue';
import ShowResults from '@/components/ShowResults.vue';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useAttemptStore } from '@/stores/attemptStore';
import { storeToRefs } from 'pinia';

const difficultyStore = useDifficultyStore()
const { setDifficulty } = difficultyStore
const { isDifficultySet } = storeToRefs(difficultyStore)
const attemptStore = useAttemptStore()
const { showResults, score } = attemptStore







</script>

<style></style>