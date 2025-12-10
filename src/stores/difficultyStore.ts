import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuestionsStore } from './questionsStore'

export const useDifficultyStore = defineStore('difficulty', () => {
    const questionStore=useQuestionsStore()

    const noOfQuestions = ref<number>(questionStore.questions.length)
    const isRandom = ref<boolean>(false)
    const isTimed = ref<boolean>(false)
    const isDifficultySet=ref<boolean>(false)

    function toggleRandomed(): void {
        isRandom.value = !isRandom.value
    }
    function toggleTimed(): void {
        isTimed.value = !isTimed.value
    }
    function setDifficulty():void{
       isDifficultySet.value=!isDifficultySet.value
    }
    return { noOfQuestions,isRandom,isTimed,toggleRandomed,toggleTimed,setDifficulty,isDifficultySet}
})