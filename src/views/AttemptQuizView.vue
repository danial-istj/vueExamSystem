<template>
    <div class="w-full flex gap-5 flex-col items-center">
        <button @click="restartQuiz"
            class="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors">
            Set Difficulty
        </button>

        <p class="text-sm text-gray-600 mt-2 mb-4">
            Note: Quiz will restart on resetting difficulty.
        </p>
    </div>

    <SetDifficulty v-if="!isDifficultySet" />
    <AttemptQuiz v-if="isDifficultySet && !showResults" />
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
const { setDifficulty, startTimer, stopTimer } = difficultyStore
const { isDifficultySet, isTimed } = storeToRefs(difficultyStore)

const attemptStore = useAttemptStore()
const { showResults, score } = storeToRefs(attemptStore)
const { resetQuiz } = attemptStore

function restartQuiz() {
    resetQuiz()
    setDifficulty()

    if (!isDifficultySet && isTimed.value) { startTimer() }
    else { stopTimer() }
}







</script>

<style></style>