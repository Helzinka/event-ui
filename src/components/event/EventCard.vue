<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-lg">{{ event.title }}</span>
          <el-divider direction="vertical" />
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(event.start).format('DD MMMM YYYY') }}
          </span>
          <el-icon class="text-sm text-gray-500 font-light">
            <ArrowRight />
          </el-icon>
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(event.end).format('DD MMMM YYYY') }}
          </span>
        </div>
        <el-tag :type="status.color">{{ status.content }}</el-tag>
      </div>
    </template>
    <div>{{ event.description }}</div>
    <div class="mt-4 flex justify-end">
      <el-button-group class="ml-4">
        <el-button :icon="View" @click="goToActivity" />
        <EventUpdate :event />
        <el-button :icon="Delete" />
      </el-button-group>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Event } from '@/interfaces/event.interface';
import { ArrowRight, Delete, View } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useEventStore } from '@/store/event.store';

const props = defineProps<{ event: Event }>();
const eventStore = useEventStore();

const router = useRouter();

const status = computed(() => {
  if (dayjs().isAfter(props.event.start) && dayjs().isBefore(props.event.end))
    return { content: 'En cours', color: 'success' };
  else if (dayjs().isAfter(props.event.end))
    return { content: 'Finis', color: 'danger' };
  else return { content: 'A venir', color: 'warning' };
});

async function goToActivity() {
  await router.push({ name: 'eventByid', params: { eventId: props.event.id } });
}
</script>
