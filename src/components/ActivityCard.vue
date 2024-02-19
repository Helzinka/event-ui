<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-lg">{{ title }}</span>
          <el-divider direction="vertical" />
          <span class="text-sm text-gray-500 font-light">
            {{ start.format('DD MMMM YYYY') }}
          </span>
          <el-icon class="text-sm text-gray-500 font-light">
            <ArrowRight />
          </el-icon>
          <span class="text-sm text-gray-500 font-light">
            {{ end.format('DD MMMM YYYY') }}
          </span>
        </div>
        <el-tag :type="status.color">{{ status.content }}</el-tag>
      </div>
    </template>
    <div>{{ description }}</div>
    <div class="mt-4 flex justify-end">
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

async function goToActivity() {
  await router.push({
    name: 'activityById',
    params: { eventId: 3, activityId: 1 },
  });
}
</script>
