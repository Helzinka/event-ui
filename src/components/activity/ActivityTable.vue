<template>
  <el-descriptions
    :title="'Activitée : ' + activityStore.currentActivity.title"
  >
    <el-descriptions-item label="Début">
      {{ dayjs(activityStore.currentActivity.start).format('DD/MM/YYYY') }}
    </el-descriptions-item>
    <el-descriptions-item label="Fin">
      {{ dayjs(activityStore.currentActivity.end).format('DD/MM/YYYY') }}
    </el-descriptions-item>
    <el-descriptions-item label="Status">
      <el-tag size="small" :type="status.color">{{ status.content }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Tickets achetés">
      {{ ticketsSold.number }} ({{ ticketsSold.percent }})
    </el-descriptions-item>
    <el-descriptions-item label="Tickets utilisés">
      {{ scanTickets.number }} ({{ scanTickets.percent }})
    </el-descriptions-item>
    <el-descriptions-item label="Tickets en attente">
      {{ ticketsPending.number }} ({{ ticketsPending.percent }})
    </el-descriptions-item>
  </el-descriptions>
  <!-- <UserButtonCreate /> -->
</template>

<script setup lang="ts">
import { useActivityStore } from '@/store/activity.store';
import dayjs from 'dayjs';
import { computed } from 'vue';

const activityStore = useActivityStore();

const ticketsSold = computed(() => {
  return {
    number: `${activityStore.currentActivity.ticketBuy}/${activityStore.currentActivity.ticketMax}`,
    percent:
      Math.round(
        (activityStore.currentActivity.ticketBuy /
          activityStore.currentActivity.ticketMax) *
          100
      ) + '%',
  };
});

// note: return ticket used by activité
const ticketsPending = computed(() => {
  return {
    number: 22,
    percent:
      Math.round((22 / activityStore.currentActivity.ticketMax) * 100) + '%',
  };
});

// note: return ticket used by activité
const scanTickets = computed(() => {
  return {
    number: `6/${activityStore.currentActivity.ticketMax}`,
    percent:
      Math.round((6 / activityStore.currentActivity.ticketMax) * 100) + '%',
  };
});

const status = computed(() => {
  if (
    dayjs().isAfter(activityStore.currentActivity.start) &&
    dayjs().isBefore(activityStore.currentActivity.end)
  )
    return { content: 'En cours', color: 'success' };
  else if (dayjs().isAfter(activityStore.currentActivity.end))
    return { content: 'Finis', color: 'danger' };
  else return { content: 'A venir', color: 'warning' };
}) as any;
</script>

<style>
/* use var css instead */
.ep-table .cell {
  padding: 0px;
}
</style>
@/store/activities.store
