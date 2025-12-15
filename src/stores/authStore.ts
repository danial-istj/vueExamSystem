import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { saveQuestions, saveResults } from "@/firebase/db";
import { defaultQuestions, defaultResults } from "@/firebase/defaultData";

export const useAuthStore = defineStore("auth", () => {
  const message = ref<string | null>(null);
  const uid = ref<string>("");
  const user = ref<User | null>(null);
  const auth = getAuth();
  const loading = ref<boolean>(false);
  const isReady = ref<boolean>(false);

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
    uid.value = firebaseUser?.uid || null!;
    isReady.value = true;
  });

  async function register(email: string, password: string) {
    loading.value = true;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      const uid = cred.user.uid;

      await saveQuestions(uid, defaultQuestions);
      await saveResults(uid, defaultResults);

      message.value = "Successfully registered!";
      console.log("Successfully registered!");
    } catch (error: any) {
      console.log(error.code);

      switch (error.code) {
        case "auth/email-already-in-use":
          message.value = "Email already in use.";
          break;
        case "auth/invalid-email":
          message.value = "Email is invalid.";
          break;
        case "auth/weak-password":
          message.value = "Password must be at least 6 characters.";
          break;
        default:
          message.value = "Something went wrong. Try again.";
      }
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successfully signed in!");
    } catch (error: any) {
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          message.value = "No user found with this email.";
          break;
        case "auth/wrong-password":
          message.value = "Incorrect password.";
          break;
        case "auth/invalid-email":
          message.value = "Email is invalid.";
          break;
        default:
          message.value = error.message;
      }
    } finally {
      loading.value = false;
      message.value = "";
    }
  }

  async function signInWithGoogle() {
    loading.value = true;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Successfully signed in with Google!");
    } catch (error: any) {
      console.log(error.code);
    } finally {
      loading.value = false;
      message.value = "";
    }
  }

  async function logOut() {
    loading.value = true;
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error: any) {
      console.log(error.code);
    } finally {
      loading.value = false;
      message.value = "";
    }
  }

  return {
    register,
    signIn,
    signInWithGoogle,
    logOut,
    message,
    uid,
    loading,
    isReady,
    user,
  };
});
