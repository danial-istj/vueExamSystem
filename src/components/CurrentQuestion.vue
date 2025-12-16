<template>
    <div
        class="current-question border border-gray-500 flex flex-col gap-1 m-2 w-[800px] p-2 rounded-lg  min-h-48 bg-white">
        <label for="question" class="pb-1">Question</label>

        <input type="text" placeholder="Enter question..." v-model="form.question.value"
            class="w-full bg-white rounded  placeholder-gray-500 p-2 outline-none border border-gray-500">

        <div class="flex items-center justify-center gap-1 border-b border-black pb-2 my-2" v-if="form.question.value">
            <p class="text-xs w-2/3 pl-1 my-auto">Select 'Correct Option' using the radio button provided.</p>
            <button @click="form.addOption" :disabled="form.moreOptions.value"
                class="bg-green-500 w-1/3 min-h-8 ml-auto rounded hover:bg-green-600 ">Add Option</button>
        </div>

        <div v-for="(option, index) in form.options.value" :key="index" class="w-full bg-white border border-gray-500 p-1 rounded">
            <input type="text" placeholder="Enter option..." v-model="option.text"
                class="w-3/4 outline-none p-1 bg-white">
            <input type="radio" v-model="form.correctIndex.value" :value="index" name="correct" class="ml-10">
            <button @click="form.deleteOption(index)" class="text-red-600 ml-4
            ">X</button>
        </div>

        <FormValidations :showValidation="form.showValidation.value" :noCorrectSelected="form.noCorrectSelected.value"
            :lessOptions="form.lessOptions.value" :moreOptions="form.moreOptions.value" />

        <button @click="addQuestion" v-if="!form.lessOptions.value"
            class="bg-gray-800 hover:bg-gray-600 mt-2 rounded  mx-auto text-white p-2">Add Question</button>

    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useQuestionsStore } from '@/stores/questionsStore';
import { useQuestionForm } from '@/composables/formLogic';
import FormValidations from './FormValidations.vue';

const store = useQuestionsStore()
const form = useQuestionForm()

watch(() => store.idToEdit, () => {
    checkForEdits()
})

function checkForEdits(): void {
    if (store.idToEdit !== null) {
        store.questions.forEach((item) => {
            if (item.id === store.idToEdit) {
                form.loadForEdit(item)
            }
        })
    }
}

function addQuestion(): void {
    form.showValidation.value = !form.showValidation.value
    form.options.value = form.options.value.filter((option) => option.text.trim())

    if (store.idToEdit) {
        store.questions.forEach((item) => {
            if (item.id === store.idToEdit) {
                form.putTrueOnCorrectOption()
                item.question = form.question.value
                item.options = form.options.value

            }
        })
        store.idToEdit = null
        form.clearForm()
        return
    }

    if (form.question.value.trim() && !form.lessOptions.value && !form.noCorrectSelected.value) {
        form.putTrueOnCorrectOption()
        store.pushQuestion({ id: Date.now(), question: form.question.value, options: form.options.value })
        form.clearForm()
    }
}
</script>