import { ref } from "vue";
import { defineStore } from "pinia";
import type { question } from "@/types/questions";
import { shuffleArray } from "@/composables/shuffleArray";
import { saveQuestions } from "@/firebase/db";
import { useAuthStore } from "./authStore";

export const useQuestionsStore = defineStore("questions", () => {
  const questions = ref<question[]>([]);
  const idToEdit = ref<number | null>(null);
  const authStore = useAuthStore();

  async function pushQuestion(newQuestion: question) {
    questions.value.unshift(newQuestion);
    await saveQuestions(authStore.uid, questions.value);
  }
  async function deleteQuestion(id: number) {
    questions.value = questions.value.filter((question) => question.id !== id);
    await saveQuestions(authStore.uid, questions.value);
  }
  function editQuestion(id: number): void {
    idToEdit.value = id;
  }
  function giveQuestions(quantity: number, isRandom: boolean): question[] {
    if (!isRandom) {
      return questions.value.slice(0, quantity);
    }
    return shuffleArray(questions.value).slice(0, quantity);
  }

  return {
    questions,
    pushQuestion,
    deleteQuestion,
    editQuestion,
    idToEdit,
    giveQuestions,
  };
});
