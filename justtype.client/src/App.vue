<template>
  <div id="app">
    <AppHeader/>
    <router-view />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue';
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
