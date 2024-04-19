<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="text-xl mb-6">
    <el-breadcrumb-item v-for="item in breadCrumbs" :to="item.to">
      {{ item.text }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const breadCrumbs = computed(() => {
  const route = useRoute();
  if (typeof route.meta.breadCrumb === 'function') {
    return route.meta.breadCrumb.call(this, route);
  }
  return route.meta.breadCrumb;
});
</script>

<style scoped></style>
