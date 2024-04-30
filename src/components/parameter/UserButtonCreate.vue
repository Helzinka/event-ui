<template>
  <el-button
    class="mt-4"
    type="primary"
    plain
    @click="dialogFormVisible = true"
  >
    <el-icon class="mr-2"><CirclePlusFilled /></el-icon>
    Créer un utilisateur
  </el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="Création d'un utilisateur"
    width="600px"
  >
    <el-form :model="form" label-position="right" label-width="120px">
      <el-form-item label="Prénom">
        <el-input v-model="form.name" placeholder="Nom de l'utilisateur" />
      </el-form-item>
      <el-form-item label="Nom">
        <el-input v-model="form.lastname" placeholder="Nom de famille" />
      </el-form-item>
      <el-form-item label="Mot de passe">
        <el-input
          v-model="form.password"
          placeholder="Mot de passe  de l'utilisateur"
        />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="Email de l'utilisateur" />
      </el-form-item>
      <el-form-item label="Companie">
        <el-input
          v-model="form.company"
          placeholder="Companie de l'utilisateur"
        />
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role" placeholder="Role" style="width: 240px">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Archipel">
        <el-checkbox
          v-model="form.archipel"
          :label="form.archipel ? 'oui' : 'non'"
          border
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary" @click="createManager">Valider</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { RoleSchema } from '@/interfaces/prisma.interface';
import { useUserManagerStore } from '@/store/userManager.store';
import { ref } from 'vue';
import { reactive } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';

const parameterStore = useUserManagerStore();

const dialogFormVisible = ref(false);
let form = reactive({
  name: '',
  lastname: '',
  password: '',
  email: '',
  role: '',
  archipel: false,
  company: '',
});

const roleOptions = RoleSchema.options
  .filter(item => ['MANAGER', 'ADMIN'].includes(item))
  .map(item => {
    return { label: item, value: item };
  });

async function createManager() {
  parameterStore.createManager({ ...form });
  dialogFormVisible.value = false;
}
</script>

<style scoped></style>
