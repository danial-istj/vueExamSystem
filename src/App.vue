<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Layout1 from './layout/Layout1.vue';
import { useAuthStore } from './stores/authStore';
import Loading from './components/Loading.vue';


const authStore = useAuthStore()
const {loading}=storeToRefs(authStore)


</script>

<template>
  <Loading v-if="loading"/>
  <Layout1  />
  
  <!-- <main class="ml-72 p-2">
    <RouterView />
  </main> -->
</template>

<style scoped></style>
