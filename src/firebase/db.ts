// src/firebase/db.js
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { question } from "@/types/questions";
import type {result }from "@/types/results"

export async function saveQuestions(userUid: string, questions: question[]) {
  if (!userUid) throw new Error("User UID is required");
  try {
    await setDoc(
      doc(db, "users", userUid),
      { questions },
      { merge: true } 
    );
    console.log("Questions updated!");
  } catch (err) {
    console.error("Failed to save questions", err);
  }
}

export async function saveResults(userUid: string, results: result[]) {
  if (!userUid) throw new Error("User UID is required");
  try {
    await setDoc(
      doc(db, "users", userUid),
      { results },
      { merge: true } 
    );
    console.log("Results updated!");
  } catch (err) {
    console.error("Failed to save results", err);
  }
}

export async function getUserData(userUid:string) {
  const docSnap = await getDoc(doc(db, "users", userUid));
  if (docSnap.exists()) {
    return docSnap.data(); // { questions: [...], results: [...] }
  }
  return null;
}
