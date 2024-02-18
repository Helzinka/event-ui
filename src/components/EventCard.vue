<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
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
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ArrowRight } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';

const props = defineProps<{
  title?: string;
  description?: string;
  start: Dayjs;
  end: Dayjs;
}>();

const status = computed(() => {
  if (dayjs().isAfter(props.start) && dayjs().isBefore(props.end))
    return { content: 'En cours', color: 'success' };
  else if (dayjs().isAfter(props.end))
    return { content: 'Finis', color: 'danger' };
  else return { content: 'A venir', color: 'warning' };
});
</script>
