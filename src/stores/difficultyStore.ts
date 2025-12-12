import { ref } from "vue";
import { defineStore } from "pinia";
import { useQuestionsStore } from "./questionsStore";

export const useDifficultyStore = defineStore("difficulty", () => {
  const questionStore = useQuestionsStore();
  
  const time = 15;
  const noOfQuestions = ref<number>(questionStore.questions.length);
  const isRandom = ref<boolean>(false);
  const isTimed = ref<boolean>(false);
  const isDifficultySet = ref<boolean>(false);
  const remainingTime = ref<number>(time);

  function toggleRandomed(): void {
    isRandom.value = !isRandom.value;
  }
  function toggleTimed(): void {
    isTimed.value = !isTimed.value;
  }
  function setDifficulty(): void {
    isDifficultySet.value = !isDifficultySet.value;
    resetTimer();
  }
  let intervalId: ReturnType<typeof setInterval>;
  function startTimer() {
    stopTimer();
    intervalId = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        stopTimer();
      }
    }, 1000);
  }
  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }
  function resetTimer() {
    remainingTime.value = time;
  }

  return {
    noOfQuestions,
    isRandom,
    isTimed,
    toggleRandomed,
    toggleTimed,
    setDifficulty,
    isDifficultySet,
    startTimer,
    stopTimer,
    remainingTime,
    resetTimer,
  };
});
