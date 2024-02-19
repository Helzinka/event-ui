<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex flex-col">
        <div class="flex items-center mb-2">
          <span class="text-lg">{{ title }}</span>
          <el-divider direction="vertical" />
          <span class="text-sm text-gray-500 font-light">
            {{ start.format('DD MMMM YYYY HH:mm') }}
          </span>
          <el-icon class="text-sm text-gray-500 font-light">
            <ArrowRight />
          </el-icon>
          <span class="text-sm text-gray-500 font-light">
            {{ end.format('DD MMMM YYYY HH:mm') }}
          </span>
        </div>
        <div class="flex items-center">
          <el-tag class="mr-2" v-for="cat in category">{{ cat.name }}</el-tag>
          <el-tag :type="status.color">{{ status.content }}</el-tag>
        </div>
      </div>
    </template>
    <div>{{ description }}</div>
    <div class="mt-4 flex justify-between items-center">
      <span class="text-gray-400">{{ ticketStatus }}</span>
      <el-button @click="goToActivity">
        <el-icon class="mr-2"><View /></el-icon>
        Détails
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { ArrowRight, View } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';

const props = defineProps<{
  id?: number;
  title?: string;
  description?: string;
  ticketMax?: number;
  ticketBuy?: number;
  category?: any; // replace
  start: Dayjs;
  end: Dayjs;
}>();

const router = useRouter();

const status = computed(() => {
  if (dayjs().isAfter(props.start) && dayjs().isBefore(props.end))
    return { content: 'En cours', color: 'success' };
  else if (dayjs().isAfter(props.end))
    return { content: 'Finis', color: 'danger' };
  else return { content: 'A venir', color: 'warning' };
});

const ticketStatus = computed(() => {
  return `${props.ticketBuy}/${props.ticketMax}`;
});

async function goToActivity() {
  await router.push({
    name: 'activityById',
    params: { eventId: 3, activityId: 1 }, // replace
  });
}
</script>
