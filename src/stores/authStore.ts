import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const message = ref<string>("");

  const auth = getAuth();

  async function register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          message.value = error.message;
      }
    }
  }

  async function signIn(email: string, password: string) {
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
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Successfully signed in with Google!");
    } catch (error: any) {
      console.log(error.code);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error: any) {
      console.log(error.code);
    }
  }

  return { register, signIn, signInWithGoogle, logOut, message };
});
