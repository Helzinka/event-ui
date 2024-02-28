<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Utilisateurs" name="first">
      <ParameterUser />
    </el-tab-pane>
    <el-tab-pane label="Support" name="second">Support</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useParameterStore } from '@/store';
import { ref, onMounted } from 'vue';

const activeName = ref('first');
const parameterStore = useParameterStore();

onMounted(() => parameterStore.findUsers({}));
</script>
