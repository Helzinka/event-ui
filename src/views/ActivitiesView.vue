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
      v-for="activity in activitiesStore.filterActivityByName(search)"
      :key="activity.id"
      class="mb-4"
      :span="12"
    >
      <ActivityCard :activity="activity" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useActivitiesStore } from '@/store/activities.store';
import { useEventStore } from '@/store/event.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activitiesStore = useActivitiesStore();
const eventStore = useEventStore();
const search = ref('');

onMounted(async () => {
  await eventStore.findOneEvent(route.params.eventId as string);
  await activitiesStore.findCategories({
    eventId: route.params.eventId as string,
  });
});
</script>

<style scoped></style>
