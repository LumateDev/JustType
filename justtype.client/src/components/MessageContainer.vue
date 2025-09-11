<template>
  <div class="message-container">
    <TransitionGroup name="slide-fade" tag="div">
      <MessageItem
        v-for="msg in messages"
        :key="msg.id"
        :type="msg.type"
        :message="msg.message"
        @close="remove(msg.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from "@/services/message";
import MessageItem from "./MessageItem.vue";

const { messages, remove } = useMessage();
</script>

<style scoped lang="scss">
.message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
}

:deep(.message-item) {
  pointer-events: all;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 0.3s ease;
}
</style>
