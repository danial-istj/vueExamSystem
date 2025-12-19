<template>
  <a-layout style="min-height: 100vh">

    <!-- Sidebar -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light" class="fixed sider h-screen  z-50"
      width="200" v-if="authStore.uid">
      <div class="logo flex items-center justify-center py-4 bg-[#fff]">
        <RouterLink to="/">
          <img src="../assets/logo1.png" alt="logo" class="logo-img" />
        </RouterLink>
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" class="bg-[#fff]">
        <a-menu-item key="1">
          <RouterLink to="/" class="flex items-center gap-2">
            <HomeOutlined />
            <span>Home</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <RouterLink to="/questionaire" class="flex items-center gap-2">
            <FormOutlined />
            <span>Questionaire</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="3">
          <RouterLink to="/attemptquiz" class="flex items-center gap-2">
            <EditOutlined />
            <span>Attempt Quiz</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="4">
          <RouterLink to="/results" class="flex items-center gap-2">
            <TrophyOutlined />
            <span>Results</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="5">
          <button @click="confirming = true" class="flex items-center gap-2 w-full text-left">
            <LogoutOutlined />
            <span>Sign Out</span>
          </button>
          <Confirmation :showModal="confirming" action="Log Out" :proceed="() => { logOutUser(); confirming = false }"
            :cancel="() => { confirming = false }" />
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout class="min-h-screen bg-[#fff]">
      <!-- Header -->
      <a-layout-header class="header fixed top-0 left-0 right-0 z-10 bg-[#fff]" theme="light" v-if="authStore.uid">

      </a-layout-header>

      <!-- Content -->
      <a-layout-content class="pt-[64px] overflow-auto bg-gray-100" style="height: calc(100vh - 64px)">
        <div class="bg-gray-50 min-h-full  m-4 flex justify-center items-center">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { HomeOutlined, FormOutlined, TrophyOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink, RouterView } from 'vue-router'
import Confirmation from '@/components/Confirmation.vue'

const selectedKeys = ref<string[]>(['1'])
const authStore = useAuthStore()
const confirming = ref<boolean>(false)
const collapsed = ref(window.innerWidth < 768)

async function logOutUser() {
  await authStore.logOut()
  router.replace('/signin')
}
</script>

<style scoped>
  .logo-img{
    width:130px
  }
.header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 10;
}

:deep(.ant-layout-sider-trigger) {
  border-top: 1px solid #e5e7eb;
}


.logo img {
  display: block;
  margin: 0 auto;
}

a-layout-content {
  background: #f0f2f5;
}

.ant-layout-header {
  background: #ffffff !important;
}


:deep(.sider) {
  position: relative;
}

:deep(.sider)::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: #374151;
  z-index: 1000;
  pointer-events: none;
}
</style>
