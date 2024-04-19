<template>
  <el-table :data="parameterStore.users" style="width: 100%">
    <el-table-column
      v-for="(item, i) in parameterStore.getColumns"
      :prop="item"
      :label="item"
      :keys="i"
      :sortable="
        item == 'email' || item == 'name' || item == 'lastname' ? true : false
      "
    >
      <template #default="scope">
        <div
          v-if="
            parameterStore.edit && parameterStore.editingUser.id == scope.row.id
          "
        >
          <el-select
            v-if="item == 'role'"
            v-model="parameterStore.editingUser.role"
            placeholder="Select"
            style="width: 100px"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            class="pr-6"
            v-else-if="item !== 'id'"
            v-model="parameterStore.editingUser[item]"
          ></el-input>
          <div class="pr-6" v-else>{{ scope.row[item] }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column class="flex" fixed="right" label="actions" width="160">
      <template #default="scope">
        <div
          v-if="
            parameterStore.edit && parameterStore.editingUser.id == scope.row.id
          "
        >
          <el-button link type="primary" size="small" @click="parameterStore.saveUser">
            sauvegarder
          </el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="parameterStore.edit = false"
          >
            annuler
          </el-button>
        </div>
        <div v-else>
          <el-button
            link
            type="primary"
            size="small"
            @click="parameterStore.editUser(scope.row.id)"
          >
            editer
          </el-button>
          <el-popconfirm
            width="300"
            confirm-button-text="Oui"
            cancel-button-text="Non"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Etes vous sur de vouloir supprimer cette utilisateur "
            @confirm="parameterStore.deleteUser({ id: scope.row.id })"
          >
            <template #reference>
              <el-button link type="danger" size="small">supprimer</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <CreateUser />
</template>

<script setup lang="ts">
import { useUserManagerStore } from '@/store/userManager.store';
import { onMounted } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { RoleSchema } from '@/interfaces/prisma.interface';

const parameterStore = useUserManagerStore();

onMounted(() => parameterStore.find());

const selectOptions = RoleSchema.options.map(item => {
  return { label: item, value: item };
});
</script>

<style>
/* use var css instead */
.ep-table .cell {
  padding: 0px;
}
</style>
