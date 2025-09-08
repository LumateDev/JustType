<template>
  <div class="app-layout">
    <AppHeader v-if="showHeader" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "./composables/useTheme";
import { onMounted } from "vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

const { applyTheme, currentTheme } = useTheme();
const route = useRoute();

onMounted(() => {
  applyTheme(currentTheme.value);
});

const showHeader = computed(() => !route.meta.hideHeader);
const showFooter = computed(() => !route.meta.hideFooter);
</script>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
