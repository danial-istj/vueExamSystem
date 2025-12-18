<template>
        <div class="border border-gray-500  
         w-[800px] p-4 rounded-lg  min-h-48 bg-white justify-center items-center ">

        <div class="w-full mx-auto p-6 bg-white shadow-lg gap-7 rounded-xl border border-gray-100 flex flex-col items-center">
            <h1 class="text-4xl font-bold m-0 text-gray-800">Quiz Results</h1>
            <div class="flex flex-col justify-center items-center gap-0 p-2">
                <p class="text-6xl font-bold m-0 text-blue-600">{{ attemptStore.score }}</p>
                <p class="text-xl text-gray-600 m-0">out of {{ attemptStore.questions.length }}</p>
            </div>
            <div class=" bg-blue-100 rounded-lg p-2 flex flex-col justify-center items-center">
                <p class="text-3xl font-bold m-0 text-blue-600">{{ attemptStore.percentage }}%</p>
                <p class="text-gray-600 m-0">Your Score</p>
            </div>
            <Button content="Retake Quiz" :disabled="false" :danger="false" :action="restartQuiz" class="mx-auto" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAttemptStore } from '@/stores/attemptStore';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useResultsStore } from '@/stores/resultsStore';
import { onMounted } from 'vue';
import Button from './Button.vue';


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
