<template>
    <div class="added-questions border border-black">
        <table>
            <tr>
                <th>Questions</th>
                <th>Options</th>
                <th colspan="2">Actions</th>
            </tr>

            <tr v-for="question in questions" :key="question.id">
                <td>{{ question.question }}</td>

                <td>
                    <ul>
                        <li v-for="(option, index) in question.options" :key="index">
                            {{ index + 1 }}.
                            {{ option.text }}
                            ({{ option.correct ? 'Correct' : 'Not Correct' }})
                        </li>
                    </ul>
                </td>

                <td><button @click="store.deleteQuestion(question.id)">Delete</button><span><button
                            @click="store.editQuestion(question.id)">Edit</button></span>
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

<style></style>