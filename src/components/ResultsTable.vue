<template>
    <div class="added-questions  w-full flex flex-col justify-center item-center p-4">
        <div class="w-full flex justify-end">
            <button @click="resultsStore.deleteAllResults()"
                class="bg-red-600 hover:bg-red-500 rounded mb-3 text-white p-2 w-1/6">Delete All</button>
        </div>
        <table class="table-auto border-black border-2 ">
            <tr class="border border-black p-2 text-center">
                <th class="border border-black p-2 text-center">Time</th>
                <th class="border border-black p-2 text-center">Date</th>
                <th class="border border-black p-2 text-center">Obtained</th>
                <th class="border border-black p-2 text-center">Total</th>
                <th class="border border-black p-2 text-center">Percentage</th>
                <th class="border border-black p-2 text-center">Actions</th>
            </tr>
            <tr v-for="result in results" class="border border-black p-2 text-center">
                <td class="border border-black p-2 text-center">{{ formatDate.formattedTime(result.id) }}</td>
                <td class="border border-black p-2 text-center">{{ formatDate.formattedDate(result.id) }}</td>
                <td class="border border-black p-2 text-center">{{ result.marks }}</td>
                <td class="border border-black p-2 text-center">{{ result.total }}</td>
                <td class="border border-black p-2 text-center">{{ result.percentage }}</td>
                <td class="border border-black p-2 text-center"><button
                        class="bg-red-600 hover:bg-red-500 rounded mb-3 text-white p-2"
                        @click="resultsStore.deleteResult(result.id)">Delete</button></td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/resultsStore';
import { useFormatedDate } from '@/composables/formatDateLogic';
import { storeToRefs } from 'pinia';
import { getUserData } from '@/firebase/db';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const formatDate = useFormatedDate()
const resultsStore = useResultsStore()
const { results } = storeToRefs(resultsStore)
const authStore=useAuthStore()



onMounted(async ()=>{
const data=await getUserData(authStore.uid)
results.value=data?.results
})


</script>