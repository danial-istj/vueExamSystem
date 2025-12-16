<script setup lang="ts">
import Layout1 from './layout/Layout1.vue';
import { useAuthStore } from './stores/authStore';


const authStore = useAuthStore()


</script>

<template>
  <Layout1 v-if="authStore.uid" />
  
  <!-- <main class="ml-72 p-2">
    <RouterView />
  </main> -->
</template>

<style scoped></style>
