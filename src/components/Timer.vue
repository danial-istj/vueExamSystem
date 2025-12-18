<template>
    <div class="flex items-center justify-center px-2 w-20 bg-gray-100 rounded-lg shadow-md mb-4 mx-auto p-1">
        <h2 class="text-4xl font-extrabold text-blue-600 m-0">
            {{ remainingTime }}
            <span class="text-xl font-normal text-gray-500">s</span>
        </h2>
    </div>
</template>



<script setup lang="ts">
import { useDifficultyStore } from '@/stores/difficultyStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const difficultyStore = useDifficultyStore()
const { remainingTime } = storeToRefs(difficultyStore)
onMounted(() => {
    difficultyStore.startTimer()

})


</script>