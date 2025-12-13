import { ref } from "vue";
import { defineStore } from "pinia";
import type { question } from "@/types/questions";
import { shuffleArray } from "@/composables/shuffleArray";
import { saveQuestions } from "@/firebase/db";
import { useAuthStore } from "./authStore";

export const useQuestionsStore = defineStore("questions", () => {
  const questions = ref<question[]>([
    {
      id: 1734029001,
      question: "What is the capital of Japan?",
      options: [
        { text: "Tokyo", correct: true },
        { text: "Osaka", correct: false },
        { text: "Kyoto", correct: false },
        { text: "Nagoya", correct: false },
      ],
    },
    {
      id: 1734029002,
      question: "Which gas do plants absorb from the atmosphere?",
      options: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Hydrogen", correct: false },
      ],
    },
    {
      id: 1734029003,
      question: "How many continents are there on Earth?",
      options: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false },
      ],
    },
    {
      id: 1734029004,
      question: "What is the largest mammal in the world?",
      options: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Polar Bear", correct: false },
      ],
    },
    {
      id: 1734029005,
      question: "Which planet is closest to the Sun?",
      options: [
        { text: "Earth", correct: false },
        { text: "Mercury", correct: true },
        { text: "Venus", correct: false },
        { text: "Mars", correct: false },
      ],
    },
    {
      id: 1734029006,
      question: "Which shape has three sides?",
      options: [
        { text: "Square", correct: false },
        { text: "Triangle", correct: true },
        { text: "Circle", correct: false },
        { text: "Pentagon", correct: false },
      ],
    },
    {
      id: 1734029007,
      question: "How many days are in a leap year?",
      options: [
        { text: "365", correct: false },
        { text: "366", correct: true },
        { text: "364", correct: false },
        { text: "367", correct: false },
      ],
    },
    {
      id: 1734029008,
      question: "Which animal is known as the King of the Jungle?",
      options: [
        { text: "Tiger", correct: false },
        { text: "Lion", correct: true },
        { text: "Leopard", correct: false },
        { text: "Cheetah", correct: false },
      ],
    },
    {
      id: 1734029009,
      question: "What do bees collect from flowers?",
      options: [
        { text: "Water", correct: false },
        { text: "Pollen", correct: true },
        { text: "Leaves", correct: false },
        { text: "Seeds", correct: false },
      ],
    },
    {
      id: 1734029010,
      question: "Which ocean is the largest?",
      options: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
        { text: "Arctic Ocean", correct: false },
      ],
    },
  ]);
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
