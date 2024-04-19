<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex flex-col">
        <div class="mb-2 flex items-center">
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
          <el-tag v-for="(cat, i) in category" :key="i" class="mr-2">
            {{ cat.name }}
          </el-tag>
          <el-tag :type="status.color">
            {{ status.content }}
          </el-tag>
        </div>
      </div>
    </template>
    <div>{{ description }}</div>
    <div class="mt-4 flex items-center justify-between">
      <span class="text-gray-400">{{ ticketStatus }}</span>
      <el-button @click="goToActivity">
        <el-icon class="mr-2">
          <View />
        </el-icon>
        Détails
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { ArrowRight, View } from '@element-plus/icons-vue';
import dayjs, { type Dayjs } from 'dayjs';

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  id?: number;
  title?: string;
  description?: string;
  ticketMax?: number;
  ticketBuy?: number;
  // facto: better type
  category?: any;
  start: Dayjs;
  end: Dayjs;
}>();

const status = computed(() => {
  if (dayjs().isAfter(props.start) && dayjs().isBefore(props.end)) {
    return { content: 'En cours', color: 'success' };
  } else if (dayjs().isAfter(props.end)) {
    return { content: 'Finis', color: 'danger' };
  } else return { content: 'A venir', color: 'warning' };
});

const ticketStatus = computed(() => {
  return `${props.ticketBuy}/${props.ticketMax}`;
});

async function goToActivity() {
  await router.push({
    name: 'activityById',
    params: { eventTitle: route.params.eventTitle, activityTitle: props.title }, // replace
  });
}
</script>
