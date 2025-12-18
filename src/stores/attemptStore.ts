import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { question } from "@/types/questions";
import { useQuestionsStore } from "@/stores/questionsStore";
import { storeToRefs } from "pinia";
import { useDifficultyStore } from "./difficultyStore";

export const useAttemptStore = defineStore("attempt", () => {
  const { giveQuestions } = useQuestionsStore();
  const difficultyStore = useDifficultyStore();
  const { noOfQuestions, isRandom } = storeToRefs(difficultyStore);

  const currentIndex = ref<number>(0);
  const score = ref<number>(0);
  const showResults = ref<boolean>(false);
  const questions = computed<question[]>(() => {
    return giveQuestions(noOfQuestions.value, isRandom.value);
  });
  
  const currentQuestion = computed(() => {
    return questions.value[currentIndex.value];
  });
  const percentage = computed(() => {
    return ((score.value / questions.value.length) * 100).toFixed(2);
  });
  const previewResult = ref<boolean>(false);

  function nextQuestion() {
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++;
    } else {
      showResults.value = true;
    }
    difficultyStore.resetTimer();
  }

  function checkAnswer(index: number): void {
    if (
      currentQuestion.value?.options[index]?.correct === true &&
      currentIndex.value < questions.value.length
    ) {
      score.value++;
    }
    previewResult.value = true;

    setTimeout(() => {
      previewResult.value = false;
      nextQuestion();
    }, 1000);
  }

  function resetQuiz() {
    currentIndex.value = 0;
    score.value = 0;
    showResults.value = false;
  }

  return {
    currentIndex,
    score,
    questions,
    showResults,
    previewResult,
    currentQuestion,
    nextQuestion,
    checkAnswer,
    resetQuiz,
    percentage,
  };
});
