<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`">
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  path: string
  size?: number | string
  className?: string
}

const { path, size = 24 } = defineProps<Props>()
const viewBoxSize = 24
</script>

<style scoped lang="scss">
.mdi-icon {
  transition: var(--transition-fast);
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
}
</style>
