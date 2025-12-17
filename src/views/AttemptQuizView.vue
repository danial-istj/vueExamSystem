<template>
    <div class=" flex flex-col justify-center items-center gap-6 p-6">
        <SetDifficulty v-if="!isDifficultySet" />

        <div v-if="isDifficultySet && !showResults" class="w-full flex gap-5 flex-col items-center">
            <button @click="restartQuiz"
                class="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors">
                Restart Quiz
            </button>
            <p class="text-sm text-gray-600 mt-2 mb-4">
                Note: Quiz will restart on leaving this page.
            </p>
            <AttemptQuiz />
        </div>

        <ShowResults v-if="showResults" :score="score" />
    </div>
</template>


<script setup lang="ts">

import SetDifficulty from '@/components/SetDifficulty.vue';
import AttemptQuiz from '@/components/AttemptQuiz.vue';
import ShowResults from '@/components/ShowResults.vue';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { useAttemptStore } from '@/stores/attemptStore';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router'


const difficultyStore = useDifficultyStore()
const { setDifficulty } = difficultyStore
const { isDifficultySet } = storeToRefs(difficultyStore)

const attemptStore = useAttemptStore()
const { showResults, score } = storeToRefs(attemptStore)
const { resetQuiz } = attemptStore

function restartQuiz() {
    resetQuiz()
    setDifficulty()
}

onBeforeRouteLeave(() => {
    resetQuiz()
    isDifficultySet.value = false
})

</script>

<style></style>