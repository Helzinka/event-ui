<template>
  <!-- <h1>Evènements</h1>
    <el-divider /> -->
  <!-- actions event -->
  <el-breadcrumb :separator-icon="ArrowRight" class="mb-4">
    <el-breadcrumb-item :to="{ path: '/events' }">Evènement</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
</script>
