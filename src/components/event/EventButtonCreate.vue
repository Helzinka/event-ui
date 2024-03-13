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
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="Nom" prop="title">
        <el-input v-model="form.title" placeholder="Nom de l'évènement" />
      </el-form-item>
      <el-form-item label="Lieu" prop="location">
        <el-input v-model="form.location" placeholder="Lieu de l'évènement" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="form.description"
          :rows="2"
          type="textarea"
          placeholder="Description"
        />
      </el-form-item>
      <el-form-item label="Date" prop="rangeDate">
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          range-separator="au"
          start-placeholder="Début"
          end-placeholder="Fin"
          unlink-panels
        />
      </el-form-item>
      <el-form-item label="Liste invité">
        <el-upload
          ref="upload"
          :action="requestURL"
          :limit="1"
          name="guestFile"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">Envoyer le fichier</el-button>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Valider
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from '@/store/event.store';
import { ref, reactive } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import type { UploadInstance } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const requestURL = 'http://localhost:3000/api/event/file';
const eventStore = useEventStore();
const rangeDate = ref();
const dialogFormVisible = ref(false);
const upload = ref<UploadInstance>();
const ruleFormRef = ref<FormInstance>();

const form = reactive<{
  title?: string;
  description?: string;
  location?: string;
  start?: string;
  end?: string;
}>({});

const rules = reactive<FormRules>({
  title: [
    {
      type: 'string',
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  location: [
    {
      type: 'string',
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  description: [
    {
      type: 'string',
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  rangeDate: [
    {
      required: true,
      message: 'Please pick a date',
      validator: checkRangeDate,
      trigger: 'blur',
    },
  ],
});

function checkRangeDate(rule: any, value: any, callback: any) {
  console.log(value);
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

async function createEvent() {
  form.start = rangeDate.value[0];
  form.end = rangeDate.value[1];
  await eventStore.createEvent({ data: form });
  dialogFormVisible.value = false;
}

function submitUpload() {
  upload.value!.submit();
}
</script>

<style scoped></style>
