<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright">© 2025 All right reserved</p>
      <div class="links">
        <router-link :to="{ name: 'privacy' }" class="link">Privacy</router-link>
        <router-link :to="{ name: 'cookies' }" class="link">Cookies</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { RouterLink } from "vue-router";

const { colors } = useTheme();
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: var(--color-surface);
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  transition: var(--transition-base);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .copyright {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 0.875rem;
      font-weight: 400;
    }

    .links {
      display: flex;
      gap: 1.5rem;

      .link {
        color: var(--color-text-muted);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        transition: var(--transition-fast);
        position: relative;

        &:hover {
          color: var(--color-primary);
        }

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--color-primary);
          transition: var(--transition-fast);
        }

        &:hover::after {
          width: 100%;
        }
      }
    }
  }
}

// Адаптивность для мобильных устройств
@media (max-width: 768px) {
  .app-footer {
    .footer-content {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }
  }
}
</style>
