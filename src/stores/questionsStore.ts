import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { question } from '@/types/questions'
import { shuffleArray } from '@/composables/shuffleArray'

export const useQuestionsStore = defineStore('questions', () => {

  const questions = ref<question[]>([])
  const idToEdit = ref<number | null>(null)

  function pushQuestion(newQuestion: question): void {
    questions.value.unshift(newQuestion)

  }
  function deleteQuestion(id: number): void {

    questions.value = questions.value.filter((question) => question.id !== id)
  }
  function editQuestion(id: number): void {
    idToEdit.value = id

  }
  function giveQuestions(quantity: number, isRandom: boolean): question[] {
    if (!isRandom) {
      return questions.value.slice(0, quantity)
    }
    return shuffleArray(questions.value).slice(0, quantity)

  }

  return { questions, pushQuestion, deleteQuestion, editQuestion, idToEdit, giveQuestions }
})
