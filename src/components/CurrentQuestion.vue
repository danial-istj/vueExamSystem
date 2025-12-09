<template>
    <div class="current-question border-2 flex flex-col gap-1 m-2 w-96 p-2 rounded-xl  min-h-48 bg-slate-200">

        <input type="text" placeholder="A questions ends with '?'" v-model="question"
            class="w-full bg-slate-400 rounded  placeholder-white p-2  focus:outline-gray-800">

        <div class="flex flex-row gap-1 border-b border-black pb-2">
            <p class="text-xs w-2/3 pl-1">Select 'Correct Option' using the radio button provided.</p>
            <button @click="addOption" :disabled="moreOptions"
                class="bg-green-500 w-1/3 ml-auto rounded hover:bg-green-600 ">Add Option</button>
        </div>

        <div v-for="(option, index) in options" :key="index" class="w-full bg-slate-400 rounded">
            <input type="text" placeholder="Enter option..." v-model="option.text"
                class="w-3/4 outline-none p-2 bg-slate-400 rounded">
            <input type="radio" v-model="correctIndex" :value="index" name="correct" class="ml-10">
            <button @click="deleteOption(index)" class="text-red-600 ml-4
            ">X</button>
        </div>

        <p v-if="noCorrectSelected && showValidation" class="text-xs pl-1">One Option must be Correct</p>
        <p v-if="lessOptions && showValidation" class="text-xs pl-1">There must be atleast 4 options.</p>
        <p v-if="moreOptions && showValidation" class="text-xs pl-1">There can be maximum 6 options.</p>
        <button @click="addQuestion" v-if="!lessOptions"
            class="bg-gray-800 hover:bg-gray-600 mt-2 rounded  mx-auto text-white p-2">Add Question</button>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuestionsStore } from '@/stores/questionsStore';
import type { question, option } from '@/types/questions'

const store = useQuestionsStore()
const options = ref<option[]>([])
const question = ref<string>("")
const correctIndex = ref<number | null>(null)
const showValidation = ref<boolean>(false)
const lessOptions = computed<boolean>(() => {
    return (options.value.length < 4)
})
const moreOptions = computed<boolean>(() => {
    return (options.value.length >= 6)
})
const noCorrectSelected = computed<boolean>(() => {
    if (correctIndex.value === null) return true
    return false
})

watch(()=>store.idToEdit,()=>{
    checkForEdits()
})

function checkForEdits(): void {
    if (store.idToEdit!==null) {
        store.questions.forEach((item) => {
            if (item.id === store.idToEdit) {
                question.value = item.question
                options.value = JSON.parse(JSON.stringify(item.options))
                correctIndex.value=item.options.findIndex((option)=>option.correct===true)
            }
        })
    }
}
function addOption(): void {
    if (question.value.trim() && (options.value.length === 0 || options.value[options.value.length - 1]?.text.trim() !== "") && !moreOptions.value) {
        options.value.push({
            text: "", correct: false
        })
    }
}
function addQuestion(): void {
    showValidation.value = !showValidation.value
    options.value = options.value.filter((option) => option.text.trim())

    if (store.idToEdit) {
        store.questions.forEach((item) => {
            if (item.id === store.idToEdit) {
                item.question = question.value
                item.options = options.value
            }
        })
        store.idToEdit = null
        clearForm()
        return
    }

    if (question.value.trim() && !lessOptions.value && !noCorrectSelected.value) {
        putTrueOnCorrectOption()
        store.pushQuestion({ id: Date.now(), question: question.value, options: options.value })
        clearForm()
    }
}
function deleteOption(index: number): void {
    options.value.splice(index, 1)
}
function putTrueOnCorrectOption(): void {
    options.value.map((option, index) => {
        if (index === correctIndex.value) {
            option.correct = true
        }
    })
}
function clearForm() {
    question.value = ""
    options.value = []
    correctIndex.value = null
}

</script>