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
      <ActivityCard :activity="activity" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/store/activity.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activityStore = useActivityStore();
const search = ref('');

onMounted(async () => {
  activityStore.setCurrentEvent(route.params.eventTitle as string);
  await activityStore.findActivities({
    eventTitle: route.params.eventTitle as string,
  });
  await activityStore.findCategories({
    eventTitle: route.params.eventTitle as string,
  });
});
</script>

<style scoped></style>
