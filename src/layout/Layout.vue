<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';
import router from '@/router';
import Confirmation from '@/components/Confirmation.vue';
import { ref } from 'vue';

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)
const confirming = ref<boolean>(false)

async function logOutUser() {
    await authStore.logOut()
    router.replace("/signin")
}

</script>

<template>
    <header class="bg-gray-800 text-white fixed top-0 left-0 z-20 w-72 h-screen flex flex-col p-2">
        <div class="text-xl font-bold text-center py-3">MyApp</div>

        <nav class="flex flex-col gap-2">
            <RouterLink to="/" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">Home
            </RouterLink>
            <RouterLink to="/questionaire" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">
                Questionaire</RouterLink>
            <RouterLink to="/attemptquiz" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">
                Attempt
                Quiz</RouterLink>
            <RouterLink to="/results" class="px-3 py-2 rounded hover:bg-gray-700 transition w-full text-center">Results
            </RouterLink>
        </nav>

        <button @click="confirming = true"
            class="px-3 py-2 mt-auto rounded hover:bg-gray-700 transition w-full text-center">
            Sign Out
        </button>
        <Confirmation v-if="confirming" action="Log Out" :proceed="() => { logOutUser(); confirming = false }"
            :cancel="() => { confirming = false }" />

    </header>


    <Loading v-if="loading" />

</template>

<style scoped></style>
