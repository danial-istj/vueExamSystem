import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { question } from '@/types/questions'

export const useQuestionsStore = defineStore('questions', () => {

  const questions = ref<question[]>([])
  const idToEdit = ref<number|null>(null)

  function pushQuestion(newQuestion: question): void {
    questions.value.push(newQuestion)

  }
  function deleteQuestion(id: number): void {

    questions.value = questions.value.filter((question) => question.id !== id)
  }
  function editQuestion(id: number): void {
    idToEdit.value = id

  }

  return { questions, pushQuestion, deleteQuestion, editQuestion ,idToEdit }
})
