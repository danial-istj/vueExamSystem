<template>
        <div class="difficulty w-full h-screen flex items-center justify-center ">
        <div class="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4 text-center">
            <h1 class="text-4xl font-bold mb-6 text-gray-800">Quiz Results</h1>


            <div class="mb-6">
                <p class="text-6xl font-bold text-blue-600">{{ attemptStore.score }}</p>
                <p class="text-xl text-gray-600 mt-2">out of {{ attemptStore.questions.length }}</p>
            </div>

            <div class="mb-8 bg-blue-100 rounded-lg p-4">
                <p class="text-3xl font-bold text-blue-600">{{ attemptStore.percentage }}%</p>
                <p class="text-gray-600">Your Score</p>
            </div>
            <button @click="restartQuiz"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-3 transition">
                Retake Quiz
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAttemptStore } from '@/stores/attemptStore';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useResultsStore } from '@/stores/resultsStore';
import { onMounted } from 'vue';

const difficultyStore = useDifficultyStore()
const attemptStore = useAttemptStore()
const resultsStore = useResultsStore()

function restartQuiz() {
    attemptStore.resetQuiz()
    difficultyStore.setDifficulty()
}
onMounted(() => {
    resultsStore.addResult({ id: Date.now(), marks: attemptStore.score, percentage: attemptStore.percentage, total: attemptStore.questions.length })
})


</script>
