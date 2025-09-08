<template>
  <Menu as="div" class="dropdown-container" v-slot="{ open }">
    <MenuButton class="dropdown-trigger">
      <div class="user-avatar">
        <span>{{ initials }}</span>
      </div>
      <span class="user-name">{{ userName }}</span>
      <svg class="dropdown-icon" :class="{ 'is-open': open }" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </MenuButton>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="dropdown-menu">
        <div class="menu-header">
          <p class="menu-email">{{ userEmail }}</p>
        </div>

        <div class="menu-section">
          <MenuItem v-slot="{ active }">
            <button class="menu-item" :class="{ 'is-active': active }">
              <svg class="menu-icon" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              Profile Settings
            </button>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <button class="menu-item" :class="{ 'is-active': active }">
              <svg class="menu-icon" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              Preferences
            </button>
          </MenuItem>
        </div>

        <div class="menu-divider"></div>

        <div class="menu-section">
          <MenuItem v-slot="{ active }">
            <button
              class="menu-item text-danger"
              :class="{ 'is-active': active }"
              @click="handleLogout"
            >
              <svg class="menu-icon" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

interface Props {
  userName: string;
  userEmail: string;
}

const emit = defineEmits<{
  (e: "logout"): void;
}>();

const handleLogout = () => {
  emit("logout");
};

const props = defineProps<Props>();

const initials = computed(() => {
  return props.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition-fast);
  outline: none;
}

.dropdown-trigger:hover {
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.dropdown-trigger:focus {
  border-color: var(--color-primary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.user-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  fill: var(--color-textMuted);
  transition: transform 0.2s ease;
}

.dropdown-icon.is-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 240px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  outline: none;
  z-index: 50;
}

.menu-header {
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.menu-email {
  font-size: 13px;
  color: var(--color-textMuted);
}

.menu-section {
  padding: 8px;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--color-text);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.menu-item.is-active {
  background: var(--color-background);
  color: var(--color-primary);
}

.menu-item.text-danger {
  color: var(--color-error);
}

.menu-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.menu-divider {
  height: 1px;
  background: var(--color-border);
  margin: 4px 0;
}
</style>
