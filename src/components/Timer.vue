<template>
    <div class="flex items-center justify-center h-15 bg-gray-100 rounded-lg shadow-md mb-4">
        <h2 class="text-4xl font-extrabold text-blue-600">
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