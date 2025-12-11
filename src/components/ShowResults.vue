<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
            <button @click="attemptStore.resetQuiz"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-3 transition">
                Retake Quiz
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAttemptStore } from '@/stores/attemptStore';

const attemptStore = useAttemptStore()

</script>
