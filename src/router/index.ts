import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { watch } from "vue";
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
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.isReady) {
      return new Promise((resolve) => {
        const stop = watch(
          () => authStore.isReady,
          (ready) => {
            if (ready) {
              stop();
              if (!authStore.user) {
                resolve('/signin');
              } else {
                resolve(true);
              }
            }
          },
          { immediate: true }
        );
      });
    } else if (!authStore.user) {
      return '/signin';
    }
  }

  if ((to.path === "/signin" || to.path === "/register") && authStore.user) {
    return "/";
  }
});

export default router;
