<template>
    <div class="added-questions  w-full flex justify-center item-center p-4">
        <table class="table-auto border-black border-2 ">
            <thead>
                <tr class="border border-black p-2 text-center ">
                    <th class="border border-black p-2 text-center">Questions</th>
                    <th class="border border-black p-2 text-center">Options</th>
                    <th class="border border-black p-2 text-center" colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody>


                <tr v-for="question in questions" :key="question.id" class="border border-black p-2 text-center">
                    <td class="border border-black p-2 text-center">{{ question.question }}</td>
                    <td class="border border-black p-2 text-left">
                        <ul>
                            <li v-for="(option, index) in question.options" :key="index">
                                {{ index + 1 }}.
                                {{ option.text }}
                                ({{ option.correct ? 'Correct' : 'Not Correct' }})
                            </li>
                        </ul>
                    </td>
                    <td class="border border-black p-2 text-center">
                        <button @click="selectedId = question.id; confirming = true"
                            class="bg-red-600 hover:bg-red-500  rounded  mr-1 text-white p-2 ">Delete</button>
                        <Confirmation v-if="confirming && selectedId === question.id" action="Delete"
                            :proceed="deleteSelected" :cancel="() => { confirming = false; selectedId = null }" />
                        <button class="bg-green-600 hover:bg-green-500  rounded  ml-1 text-white p-2 "
                            @click="store.editQuestion(question.id)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup lang="ts">
import Confirmation from './Confirmation.vue';
import { useQuestionsStore } from '@/stores/questionsStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { getUserData } from '@/firebase/db';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

const store = useQuestionsStore()
const { questions } = storeToRefs(store)
const authStore = useAuthStore()

const confirming = ref<boolean>(false)
const selectedId = ref<number | null>(null)

function deleteSelected() {
    if (selectedId.value !== null) {
        store.deleteQuestion(selectedId.value)
        selectedId.value = null
    }
    confirming.value = false
}

onMounted(async () => {
    const data = await getUserData(authStore.uid)
    questions.value = data?.questions
})

</script>