<template>
    <div class="current-question border border-gray-500  w-[800px]  rounded-lg  bg-white flex justify-center items-center h-[500px]">
        <div class=" max-w-md w-full flex flex-col justify-center gap-6 ">
            <h2 class="text-2xl font-bold m-0 ">Select No. of Questions:</h2>
            <input type="number" v-model="noOfQuestions" class="w-full border-2 border-gray-300 rounded p-2 ">

            <p v-if="invalidNoOfQuestions" class="text-xs">Insufficient questions have been provided.</p>

            <div class="select-if-random  flex justify-evenly gap-2">
                <h2>Recently Added</h2>
                <ToggleButton @toggle="toggleRandomed" :is-on="isRandom" />
                <h2>Random Questions</h2>
            </div>

            <div class="select-if-timed flex justify-evenly gap-2">
                <h2>No Timer</h2>
                <ToggleButton @toggle="toggleTimed" :is-on="isTimed" />
                <h2>Add Timer</h2>
            </div>

            
                <Button content="Set Difficulty" :action="setDifficulty" :danger="false" :disabled="invalidNoOfQuestions" class="mx-auto"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ToggleButton from './ToggleButton.vue';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useQuestionsStore } from '@/stores/questionsStore';
import { computed, ref } from 'vue';
import Button from './Button.vue';

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