<template>
  <BaseBreadCrumb />
  <div class="mb-6 flex justify-items-center gap-4">
    <el-input
      v-model="search"
      style="width: 200px"
      placeholder="rechercher un évènement"
    />
    <EventButtonCreate />
  </div>
  <!-- card event -->
  <el-row v-loading="eventsStore.loading.event" :gutter="20">
    <div v-if="eventsStore.error.message">{{ eventsStore.error.message }}</div>
    <el-col
      v-else
      v-for="event in eventsStore.filterEventsByName(search)"
      :key="event.id"
      class="mb-4"
      :span="12"
    >
      <EventCard :event="event" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/store/events.store';
import { onMounted, ref } from 'vue';

const eventsStore = useEventsStore();
const search = ref('');

onMounted(async () => {
  await eventsStore.findEvents();
});
</script>
@/store/events.store
