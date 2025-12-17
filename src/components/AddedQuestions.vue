<template>
    <div class="added-questions border border-gray-500 flex flex-col gap-1 w-[800px]  rounded-lg  min-h-48 bg-white">



        <div v-for="question, qIndex in questions" :key="question.id"
            :class="['border-b w-full border-black text-center pb-2', { 'border-b-0': qIndex === questions.length - 1 }]">

            <div class="flex justify-between items-center p-2">

                <div class="w-full text-start flex items-center gap-2 ">

                    <h2 class="text-xl m-0">Question: </h2>
                    <h2 class=" text-xl m-0">{{ question.question }}</h2>

                </div>

                <div class="flex gap-3 items-center">
                    <button @click="store.editQuestion(question.id)">
                        <EditOutlined class="text-green-500 text-center flex items-center " />
                    </button>
                    <button @click="selectedId = question.id; confirming = true">
                        <DeleteOutlined class="text-red-500 text-center flex items-center " />
                    </button>
                    <Confirmation v-if="confirming && selectedId === question.id" action="Delete"
                        :proceed="deleteSelected" :cancel="() => { confirming = false; selectedId = null }" />
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



                <a-tag color="green" v-if="option.correct" class="ml-2 flex items-center">
                    <CheckCircleFilled class="mr-1" />
                    Correct
                </a-tag>

            </div>



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