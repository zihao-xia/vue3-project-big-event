<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter() // 路由对象
// const route = useRoute() // 路由参数

const goLogin = () => {
  router.push('/login')
}

const userStore = useUserStore()
</script>

<template>
  <div>
    <router-view></router-view>
    App Page
    <el-button @click="$router.push('/')">to Home</el-button>
    <el-button @click="goLogin">to Login</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('adasdaasd')">login</el-button>
    <el-button @click="userStore.removeToken()">logout</el-button>
  </div>
</template>

<style scoped></style>
