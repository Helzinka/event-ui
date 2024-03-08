<template>
  <el-button @click="copyEvent" :icon="Edit"></el-button>
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
import { cloneDeep } from 'lodash';
import type { Event } from '@/interfaces/event.interface';
import { useEventStore } from '@/store/event.store';

const props = defineProps<{ event: Event }>();
const eventStore = useEventStore();
const dialogFormVisible = ref(false);
const formDate = ref();
let form = ref<Event>();

function copyEvent() {
  form.value = cloneDeep(props.event);
  console.log(form);
  formDate.value = [form.value.start, form.value.end];
  dialogFormVisible.value = true;
}

async function updateEvent() {
  if (form.value) {
    form.value.start = formDate.value[0];
    form.value.end = formDate.value[1];
  }
  await eventStore.updateEvent({ data: form });
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
