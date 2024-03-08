<template>
  <el-form label-position="left" label-width="100px" :model="login">
    <el-form-item label="Email">
      <el-input v-model="login.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="login.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="connect">connecter</el-button>
    </el-form-item>
    <span class="text-red-500">{{ loginStore.error.message }}</span>
  </el-form>
</template>
<script setup lang="ts">
import { useLoginStore } from '@/store/login.store';
import { reactive } from 'vue';

const loginStore = useLoginStore();

const login = reactive({
  email: '',
  password: '',
});

async function connect() {
  await loginStore.connect(login?.email, login.password);
}
</script>
