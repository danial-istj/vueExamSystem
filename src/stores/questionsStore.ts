import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { question } from '@/types/questions'
import { shuffleArray } from '@/composables/shuffleArray'

export const useQuestionsStore = defineStore('questions', () => {

  const questions = ref<question[]>([
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Hyperlinks Text Making Line", correct: false },
      { text: "Home Tool Markup Level", correct: false },
      { text: "Hyperlinking Text Management Logic", correct: false }
    ]
  },
  {
    id: 2,
    question: "Which CSS property controls text size?",
    options: [
      { text: "font-size", correct: true },
      { text: "text-style", correct: false },
      { text: "size", correct: false },
      { text: "type-scale", correct: false }
    ]
  },
  {
    id: 3,
    question: "Which one is a JavaScript framework?",
    options: [
      { text: "Vue", correct: true },
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "Flask", correct: false }
    ]
  },
  {
    id: 4,
    question: "Which HTTP method is used to update data?",
    options: [
      { text: "PUT", correct: true },
      { text: "GET", correct: false },
      { text: "FETCH", correct: false },
      { text: "READ", correct: false }
    ]
  },
  {
    id: 5,
    question: "What does JSON stand for?",
    options: [
      { text: "JavaScript Object Notation", correct: true },
      { text: "Java Source Open Network", correct: false },
      { text: "JavaScript Online Namespace", correct: false },
      { text: "Joined Syntax Object Node", correct: false }
    ]
  },
  {
    id: 6,
    question: "Which tag is used to link a JavaScript file?",
    options: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<link-js>", correct: false }
    ]
  },
  {
    id: 7,
    question: "Which one is NOT a primitive type in JavaScript?",
    options: [
      { text: "Object", correct: true },
      { text: "Number", correct: false },
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Undefined", correct: false }
    ]
  },
  {
    id: 8,
    question: "Which command initializes a new Git repository?",
    options: [
      { text: "git init", correct: true },
      { text: "git start", correct: false },
      { text: "git create", correct: false },
      { text: "git begin", correct: false }
    ]
  },
  {
    id: 9,
    question: "Which keyword declares a constant in JavaScript?",
    options: [
      { text: "const", correct: true },
      { text: "let", correct: false },
      { text: "constant", correct: false },
      { text: "var", correct: false }
    ]
  },
  {
    id: 10,
    question: "Which tool is used to manage packages in Node.js?",
    options: [
      { text: "npm", correct: true },
      { text: "pip", correct: false },
      { text: "composer", correct: false },
      { text: "gradle", correct: false },
      { text: "cargo", correct: false }
    ]
  }
]
)
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
