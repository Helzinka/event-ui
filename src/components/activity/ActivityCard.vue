<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex flex-col">
        <div class="mb-2 flex items-center">
          <span class="text-lg">{{ activity.title }}</span>
          <el-divider direction="vertical" />
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(activity.start).format('DD MMMM YYYY HH:mm') }}
          </span>
          <el-icon class="text-sm text-gray-500 font-light">
            <ArrowRight />
          </el-icon>
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(activity.end).format('DD MMMM YYYY HH:mm') }}
          </span>
        </div>
        <div class="flex items-center">
          <el-tag v-for="(cat, i) in activity.category" :key="i" class="mr-2">
            {{ cat.name }}
          </el-tag>
          <el-tag :type="status.color">
            {{ status.content }}
          </el-tag>
        </div>
      </div>
    </template>
    <div>{{ activity.description }}</div>
    <div class="mt-4 flex items-center justify-between">
      <div class="flex gap-2">
        <span class="text-gray-400">{{ ticketStatus }}</span>
        <span class="text-gray-400">salle {{ activity.roomName }}</span>
      </div>
      <el-button-group>
        <el-button :icon="View" @click="goToActivity" />
        <ActivityButtonUpdate :activity />
        <el-popconfirm
          width="300"
          confirm-button-text="Oui"
          cancel-button-text="Non"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Etes vous sur de vouloir supprimer cette activitée "
          @confirm="activitiesStore.deleteActivity({ id: activity.id })"
        >
          <template #reference>
            <el-button :icon="Delete" />
          </template>
        </el-popconfirm>
      </el-button-group>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { ActivityResponse } from '@/interfaces/activity.interface';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowRight, View, Delete, InfoFilled } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useActivitiesStore } from '@/store/activities.store';
import { useSelectorStore } from '@/store/selector.store';

const router = useRouter();
const route = useRoute();
const activitiesStore = useActivitiesStore();
const selectorStore = useSelectorStore();
const props = defineProps<{ activity: ActivityResponse }>();

const status = computed(() => {
  if (
    dayjs().isAfter(props.activity.start) &&
    dayjs().isBefore(props.activity.end)
  ) {
    return { content: 'En cours', color: 'success' };
  } else if (dayjs().isAfter(props.activity.end)) {
    return { content: 'Finis', color: 'danger' };
  } else return { content: 'A venir', color: 'warning' };
}) as any;

const ticketStatus = computed(() => {
  return `${props.activity.ticketBuy}/${props.activity.ticketMax}`;
});

async function goToActivity() {
  await router.push({
    name: 'activityById',
    params: {
      eventId: route.params.eventId,
      activityId: props.activity.id,
    },
  });
  //cache
  selectorStore.setCurrentEvent(props.activity);
}
</script>
