<template>
  <div class="policy-page">
    <div class="policy-hero">
      <h1 class="policy-title">{{ title }}</h1>
      <p class="policy-subtitle">{{ subtitle }}</p>
      <div class="last-updated">Last updated: {{ lastUpdated }}</div>
    </div>

    <div class="policy-content">
      <slot name="content"></slot>

      <div class="policy-actions">
        <router-link v-if="backLink" :to="backLink" class="action-link">
          {{ backLinkText }}
        </router-link>
        <button class="accept-btn" @click="$router.go(-1)">Back to Safety</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  backLink?: RouteLocationRaw;
  backLinkText?: string;
}

withDefaults(defineProps<Props>(), {
  lastUpdated: "January 2025",
  backLinkText: "← Back",
});
</script>

<style lang="scss" scoped>
.policy-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

.policy-hero {
  text-align: center;
  padding: 1.5rem 0;

  .policy-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .policy-subtitle {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  .last-updated {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--color-surface-hover);
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }
}

.policy-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.policy-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);

  .action-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition-fast);

    &:hover {
      color: var(--color-primaryHover);
    }
  }

  .accept-btn {
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-fast);

    &:hover {
      background: var(--color-primaryHover);
      transform: translateY(-1px);
    }
  }
}

// ========== ОБЩИЕ СТИЛИ ДЛЯ ДОЧЕРНИХ КОМПОНЕНТОВ ==========
:deep() {
  .data-categories,
  .cookie-types {
    display: grid;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  .data-item,
  .cookie-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--color-surface-hover);
    border-radius: 12px;
    border-left: 4px solid var(--color-primary);

    .data-badge,
    .cookie-badge {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
      flex-shrink: 0;

      &.identity,
      &.essential {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
      }

      &.contact,
      &.analytical {
        background: rgba(var(--color-secondary-rgb), 0.1);
        color: var(--color-secondary);
      }

      &.technical,
      &.functional {
        background: rgba(var(--color-accent-rgb), 0.1);
        color: var(--color-accent);
      }
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: var(--color-text);
    }
  }

  .usage-list,
  .management-list {
    list-style: none;
    padding: 0;
    margin: 1.25rem 0;

    li {
      padding: 1rem 0;
      padding-left: 2rem;
      position: relative;
      font-size: 1.1rem;
      color: var(--color-text);
      line-height: 1.6;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--color-success);
        font-weight: 600;
        font-size: 1.2rem;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }
    }
  }

  .rights-grid,
  .third-party-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-top: 1.25rem;
  }

  .right-item,
  .third-party-item {
    padding: 1.25rem;
    background: var(--color-surface-hover);
    border-radius: 12px;
    text-align: center;
    transition: var(--transition-fast);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: var(--color-text-muted);
    }
  }

  .note {
    background: rgba(var(--color-primary-rgb), 0.05);
    padding: 1rem 1.25rem;
    border-radius: 8px;
    border-left: 4px solid var(--color-primary);
    font-style: italic;
    margin-top: 1.25rem;
  }
}

// ========== АДАПТИВНЫЕ СТИЛИ ==========
@media (max-width: 768px) {
  .policy-page {
    padding: 1rem;
  }

  .policy-hero {
    .policy-title {
      font-size: 2rem;
    }

    .policy-subtitle {
      font-size: 1rem;
    }
  }

  .policy-actions {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  :deep() {
    .data-item,
    .cookie-item {
      flex-direction: column;
      gap: 0.75rem;
    }

    .rights-grid,
    .third-party-grid {
      grid-template-columns: 1fr;
    }

    .usage-list li,
    .management-list li {
      font-size: 1rem;
      padding-left: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .policy-hero {
    .policy-title {
      font-size: 1.75rem;
    }
  }
}
</style>
