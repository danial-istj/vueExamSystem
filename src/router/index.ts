import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuestionaireView from '@/views/QuestionaireView.vue'
import AttemptQuizView from '@/views/AttemptQuizView.vue'
import ResultsView from '@/views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/questionaire',
      name: 'questionaire',
      component:QuestionaireView,
    },
    {
      path: '/attemptquiz',
      name: 'attemptquiz',
      component:AttemptQuizView,
    },
    {
      path: '/results',
      name: 'results',
      component:ResultsView,
    },
  ],
})

export default router
