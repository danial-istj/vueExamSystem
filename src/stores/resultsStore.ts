import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { result } from "@/types/results";
import { saveResults } from "@/firebase/db";
import { useAuthStore } from "./authStore";

export const useResultsStore = defineStore("results", () => {
  const results = ref<result[]>([]);
  const highestScore = computed<result | undefined>(() => {
    if (!results.value.length) {
      return undefined;
    }
    return results.value.reduce(
      (prev, curr) =>
        Number(curr.percentage) > Number(prev.percentage) ? curr : prev,
      results.value[0]!
    );
  });
  const authStore = useAuthStore();

  async function addResult(item: result) {
    results.value.unshift(item);
    await saveResults(authStore.uid, results.value);
  }

  async function deleteResult(ids: number[]) {
    ids.forEach((id)=>{
    results.value = results.value.filter((result) => result.id !== id);
    })
    await saveResults(authStore.uid, results.value);
  }

  async function deleteAllResults() {
    results.value = [];
    await saveResults(authStore.uid, results.value);
  }

  return { addResult, deleteResult, deleteAllResults, results, highestScore };
});
