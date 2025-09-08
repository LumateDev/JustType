<template>
  <div class="animated-input-wrapper">
    <div class="input-container">
      <div v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="handleFocus"
        @blur="handleBlur"
        class="animated-input"
        :class="{
          'has-value': hasValue,
          'has-error': error,
          'is-focused': isFocused,
          'has-prefix': $slots.prefix,
          'has-suffix': $slots.suffix,
        }"
        :placeholder="isFocused ? placeholder : ' '"
      />

      <label :for="id" class="animated-label">
        <span class="label-text">{{ label }}</span>
      </label>

      <div v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </div>
    </div>

    <Transition name="error">
      <span v-if="error" class="error-text">{{ error }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  id: string
  label: string
  type?: string
  modelValue: string
  error?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: ' ',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
  blur: []
}>()

const isFocused = ref(false)
const hasValue = computed(() => props.modelValue.length > 0)

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}
</script>

<style scoped lang="scss">
.animated-input-wrapper {
  margin-bottom: 24px;
}

.input-container {
  position: relative;
}

.animated-input {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  font-size: 16px;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  transition: var(--transition-base);
  outline: none;

  /* Отступы для иконок через SCSS вложенность */
  &.has-prefix {
    padding-left: 48px;
  }

  &.has-suffix {
    padding-right: 48px;
  }

  &.has-prefix.has-suffix {
    padding-left: 48px;
    padding-right: 48px;
  }

  &:hover:not(.has-error):not(:focus) {
    border-color: var(--color-hover);
  }

  &:focus {
    border-color: var(--color-focus);
    background: var(--color-surface);
  }

  &.has-error {
    border-color: var(--color-error);
  }
}

.animated-label {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: var(--transition-base);
  padding: 0 16px;
  z-index: 1;

  .has-prefix ~ & {
    padding-left: 48px;
  }
}

.label-text {
  font-size: 16px;
  color: var(--color-textMuted);
  background: var(--color-background);
  padding: 0 4px;
  transition: var(--transition-fast);
}

/* Когда инпут в фокусе или имеет значение */
.animated-input {
  &:focus ~ .animated-label,
  &.has-value ~ .animated-label {
    transform: translateY(-38px);

    .label-text {
      font-size: 1rem;
      font-weight: 500;
      background-color: transparent;
    }
  }

  &:focus ~ .animated-label .label-text {
    color: var(--color-accent);
  }

  &.has-error ~ .animated-label .label-text {
    color: var(--color-error);
  }

  /* Возвращаем label при floating с префиксом */
  &.has-prefix {
    &:focus ~ .animated-label,
    &.has-value ~ .animated-label {
      padding-left: 16px;
    }
  }
}

/* Префикс (иконка) */
.input-prefix {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-textMuted);
  transition: var(--transition-fast);

  .animated-input:focus ~ & {
    color: var(--color-primary);
  }
}

/* Суффикс (кнопка показа пароля) */
.input-suffix {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Анимация иконки при фокусе */
.animated-input:focus ~ .input-prefix :deep(svg) {
  transform: scale(1.1);
  transition: var(--transition-fast);
}

/* Текст ошибки */
.error-text {
  display: block;
  font-size: 13px;
  color: var(--color-error);
  margin-top: 6px;
  margin-left: 4px;
}

// Используем SCSS-анимации вместо чистого CSS
.error-enter-active {
  transition: var(--transition-fast);
}

.error-leave-active {
  transition: var(--transition-fast);
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Стили для кнопки в слоте */
.input-suffix :deep(.password-toggle) {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-textMuted);
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-text);
  }
}
</style>
