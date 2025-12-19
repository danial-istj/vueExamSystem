<template>
    <div class="border border-gray-500 grid items-center gap-2 w-[800px]  rounded-lg  p-6
    min-h-48 bg-white">

        <div v-if="results.length > 0" class="w-full grid grid-flow-row grid-cols-[1fr_auto] items-center gap-1 mb-2">
            <h1 class="text-2xl text-center m-0">Results</h1>
            <button @click="confirming = true" class="p-2 rounded-lg text-red-400  hover:text-red-500 transition">
                <DeleteOutlined />
            </button>
            <Confirmation action="Delete All Results"
                :proceed="() => { resultsStore.deleteAllResults(); confirming = false; }" :cancel="cancelSelected"
                :showModal="confirming" />
        </div>
        <div v-else>
            <h1 class="text-xl text-center m-0">There are no Results.</h1>
        </div>


        <div v-for="result in results" :key="result.id"
            class="grid grid-flow-col grid-cols-[auto_1fr_auto_auto] gap-4 justify-center items-center  bg-gray-100 border  rounded-lg p-4 hover:bg-gray-200 transition">

            <div class="grid gap-1 text-center text-sm ">
                <span class="font-medium ">{{ formatDate.formattedDate(result.id) }}</span>
                <span>{{ formatDate.formattedTime(result.id) }}</span>
            </div>

            <div class="text-center grid gap-0 ">
                <p class="text-lg font-semibold m-0 ">{{ result.marks }} / {{ result.total }}</p>
                <p class="text-xs m-0">Marks</p>
            </div>

            <div :class="[
                'px-3 py-1 rounded-full text-sm font-semibold ring-1 transition-colors',
                Number(result.percentage) >= 80
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                    : Number(result.percentage) >= 50
                        ? 'bg-amber-50 text-amber-700 ring-amber-200'
                        : 'bg-rose-50 text-rose-700 ring-rose-200'
            ]">
                {{ result.percentage }}%
            </div>

            <button @click="selectResult(result.id); confirming = true"
                class="p-2 rounded-lg text-red-400 hover:text-red-500 transition">
                <DeleteOutlined />
            </button>
            <Confirmation action="Delete This Result" :proceed="deleteSelected" :cancel="cancelSelected"
                :showModal="confirming && selectedId === result.id" />

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
import { DeleteOutlined } from '@ant-design/icons-vue';

const formatDate = useFormatedDate()
const resultsStore = useResultsStore()
const { results } = storeToRefs(resultsStore)
const authStore = useAuthStore()
const confirming = ref<boolean>(false)
const selectedId = ref<number | null>()

function deleteSelected() {
    if (selectedId.value) {
        resultsStore.deleteResult(selectedId.value)
        selectedId.value = null
    }
    confirming.value = false
}

function selectResult(id: number) {
    selectedId.value = id
    confirming.value = true
}

function cancelSelected() {
    confirming.value = false
    selectedId.value = null
}


onMounted(async () => {
    const data = await getUserData(authStore.uid)
    results.value = data?.results
})




</script>