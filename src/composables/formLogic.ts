import { ref, computed } from "vue";
import type { option } from "@/types/questions";
import { useQuestionsStore } from "@/stores/questionsStore";
import { storeToRefs } from "pinia";

export function useQuestionForm() {
  const options = ref<option[]>([]);
  const question = ref<string>("");
  const correctIndex = ref<number | null>(null);
  const showValidation = ref<boolean>(false);

  const questionStore = useQuestionsStore();
  const { idToEdit } = storeToRefs(questionStore);

  const lessOptions = computed<boolean>(() => {
    return options.value.length < 4;
  });
  const moreOptions = computed<boolean>(() => {
    return options.value.length >= 6;
  });
  const noCorrectSelected = computed<boolean>(() => {
    if (correctIndex.value === null) return true;
    return false;
  });

  function addOption(): void {
    if (
      question.value.trim() &&
      (options.value.length === 0 ||
        options.value[options.value.length - 1]?.text.trim() !== "") &&
      !moreOptions.value
    ) {
      options.value.push({
        text: "",
        correct: false,
      });
    }
  }
  function deleteOption(index: number): void {
    options.value.splice(index, 1);
  }
  function putTrueOnCorrectOption(): void {
    options.value.map((option, index) => {
      if (index === correctIndex.value) {
        option.correct = true;
      } else {
        option.correct = false;
      }
    });
  }
  function clearForm() {
    question.value = "";
    options.value = [];
    correctIndex.value = null;
    idToEdit.value=null;
  }
  function loadForEdit(editItem: any) {
    question.value = editItem.question;
    options.value = JSON.parse(JSON.stringify(editItem.options));
    correctIndex.value = editItem.options.findIndex(
      (opt: option) => opt.correct === true
    );
  }

  return {
    options,
    question,
    correctIndex,
    showValidation,
    lessOptions,
    moreOptions,
    noCorrectSelected,
    addOption,
    deleteOption,
    putTrueOnCorrectOption,
    clearForm,
    loadForEdit,
  };
}
