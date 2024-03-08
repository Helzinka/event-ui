<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/events' }">
      <h3>Evènements</h3>
    </el-breadcrumb-item>
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
      v-for="event in eventStore.showEventByName(search)"
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
import { ArrowRight } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const eventStore = useEventStore();
const search = ref('');

onMounted(async () => {
  await eventStore.findEvents();
});
</script>
