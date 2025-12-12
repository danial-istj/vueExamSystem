<template>
    <div class="flex flex-col items-center gap-8 py-10">

        <div class="text-center">
            <h1 class="text-3xl font-bold text-indigo-600">Quiz App</h1>
            <p class="text-gray-600 mt-2">Build. Play. Improve.</p>
        </div>

        <div class="flex flex-col gap-4 w-full max-w-sm">
            <RouterLink to="/questionaire"
                class="w-full p-4 bg-blue-600 text-white text-center rounded-lg shadow hover:bg-blue-700 transition">
                Create Questions
            </RouterLink>

            <RouterLink to="/attemptquiz"
                class="w-full p-4 bg-green-600 text-white text-center rounded-lg shadow hover:bg-green-700 transition">
                Attempt Quiz
            </RouterLink>

            <RouterLink to="/results"
                class="w-full p-4 bg-gray-600 text-white text-center rounded-lg shadow hover:bg-gray-700 transition">
                View Results
            </RouterLink>
        </div>

        <div v-if="highestScore" class="text-sm text-gray-700 mt-4 p-3 bg-gray-100 rounded-lg shadow-sm">
            <p class="font-semibold">High Score</p>
            <p>Marks: <span class="font-medium">{{ highestScore.marks }}/{{ highestScore.total }}</span></p>
            <p>Percentage: <span class="text-blue-600 font-medium">{{ highestScore.percentage }}%</span></p>
            <p>Time: <span class="font-medium">{{ formatDate.formattedTime(highestScore.id) }}</span></p>
            <p>Date: <span class="font-medium">{{ formatDate.formattedDate(highestScore.id) }}</span></p>
        </div>


    </div>
</template>

<script setup>
import { useResultsStore } from "@/stores/resultsStore";
import { useFormatedDate } from "@/composables/formatDateLogic";

const formatDate = useFormatedDate()
const resultsStore = useResultsStore()
const { highestScore } = resultsStore
</script>



<style></style>