<template>
    <div class="attempt-quiz w-full mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col" >
        <div class="flex justify-between items-center ">
            <h1 class="text-2xl font-semibold text-gray-800 m-0">
                {{ currentQuestion?.question ?? "No question" }}
            </h1>

            <p class="text-sm text-gray-500 m-0">
                Score: {{ score }}
            </p>
        </div>
        <p class="text-sm text-gray-500 my-4">
            {{ currentIndex + 1 }} of {{ questions.length }}
        </p>

        <Timer v-if="isTimed" />

        <ul class="space-y-3">
            <li v-for="(option, index) in currentQuestion?.options" :key="index" @click="checkAnswer(index)" :class="[
                'p-3 bg-gray-50 hover:bg-indigo-100 w-full transition-colors rounded-lg border border-gray-200 hover:cursor-pointer',
                {
                    'border-green-600': previewResult && option.correct,
                    'border-red-600': previewResult && !option.correct
                }
            ]">
                {{ option.text }}
            </li>
        </ul>

    </div>
</template>


<script setup lang="ts">
import Timer from './Timer.vue';
import { useAttemptStore } from '@/stores/attemptStore';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
const attemptStore = useAttemptStore()
const { checkAnswer, nextQuestion } = attemptStore
const { score, currentQuestion, currentIndex, questions, previewResult } = storeToRefs(attemptStore)
const difficultyStore = useDifficultyStore()
const { remainingTime, isTimed } = storeToRefs(difficultyStore)


watch(remainingTime, () => {
    if (remainingTime.value === 0 && isTimed) {
        nextQuestion()
    }
})









</script>
