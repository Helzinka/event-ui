<template>
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-lg">{{ event.title }}</span>
          <el-divider direction="vertical" />
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(event.start).format('DD MMMM YYYY') }}
          </span>
          <el-icon class="text-sm text-gray-500 font-light">
            <ArrowRight />
          </el-icon>
          <span class="text-sm text-gray-500 font-light">
            {{ dayjs(event.end).format('DD MMMM YYYY') }}
          </span>
        </div>
        <!-- note: try to fix ts  -->
        <el-tag :type="status.color">{{ status.content }}</el-tag>
      </div>
    </template>
    <div>{{ event.description }}</div>
    <div class="mt-4 flex justify-end">
      <el-button-group>
        <el-button :icon="View" @click="acitiviesByEvent" />
        <EventButtonUpdate :event />
        <el-popconfirm
          width="300"
          confirm-button-text="Oui"
          cancel-button-text="Non"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Etes vous sur de vouloir supprimer cette évènement "
          @confirm="eventStore.deleteEvent({ id: props.event.id })"
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
import type { EventResponse } from '@/interfaces/event.interface';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Delete, View, InfoFilled } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { useEventStore } from '@/store/event.store';
import { useSelectorStore } from '@/store/selector.store';

const props = defineProps<{ event: EventResponse }>();
const eventStore = useEventStore();
const selectorStore = useSelectorStore();
const router = useRouter();

const status = computed(() => {
  if (dayjs().isAfter(props.event.start) && dayjs().isBefore(props.event.end))
    return { content: 'En cours', color: 'success' };
  else if (dayjs().isAfter(props.event.end))
    return { content: 'Finis', color: 'danger' };
  else return { content: 'A venir', color: 'warning' };
}) as any;

async function acitiviesByEvent() {
  await router.push({
    name: 'acitiviesByEvent',
    params: { eventId: props.event.id },
  });
  //cache
  selectorStore.setCurrentEvent(props.event);
}
</script>
@/store/event.store
