<script lang="ts" setup>
import { toggleDark } from '@/helpers/dark';
</script>

<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="1" :route="{ name: 'home' }">
      Element Plus
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'about' }">About</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
