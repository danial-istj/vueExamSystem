<template>
    <div
        class="current-question border border-gray-500 flex flex-col gap-1  w-[800px] p-4 rounded-lg   bg-white">
        <h2 for="question" class="pb-1 m-0">Question</h2>

        <input type="text" placeholder="Enter question..." v-model="form.question.value"
            class="w-full bg-white rounded  placeholder-gray-500 p-2 outline-none border border-gray-500">

        <div class="flex items-center justify-between gap-1 border-b border-black pb-2 my-2" v-if="form.question.value">
            <p class="text-xs  pl-1 my-auto">Select 'Correct Option' using the radio button provided.</p>

            <Button content="Add Option" :danger="false" :disabled="form.moreOptions.value" :action="form.addOption" />
        </div>


        <div v-for="(option, index) in form.options.value" :key="index"
            class="w-full bg-white border justify-between gap-2 border-gray-500 p-1 mb-1 rounded flex items-center "
            v-if="form.question.value">
            <input type="text" placeholder="Enter option..." v-model="option.text"
                class=" outline-none w-full p-1  bg-white">

            <div class=" flex justify-between gap-3 ">
                <input type="radio" v-model="form.correctIndex.value" :value="index" name="correct">
                <button @click="form.deleteOption(index)">
                    <DeleteOutlined class="text-red-500 text-center flex items-center "/>
                    <!-- <CloseOutlined class="text-red-500 text-center flex items-center " /> -->
                </button>
            </div>

        </div>


        <FormValidations :showValidation="form.showValidation.value" :noCorrectSelected="form.noCorrectSelected.value"
            :lessOptions="form.lessOptions.value" :moreOptions="form.moreOptions.value" />

        <div v-if="!form.lessOptions.value" class="flex justify-center gap-4">
            <Button content="Add Question" :action="addQuestion" :disabled="false" :danger="false" />
            <Button content="Clear" :action="form.clearForm" :disabled="false" :danger="true" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useQuestionsStore } from '@/stores/questionsStore';
import { useQuestionForm } from '@/composables/formLogic';
import FormValidations from './FormValidations.vue';
import { CloseOutlined, DeleteOutlined, CloseCircleFilled } from '@ant-design/icons-vue';
import Button from './Button.vue';


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
    // form.showValidation.value = !form.showValidation.value
    if (!form.showValidation.value) {
        form.showValidation.value = true
    }
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