<template>
  <el-menu mode="horizontal" :ellipsis="false" router class="items-center">
    <el-menu-item class="text-lg font-bold" index="1" :route="{ name: 'home' }">
      Aviso Event
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
    <div class="grow" />
    <div>
      <span class="mr-4">{{ login.user.name }}</span>
      <el-button
        :type="isConnectedButtonColor"
        plain
        class="mr-2"
        @click="router.push('/login')"
      >
        {{ isConnectedButtonMessage }}
      </el-button>
    </div>
  </el-menu>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { toggleDark } from '@/helpers/dark';

const router = useRouter();
const login = useLoginStore();

const isConnectedButtonMessage = computed(() => {
  return login.isConnected ? 'se déconnecter' : 'se connecter';
});
const isConnectedButtonColor = computed(() => {
  return login.isConnected ? 'danger' : 'primary';
});
</script>
