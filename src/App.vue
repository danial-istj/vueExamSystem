<script setup lang="ts">
import Layout from './layout/layout.vue';
import { useAuthStore } from './stores/authStore';


const authStore = useAuthStore()


</script>

<template>
  <Layout v-if="authStore.uid" />
  <main class="ml-72 p-2">
    <RouterView />
  </main>
</template>

<style scoped></style>
