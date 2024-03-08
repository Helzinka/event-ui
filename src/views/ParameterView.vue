<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Utilisateurs" name="first">
      <UserManager />
    </el-tab-pane>
    <el-tab-pane label="Support" name="second">Support</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeName = ref('first');
</script>
