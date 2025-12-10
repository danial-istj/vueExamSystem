<template>
    <div class="attempt-quiz">
        <h1>{{ currentQuestion?.question ?? "NO question" }}</h1>
        <p>{{ currentIndex + 1 }} of {{ questions.length }}</p>
        <ul>
            <li v-for="option, index in currentQuestion?.options" :key="index" @click="checkAnswer(index)">
                {{ option.text }}
            </li>
        </ul>
        <button @click="nextQuestion">{{ currentIndex === questions.length ? "Submit" : "Next" }}</button>

    </div>
</template>

<script setup lang="ts">

import { useAttemptStore } from '@/stores/attemptStore';
const attemptStore = useAttemptStore()
const { currentQuestion, currentIndex, questions, checkAnswer, nextQuestion } = attemptStore










</script>
