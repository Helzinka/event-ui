<template>
  <!-- <h1>Evènements</h1>
    <el-divider /> -->
  <!-- actions event -->
  <el-breadcrumb :separator-icon="ArrowRight" class="mb-4">
    <el-breadcrumb-item :to="{ path: '/events' }">Evènement</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="mb-6 flex justify-items-center gap-4">
    <el-input
      v-model="search"
      style="width: 200px"
      placeholder="rechercher un évènement"
    />
    <EventCreate />
  </div>
  <!-- card event -->
  <el-row v-loading="eventStore.loading.event" :gutter="20">
    <el-col
      v-for="event in eventStore.filterEventByName(search)"
      :key="event.id"
      class="mb-4"
      :span="12"
    >
      <EventCard
        :id="event.id"
        :title="event.title"
        :description="event.description"
        :start="dayjs(event.start)"
        :end="dayjs(event.end)"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store';
import { onMounted, type Ref, ref } from 'vue';

import { ArrowRight } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const eventStore = useEventStore();
const search: Ref<string> = ref('');

onMounted(async () => {
  await eventStore.findEvents();
});
</script>
