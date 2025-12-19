<template>
    <div class="grid p-6">
        <div class="border p-6 border-gray-500 grid flex-col  w-[800px] gap-4 rounded-lg  
    min-h-48 bg-white">
            <div class="text-center grid gap-2">
                <h1 class="text-3xl font-semibold m-0 text-gray-800">Quiz App</h1>
                <p class="text-gray-500 m-0 text-sm">Create quizzes. Attempt tests. Track progress.</p>
            </div>

            <div class="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">

                <RouterLink to="/questionaire"
                    class="group flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition">
                    <span class="text-gray-800 font-medium">Create Questions</span>
                    <span class="text-gray-400 hover:text-gray-600 transition"><RightOutlined/></span>
                </RouterLink>

                <RouterLink to="/attemptquiz"
                    class="group flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition">
                    <span class="text-gray-800 font-medium">Attempt Quiz</span>
                    <span class="text-gray-400 hover:text-gray-600 transition"><RightOutlined/></span>
                </RouterLink>

                <RouterLink to="/results"
                    class="group flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition">
                    <span class="text-gray-800 font-medium">View Results</span>
                    <span class="text-gray-400 hover:text-gray-600 transition"><RightOutlined/></span>
                </RouterLink>

            </div>

            <div v-if="highestScore" class="border border-gray-200 rounded-lg bg-gray-50 p-5 max-w-md mx-auto w-full">
                <p class="text-xs uppercase  text-gray-500 mb-3">Best Performance</p>

                <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                    <span class="text-gray-500">Marks</span>
                    <span class="font-medium text-right">
                        {{ highestScore.marks }}/{{ highestScore.total }}
                    </span>

                    <span class="text-gray-500">Percentage</span>
                    <span class="font-medium text-right">
                        {{ highestScore.percentage }}%
                    </span>

                    <span class="text-gray-500">Time</span>
                    <span class="font-medium text-right">
                        {{ formatDate.formattedTime(highestScore.id) }}
                    </span>

                    <span class="text-gray-500">Date</span>
                    <span class="font-medium text-right">
                        {{ formatDate.formattedDate(highestScore.id) }}
                    </span>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useResultsStore } from "@/stores/resultsStore";
import { useFormatedDate } from "@/composables/formatDateLogic";
import { RightOutlined } from "@ant-design/icons-vue";

const formatDate = useFormatedDate()
const resultsStore = useResultsStore()
const { highestScore } = resultsStore
</script>



<style></style>