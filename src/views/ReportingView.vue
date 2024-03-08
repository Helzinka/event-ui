<template>
  <div>
    <!-- head -->
    <!-- <h1>Reporting</h1>
    <el-divider /> -->
    <el-row>
      <el-col :span="6">
        <el-statistic :value="reportingStore.showNumberEvents">
          <template #title>
            <div>
              Evènements crées
              <el-tooltip
                effect="dark"
                content="Evènements créés au total"
                placement="top"
              >
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic :value="reportingStore.showNumberEventsPending">
          <template #title>
            <div>
              Evènements en cours
              <el-tooltip
                effect="dark"
                content="Evènements en cours"
                placement="top"
              >
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic :value="reportingStore.showNumberEventsFuture">
          <template #title>
            <div>
              Evènements futures
              <el-tooltip
                effect="dark"
                content="Evènements dans le future"
                placement="top"
              >
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic :value="reportingStore.showNumberEventsPast">
          <template #title>
            <div>
              Evènements finis
              <el-tooltip
                effect="dark"
                content="Evènements dont la date est dépassé"
                placement="top"
              >
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useReportingStore } from '@/store/reporting.store';
import { onMounted } from 'vue';

import { InfoFilled } from '@element-plus/icons-vue';

const reportingStore = useReportingStore();

onMounted(async () => {
  await reportingStore.findEvents();
});
</script>
