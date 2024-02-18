<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <span>{{ title }}</span>
    </template>
    <div>{{ description }}</div>
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>
