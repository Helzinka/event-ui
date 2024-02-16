<template>
  <div>
    <h1>Evènements</h1>
    <el-divider />

    <div class="flex justify-items-center">
      <el-input
        v-model="search"
        style="width: 200px"
        placeholder="rechercher un évènement"
      />
      <el-button>Chercher</el-button>
      <el-button type="primary" plain>Créer un évènement</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';

const search: Ref<string> = ref('');
</script>
