<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-800 text-white fixed top-0 left-0 w-72 h-screen">
    <div>
      <div class="text-xl font-bold text-center py-3">MyApp</div>
      <nav class="flex items-center flex-col p-2">
        <RouterLink to="/" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">Home</RouterLink>
        <RouterLink to="/questionaire" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">
          Questionaire</RouterLink>
        <RouterLink to="/attemptquiz" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">Attempt
          Quiz</RouterLink>
          <RouterLink to="/results" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">Results</RouterLink>
      </nav>
    </div>
  </header>
  <main class="ml-72 p-2">
    <RouterView />
  </main>
</template>

<style scoped></style>
