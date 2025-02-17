<template>
  <el-button @click="editEvent" :icon="Edit"></el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="Modification d'un évènement"
    width="600px"
  >
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="Nom">
        <el-input v-model="form.title" placeholder="Nom de l'évènement" />
      </el-form-item>
      <el-form-item label="Lieu">
        <el-input v-model="form.location" placeholder="Lieu de l'évènement" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="form.description"
          :rows="2"
          type="textarea"
          placeholder="Description"
        />
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker
          v-model="formDate"
          type="datetimerange"
          range-separator="au"
          start-placeholder="Début"
          end-placeholder="Fin"
          unlink-panels
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary" @click="updateEvent">Valider</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import type { EventResponse } from '@/interfaces/event.interface';
import { useEventStore } from '@/store/event.store';

const props = defineProps<{ event: EventResponse }>();
const eventStore = useEventStore();
let dialogFormVisible = ref(false);
let formDate = ref();
let form = reactive({} as EventResponse);

function editEvent() {
  Object.assign(form, props.event);
  formDate.value = [form.start, form.end];
  dialogFormVisible.value = true;
}

async function updateEvent() {
  if (form) {
    form.start = formDate.value[0];
    form.end = formDate.value[1];
  }
  await eventStore.updateEvent({ ...form });
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
@/store/events.store @/store/event.store
