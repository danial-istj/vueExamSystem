import type { question } from "@/types/questions";
import type { result } from "@/types/results";

export const defaultQuestions: question[] = [
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
];

export const defaultResults: result[] = [
  { id: 1734029005, marks: 80, percentage: "80", total: 100 },
  { id: 1734029004, marks: 70, percentage: "70", total: 100 },
  { id: 1734029003, marks: 90, percentage: "90", total: 100 },
  { id: 1734029002, marks: 60, percentage: "60", total: 100 },
  { id: 1734029001, marks: 50, percentage: "50", total: 100 },
];
