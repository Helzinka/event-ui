<template>
  <div>
    <!-- <h1>Evènements</h1>
    <el-divider /> -->
    <!-- actions event -->
    <div class="mb-6 flex justify-items-center gap-4">
      <el-input
        v-model="search"
        style="width: 200px"
        placeholder="rechercher un évènement"
      />
      <el-button type="primary" plain>Créer un évènement</el-button>
    </div>
  </div>
  <!-- card event -->
  <el-row :gutter="20">
    <el-col
      v-for="event in eventStore.filterEventByName(search)"
      :key="event.id"
      class="mb-4"
      :span="12"
    >
      <EventCard :title="event.title" :description="event.description" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store';
import { onMounted, type Ref, ref } from 'vue';

import EventCard from '@/components/EventCard';
const eventStore = useEventStore();

const search: Ref<string> = ref('');

onMounted(async () => {
  await eventStore.findEvents();
});
</script>
