<template>
    <div class=" flex flex-col justify-center items-center gap-6 p-6">
        <SetDifficulty v-if="!isDifficultySet" />

        <div v-if="isDifficultySet && !showResults" class="border border-gray-500 flex flex-col gap-6 
         w-[800px] p-4 rounded-lg  min-h-48 bg-white justify-center items-center ">
            <AttemptQuiz />
            <Button content="Restart Quiz" :disabled="false" :danger="false" :action="restartQuiz" class="mx-auto" />
            <p class="text-sm text-gray-600 m-0">
                Note: Quiz will restart on leaving this page.
            </p>

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
import Button from '@/components/Button.vue';

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