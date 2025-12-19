<template>
    <div class="added-questions border p-6 border-gray-500 flex items-center justify-center flex-col gap-0 w-[800px]  rounded-lg  
    min-h-48 bg-white">



        <div v-if="questions.length > 0" v-for="(question, qIndex) in questions" :key="question.id" :class="['border-b w-full border-black text-center pb-2', { 'border-b-0 rounded-b-lg': qIndex === questions.length - 1 }, { 'bg-gray-100': idToEdit === question.id }, { 'rounded-t-lg': qIndex === 0 }

        ]">

            <div class="flex justify-between items-center p-2 ">

                <div class="w-full text-start flex items-center gap-2 ">

                    <h2 class="text-xl m-0">Question: </h2>
                    <h2 class=" text-xl m-0">{{ question.question }}</h2>

                </div>

                <div class="flex gap-3 items-center">
                    <button @click="store.editQuestion(question.id)" :disabled="idToEdit === question.id"
                        class="text-green-500 text-center flex items-center disabled:text-gray-500 disabled:cursor-not-allowed ">
                        <EditOutlined />
                    </button>
                    <button @click="selectQuestion(question.id)" class="text-red-500 text-center flex items-center ">
                        <DeleteOutlined />
                    </button>
                    <Confirmation action="Delete This Question" :proceed="deleteSelected" :cancel="cancelSelected"
                        :showModal="confirming && selectedId === question.id" />

                </div>

            </div>

            <br class=" mx-auto h-2">



            <div v-for="(option, index) in question.options" :key="index"
                class="border-t flex items-center justify-between">
                <div class="flex items-center p-2 gap-2 text-left">


                    <h3 class=" rounded border border-gray-500 m-0 p-1">
                        {{ index + 1 }}.
                    </h3>
                    <h3 class="m-0"> {{ option.text }}</h3>

                </div>



                <a-tag color="green" v-if="option.correct"
                    :class="['ml-2 flex items-center', { 'bg-gray-100': idToEdit === question.id }]">
                    <CheckCircleFilled class="mr-1" />
                    Correct
                </a-tag>

            </div>



        </div>
        <div v-else>
            <h1 class="text-xl text-center m-0">There are no Questions.</h1>
        </div>
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
import { DeleteOutlined, EditOutlined, CheckCircleFilled } from '@ant-design/icons-vue';

const store = useQuestionsStore()
const { questions, idToEdit } = storeToRefs(store)
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

function selectQuestion(id: number) {
    selectedId.value = id
    confirming.value = true
}

function cancelSelected() {
    confirming.value = false
    selectedId.value = null
}

onMounted(async () => {
    const data = await getUserData(authStore.uid)
    questions.value = data?.questions
})

</script>