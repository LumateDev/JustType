<template>
  <div class="wip-container">
    <el-result :title="title" :sub-title="subtitle">
      <template #icon>
        <div class="icon-wrapper">
          <div class="pulse-ring"></div>
          <el-icon :size="100" class="wip-icon"><Tools /></el-icon>
        </div>
      </template>
      <template #extra>
        <el-button type="primary" @click="goHome">На главную</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { Tools } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const title = computed(() => (route.meta.wipTitle as string) || "Раздел в разработке");
const subtitle = computed(() => (route.meta.wipSubtitle as string) || "Скоро здесь будет контент");

const goHome = () => router.push("/home");
</script>

<style scoped>
.wip-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
}

.icon-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  display: grid;
  place-items: center;
}

.wip-icon {
  animation: float 3s ease-in-out infinite;
  color: var(--el-color-primary);
  filter: drop-shadow(0 6px 16px rgba(64, 158, 255, 0.25));
}

.pulse-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid var(--el-color-primary);
  border-radius: 50%;
  animation: pulse 2.4s ease-out infinite;
  opacity: 0.6;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
