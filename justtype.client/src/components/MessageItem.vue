<template>
  <div :class="['message-item', `message-item--${type}`]">
    <div class="message-item__icon">
      <MdiIcon :path="iconPath" :size="20" />
    </div>
    <p class="message-item__content">{{ message }}</p>
    <button class="message-item__close" @click="$emit('close')">
      <MdiIcon :path="mdiClose" :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MessageType } from "@/services/message";
import MdiIcon from "./MdiIcon.vue";
import {
  mdiCheckCircleOutline,
  mdiAlertCircleOutline,
  mdiInformationOutline,
  mdiAlertOutline,
  mdiClose,
} from "@mdi/js";

const props = defineProps<{
  type: MessageType;
  message: string;
}>();

defineEmits(["close"]);

const iconPath = computed(() => {
  switch (props.type) {
    case "success":
      return mdiCheckCircleOutline;
    case "error":
      return mdiAlertCircleOutline;
    case "warning":
      return mdiAlertOutline;
    case "info":
    default:
      return mdiInformationOutline;
  }
});
</script>

<style scoped lang="scss">
.message-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  width: 340px;
  max-width: 90vw;
  transition: var(--transition-base);
  border-left-width: 5px;

  &--success {
    border-left-color: var(--color-success);
    .message-item__icon {
      color: var(--color-success);
    }
  }
  &--error {
    border-left-color: var(--color-error);
    .message-item__icon {
      color: var(--color-error);
    }
  }
  &--warning {
    border-left-color: var(--color-warning);
    .message-item__icon {
      color: var(--color-warning);
    }
  }
  &--info {
    border-left-color: var(--color-primary);
    .message-item__icon {
      color: var(--color-primary);
    }
  }
}

.message-item__icon {
  flex-shrink: 0;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-item__content {
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
  margin: 0;
  font-family: "Inter", sans-serif;
}

.message-item__close {
  flex-shrink: 0;
  margin-left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-textMuted);
  transition: var(--transition-fast);

  &:hover {
    color: var(--color-text);
    background-color: var(--color-surfaceHover);
  }
}
</style>
