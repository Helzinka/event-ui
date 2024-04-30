<template>
  <el-button @click="editEvent" :icon="Edit"></el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="Modification d'un évènement"
    width="600px"
  >
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="Nom">
        <el-input v-model="form.title" placeholder="Nom de l'activitée" />
      </el-form-item>
      <el-form-item label="Salle">
        <el-input v-model="form.roomName" placeholder="Salle de l'activitée" />
      </el-form-item>
      <el-form-item label="Intervenant">
        <el-input
          v-model="form.speaker"
          placeholder="Intervenant de l'activitée"
        />
      </el-form-item>
      <el-form-item label="Type de salle">
        <el-select
          v-model="form.typeRoom"
          placeholder="Type salle"
          style="width: 240px"
        >
          <el-option
            v-for="item in typeRoom"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Catégorie">
        <div class="mr-2">
          <el-input
            v-if="createCategorySwitch"
            v-model="newCategory"
            placeholder="nom de la catégorie"
          />
          <el-select
            v-else
            v-model="form.category"
            placeholder="Categorie de l'activité"
            style="width: 240px"
          >
            <el-option
              v-for="item in activityStore.showCategories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <el-button
          type="primary"
          plain
          @click="createCategorySwitch = !createCategorySwitch"
        >
          {{ createCategoryButtonName }}
        </el-button>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="form.description"
          :rows="2"
          type="textarea"
          placeholder="Description"
        />
      </el-form-item>
      <el-form-item label="Tickets max">
        <el-input-number v-model="form.ticketMax" :min="1" />
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
import { ref, reactive, computed } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { useActivityStore } from '@/store/activity.store';

import {
  TypeRoomSchema,
  type ActivityResponse,
} from '@/interfaces/activity.interface';

const props = defineProps<{ activity: ActivityResponse }>();
const activityStore = useActivityStore();
const createCategorySwitch = ref(false);
const dialogFormVisible = ref(false);
const formDate = ref();
const newCategory = ref('');
const form = reactive({} as ActivityResponse);

const typeRoom = TypeRoomSchema.options.map(item => {
  return { label: item, value: item };
});

const createCategoryButtonName = computed(() => {
  return createCategorySwitch.value
    ? 'Sélectionner une categorie'
    : 'Créer une categorie';
});

function editEvent() {
  Object.assign(form, props.activity);
  // note: care about category
  form.category = form.category[0]?.name;
  formDate.value = [form.start, form.end];
  dialogFormVisible.value = true;
}

async function updateEvent() {
  if (form) {
    form.start = formDate.value[0];
    form.end = formDate.value[1];
  }
  await activityStore.updateActivity(form);
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
