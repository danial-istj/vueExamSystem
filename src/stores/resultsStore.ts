import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { result } from "@/types/results";
export const useResultsStore = defineStore("results", () => {
  const results = ref<result[]>([]);
  const highestScore = computed<result | undefined>(() => {
    if (!results.value.length) {
      return undefined;
    }
    return results.value.reduce(
      (prev, curr) => (Number(curr.percentage) > Number(prev.percentage) ? curr : prev),
      results.value[0]!
    );
  });
  function addResult(item: result): void {
    results.value.unshift(item);
  }

  function deleteResult(id: number): void {
    results.value = results.value.filter((result) => result.id !== id);
  }

  function deleteAllResults(): void {
    results.value = [];
  }

  return { addResult, deleteResult, deleteAllResults, results, highestScore };
});
