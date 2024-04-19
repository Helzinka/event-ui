<template>
  <BaseBreadCrumb />
  <div class="mb-6 flex justify-items-center gap-4">
    <el-input
      v-model="search"
      style="width: 200px"
      placeholder="rechercher une activitée"
    />
    <ActivityButtonCreate />
  </div>
  <el-row :gutter="20">
    <el-col
      v-for="activity in activityStore.filterActivityByName(search)"
      :key="activity.id"
      class="mb-4"
      :span="12"
    >
      <ActivityCard
        :id="activity.id"
        :title="activity.title"
        :description="activity.description"
        :ticket-max="activity.ticketMax"
        :ticket-buy="activity.ticketBuy"
        :category="activity.category"
        :start="dayjs(activity.start)"
        :end="dayjs(activity.end)"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/store/activity.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const route = useRoute();
const activityStore = useActivityStore();
const search = ref('');

onMounted(async () => {
  await activityStore.findActivities({
    eventTitle: route.params.eventTitle,
  });
});
</script>

<style scoped></style>
