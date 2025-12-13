import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import HomeView from "@/views/HomeView.vue";
import QuestionaireView from "@/views/QuestionaireView.vue";
import AttemptQuizView from "@/views/AttemptQuizView.vue";
import ResultsView from "@/views/ResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/questionaire",
      name: "questionaire",
      component: QuestionaireView,
      meta: { requiresAuth: true },
    },
    {
      path: "/attemptquiz",
      name: "attemptquiz",
      component: AttemptQuizView,
      meta: { requiresAuth: true },
    },
    {
      path: "/results",
      name: "results",
      component: ResultsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.meta.requiresAuth;

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next("/signin");
    } else if ((to.path === "/signin" || to.path === "/register") && user) {
      next("/");
    } else {
      next();
    }
    unsubscribe();
  });
});

export default router;
