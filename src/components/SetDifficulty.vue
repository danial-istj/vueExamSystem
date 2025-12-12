<template>
        <div class="difficulty w-full h-screen flex items-center justify-center ">
        <div class=" bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
            <h2 class="text-2xl font-bold mb-6">Select No. of Questions:</h2>
            <input type="number" v-model="noOfQuestions" class="w-full border-2 border-gray-300 rounded p-2 mb-6">

            <p v-if="invalidNoOfQuestions" class="text-xs pl-1">Insufficient questions have been provided.</p>

            <div class="select-if-random mb-6 flex justify-evenly gap-2">
                <h2>Recently Added</h2>
                <ToggleButton @toggle="toggleRandomed" :is-on="isRandom" />
                <h2>Random Questions</h2>
            </div>

            <div class="select-if-timed mb-6 flex justify-evenly gap-2">
                <h2>No Timer</h2>
                <ToggleButton @toggle="toggleTimed" :is-on="isTimed" />
                <h2>Add Timer</h2>
            </div>

            <button @click="setDifficulty"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" :disabled="invalidNoOfQuestions">Set
                Difficulty</button>
        </div>
        </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ToggleButton from './ToggleButton.vue';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useQuestionsStore } from '@/stores/questionsStore';
import { computed, ref } from 'vue';

const difficultyStore = useDifficultyStore()
const { noOfQuestions, isRandom, isTimed } = storeToRefs(difficultyStore)
const { toggleRandomed, toggleTimed, setDifficulty } = difficultyStore
const questionsStore = useQuestionsStore()
const invalidNoOfQuestions = computed<boolean>(() => {
    if (noOfQuestions.value > questionsStore.questions.length) {
        return true
    }
    return false
})




</script>

<style></style>