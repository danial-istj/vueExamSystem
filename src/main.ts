import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqyJ5qM993tYCb7CZE2wuoXy37456HE-k",
  authDomain: "practicing-vue.firebaseapp.com",
  projectId: "practicing-vue",
  storageBucket: "practicing-vue.firebasestorage.app",
  messagingSenderId: "524090876326",
  appId: "1:524090876326:web:906f16972eeeeb8f022f67"
};

initializeApp(firebaseConfig);
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
