<template>
  <button
    @click="onClick"
    class="theme-toggle"
    :aria-label="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`"
  >
    <div class="toggle-track">
      <div class="toggle-thumb" :class="{ 'is-dark': currentTheme === 'dark' }">
        <Transition name="icon-switch" mode="out-in">
          <MdiIcon
            v-if="currentTheme === 'light'"
            :path="mdiWhiteBalanceSunny"
            :size="16"
            class="icon"
            key="sun"
            color="white"
          />
          <MdiIcon
            v-else
            :path="mdiWeatherNight"
            :size="16"
            class="icon"
            key="moon"
            color="white"
          />
        </Transition>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import MdiIcon from '@/components/MdiIcon.vue'
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js'

const { currentTheme, toggleTheme } = useTheme()

const onClick = (e: MouseEvent) => {
  toggleTheme(e)
}
</script>

<style scoped lang="scss">
.theme-toggle {
  position: relative;
  width: 60px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  .toggle-track {
    width: 100%;
    height: 100%;
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 16px;
    position: relative;
  }

  .toggle-thumb {
    $thumb-size: 24px;
    $offset: 2.5px;

    position: absolute;
    top: $offset;
    left: $offset;
    width: $thumb-size;
    height: $thumb-size;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-elastic);
    will-change: transform;

    &.is-dark {
      $track-inner-width: 60px - 4px; // 60px total - 2px border * 2
      transform: translateX($track-inner-width - $thumb-size - $offset * 2);
    }

    .icon {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &:hover {
    .toggle-track {
      border-color: var(--color-primary);
      background: var(--color-surface-hover, var(--color-surface));
    }

    .toggle-thumb {
      box-shadow: var(--shadow-hover);
    }
  }

  &:active {
    .toggle-thumb {
      box-shadow: var(--shadow-active);
    }
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary);
    border-radius: 18px;
  }
}

.icon-switch-enter-active,
.icon-switch-leave-active {
  transition: var(--transition-fast);
}

.icon-switch-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-90deg);
}

.icon-switch-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(90deg);
}

@media (prefers-reduced-motion: reduce) {
  .toggle-thumb {
    transition: var(--transition-base) !important;
  }
}
</style>
