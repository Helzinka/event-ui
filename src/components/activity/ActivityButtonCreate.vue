<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">
    <el-icon class="mr-2"><CirclePlusFilled /></el-icon>
    Créer une activitée
  </el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="Création d'une activitée"
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
            v-model="form.category"
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
        <el-button type="primary" @click="createActivity">Valider</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/store/activity.store';
import { ref, reactive, computed } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { TypeRoomSchema } from '@/interfaces/activity.interface';

const activityStore = useActivityStore();
const createCategorySwitch = ref(false);
const dateFromForm = ref();
const dialogFormVisible = ref(false);
let form = reactive({
  title: '',
  description: '',
  roomName: '',
  speaker: '',
  typeRoom: '',
  category: '',
  ticketMax: 0,
  start: Date,
  end: Date,
});

const typeRoom = TypeRoomSchema.options.map(item => {
  return { label: item, value: item };
});

const createCategoryButtonName = computed(() => {
  return createCategorySwitch.value
    ? 'Sélectionner une categorie'
    : 'Créer une categorie';
});

async function createActivity() {
  form.start = dateFromForm.value[0];
  form.end = dateFromForm.value[1];
  await activityStore.createActivity(form);
  dialogFormVisible.value = false;
  form = {
    title: '',
    description: '',
    roomName: '',
    speaker: '',
    typeRoom: '',
    category: '',
    ticketMax: 0,
    start: Date,
    end: Date,
  };
}
</script>

<style scoped></style>
