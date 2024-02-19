<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">
    <el-icon class="mr-2"><CirclePlusFilled /></el-icon>
    Créer un évènement
  </el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="Création d'un évènement"
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
          v-model="dateFromForm"
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
        <el-button type="primary" @click="createEvent()">Valider</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store';
import { type Ref, ref } from 'vue';
import { reactive } from 'vue';

import { CirclePlusFilled } from '@element-plus/icons-vue';

const eventStore = useEventStore();
const dateFromForm = ref();
const form = reactive({
  title: '',
  description: '',
  location: '',
  start: Date,
  end: Date,
});

const dialogFormVisible: Ref<boolean> = ref(false);

async function createEvent() {
  form.start = dateFromForm.value[0];
  form.end = dateFromForm.value[1];
  await eventStore.createEvent({ data: form });
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
