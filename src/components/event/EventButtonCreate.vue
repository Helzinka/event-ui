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
          v-model="form.rangeDate"
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
          v-model:file-list="uploadFile"
          :action="requestURL"
          :limit="1"
          method="post"
          name="file"
          :on-error="
            (error: any) => {
              uploadError = JSON.parse(error.message).message;
            }
          "
          :on-success="
            (data: FileResponse) => {
              console.log(data.data);
              responseData = data.data;
            }
          "
        >
          <template #trigger>
            <el-button type="primary">Envoyer le fichier</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              {{ uploadError }}
            </div>
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
import type { FileResponse } from '@/interfaces/event.interface';

const requestURL = 'http://localhost:3000/api/event/valideGuestList';
const eventStore = useEventStore();
const uploadFile = ref();
const dialogFormVisible = ref(false);
const upload = ref<UploadInstance>();
const ruleFormRef = ref<FormInstance>();
const uploadError = ref();
const responseData = ref();

const form = reactive({
  title: '',
  description: '',
  location: '',
  rangeDate: [] as Date[],
});

const rules = reactive<FormRules>({
  title: [
    {
      type: 'string',
      required: true,
      message: 'Veuillez entrer un nom',
      trigger: 'change',
    },
  ],
  location: [
    {
      type: 'string',
      required: true,
      message: 'Veuillez entrer un lieux',
      trigger: 'change',
    },
  ],
  description: [
    {
      type: 'string',
      required: true,
      message: 'Veuillez entrer une description',
      trigger: 'change',
    },
  ],
  rangeDate: [
    {
      required: true,
      validator: checkRangeDate,
      trigger: 'blur',
    },
  ],
});

function checkRangeDate(rule: any, value: any, callback: any) {
  if (!value.length) callback(new Error('Veuillez a entrer deux dates'));
  return true;
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      createEvent();
      formEl.resetFields();
    } else {
      console.error('error submit!', fields);
    }
  });
};

async function createEvent() {
  const { rangeDate, ...other } = form;
  const data = {
    ...other,
    start: rangeDate![0],
    end: rangeDate![1],
    guest: responseData.value,
  };
  await eventStore.createEvent(data);
  upload.value!.submit();
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
