<template>
    <div class="border border-gray-500 flex flex-col gap-0 w-[800px]  rounded-lg  p-6
    min-h-48 bg-white">

        <div class="w-full flex justify-between">
            <h1 class="text-xl m-0">Results</h1>
            <button @click="confirming = true" class="bg-blue-500 font-bold text-black p-2">
                <MoreOutlined />
            </button>

        </div>


        <div v-for="result in results" :key="result.id"
            class="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl p-4 hover:bg-gray-800 transition">

            <div><input type="checkbox" v-model="selectedIds" :value="result.id"></div>

            <div class="flex flex-col text-sm text-gray-400">
                <span class="font-medium text-gray-200">{{ formatDate.formattedDate(result.id) }}</span>
                <span>{{ formatDate.formattedTime(result.id) }}</span>
            </div>

            <div class="text-center">
                <p class="text-lg font-semibold text-white">{{ result.marks }} / {{ result.total }}</p>
                <p class="text-xs text-gray-400">Marks</p>
            </div>

            <div class="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold">
                {{ result.percentage }}%
            </div>

            <button @click="selectResult(result.id); confirming = true"
                class="p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition">
                <DeleteOutlined />
            </button>
            <Confirmation action="Delete This Result" :proceed="deleteSelected" :cancel="cancelSelected"
                :showModal="confirming && selectedIds.pop() === result.id" />

        </div>



    </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/resultsStore';
import { useFormatedDate } from '@/composables/formatDateLogic';
import { storeToRefs } from 'pinia';
import { getUserData } from '@/firebase/db';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import { ref } from 'vue';
import Confirmation from './Confirmation.vue';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons-vue';

const formatDate = useFormatedDate()
const resultsStore = useResultsStore()
const { results } = storeToRefs(resultsStore)
const authStore = useAuthStore()
const confirming = ref<boolean>(false)
const selectedIds = ref<number[]>([])

function deleteSelected() {
    if (selectedIds.value) {
        resultsStore.deleteResult(selectedIds.value)
        selectedIds.value = []
    }
    confirming.value = false
}

function selectResult(id: number) {
    selectedIds.value.push(id)
    confirming.value = true
}

function cancelSelected() {
    confirming.value = false
    selectedIds.value = []
}


onMounted(async () => {
    const data = await getUserData(authStore.uid)
    results.value = data?.results
})




</script>