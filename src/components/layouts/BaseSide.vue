<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import { Calendar, Setting, PieChart } from '@element-plus/icons-vue';

const isCollapsed: Ref<boolean> = ref(false);
const full: Ref<boolean> = ref(false);
</script>

<template>
  <el-menu
    :collapse="isCollapsed"
    :collapse-transition="full"
    default-active="1"
    style="height: 100%"
    router
  >
    <el-menu-item index="1" :route="{ name: 'reporting' }">
      <el-icon><PieChart /></el-icon>
      <template #title>Reporting</template>
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'events' }">
      <el-icon><Calendar /></el-icon>
      <template #title>Evènements</template>
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'parameter' }">
      <el-icon><Setting /></el-icon>
      <template #title>Paramètres</template>
    </el-menu-item>
  </el-menu>
</template>
