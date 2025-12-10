<template>
    <div class="added-questions  w-full flex justify-center item-center p-4">
        <table class="table-auto border-black border-2 ">
            <tr class="border border-black p-2 text-center ">
                <th class="border border-black p-2 text-center">Questions</th>
                <th class="border border-black p-2 text-center">Options</th>
                <th class="border border-black p-2 text-center" colspan="2">Actions</th>
            </tr>
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
                    <button @click="store.deleteQuestion(question.id)"
                        class="bg-red-600 hover:bg-red-500  rounded  mr-1 text-white p-2 ">Delete</button>
                    <button class="bg-green-600 hover:bg-green-500  rounded  ml-1 text-white p-2 "
                        @click="store.editQuestion(question.id)">Edit</button>
                </td>
            </tr>
        </table>
    </div>

</template>

<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questionsStore';
import { storeToRefs } from 'pinia';

const store = useQuestionsStore()
const { questions } = storeToRefs(store)

</script>