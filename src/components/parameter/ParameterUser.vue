<template>
  <el-table
    :data="parameterStore.users"
    style="width: 100%"
    table-layout="auto"
  >
    <el-table-column
      v-for="(item, i) in parameterStore.getColumns"
      :prop="item"
      :label="item.toUpperCase()"
      :keys="i"
    />
    <el-table-column class="flex" fixed="right" label="Operations" width="160">
      <template #default="scope">
        <el-button type="primary" size="small">Editer</el-button>
        <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">
          Supprimer
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useParameterStore } from '@/store';
import { onMounted } from 'vue';

const parameterStore = useParameterStore();

onMounted(() => parameterStore.findUsers({}));

async function deleteUser(id: number) {
  parameterStore.deleteUser({ where: { id } });
}
</script>

<style>
/* use var css instead */
.ep-table .cell {
  padding: 0px;
}
</style>
