<template>

  <div class="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50 p-4">
    <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Sign In to Your Account</h1>

      <input type="email" placeholder="Enter your email" v-model="email"
        class="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <input type="password" placeholder="Enter your password" v-model="password"
        class="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <button @click="signInUser"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-3">
        Sign In
      </button>

      <button @click="signInWithGoogleUser"
        class="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition mb-3">
        Sign In with Google
      </button>

      <p v-if="message" class="text-center text-red-600 font-medium mb-4">
        {{ message }}
      </p>

      <p class="text-center text-gray-600">
        Need an account? <router-link to="/register" class="text-blue-600 hover:underline">Register Here</router-link>
      </p>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { onMounted } from 'vue';

const email = ref<string>("")
const password = ref<string>("")
const authStore = useAuthStore()
const { message } = storeToRefs(authStore)

onMounted(() => {
  message.value = null
})

async function signInUser() {
  await authStore.signIn(email.value, password.value)
  router.replace("/")
  email.value = ""
  password.value = ""
}

async function signInWithGoogleUser() {
  await authStore.signInWithGoogle()
  router.replace("/")
  email.value = ""
  password.value = ""

}

</script>