<template>
  <div class="policy-card" :class="{ hoverable }">
    <div v-if="icon" class="card-icon">{{ icon }}</div>
    <h2 v-if="title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string;
  title?: string;
  hoverable?: boolean;
}

withDefaults(defineProps<Props>(), {
  hoverable: true,
});
</script>

<style lang="scss" scoped>
.policy-card {
  background: var(--color-surface);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;

  &.hoverable {
    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--color-primary);
      border-radius: 2px;
    }
  }

  :slotted(p) {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
}

@media (max-width: 768px) {
  .policy-card {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .policy-card {
    padding: 1.25rem;

    .card-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    :slotted(p) {
      font-size: 1rem;
    }
  }
}
</style>
