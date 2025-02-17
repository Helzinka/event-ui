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
  <el-row v-loading="eventStore.loading" :gutter="20">
    <div v-if="eventStore.error">{{ eventStore.error }}</div>
    <el-col
      v-else
      v-for="event in eventStore.filterEventsByName(search)"
      :key="event.id"
      class="mb-4"
      :span="12"
    >
      <EventCard :event="event" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store/event.store';
import { onMounted, ref } from 'vue';

const eventStore = useEventStore();
const search = ref('');

onMounted(async () => {
  await eventStore.findEvents();
});
</script>
