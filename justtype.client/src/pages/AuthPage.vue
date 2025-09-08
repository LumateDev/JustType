<template>
  <div class="auth-container">
    <!-- Анимированный фон -->
    <div class="auth-background">
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Основная карточка -->
    <transition name="card-fade" appear>
      <el-card class="auth-card" shadow="never">
        <!-- Логотип с анимацией -->
        <div class="logo-container">
          <div class="logo-wrapper">
            <div class="logo-icon">
              <svg viewBox="0 0 100 100" class="logo-svg">
                <text x="50" y="65" text-anchor="middle" class="logo-text">JT</text>
              </svg>
            </div>
            <transition name="title-slide" appear>
              <h1 class="auth-title">Just Type</h1>
            </transition>
          </div>
          <transition name="subtitle-fade" appear>
            <p class="auth-subtitle">Совершенствуй скорость печати</p>
          </transition>
        </div>

        <!-- Табы с анимацией -->
        <div class="tabs-container">
          <div class="tab-selector" :class="{ 'is-register': activeTab === 'register' }">
            <div class="tab-indicator"></div>
            <button
              class="tab-button"
              :class="{ active: activeTab === 'login' }"
              @click="activeTab = 'login'"
            >
              <el-icon><User /></el-icon>
              <span>Вход</span>
            </button>
            <button
              class="tab-button"
              :class="{ active: activeTab === 'register' }"
              @click="activeTab = 'register'"
            >
              <el-icon><EditPen /></el-icon>
              <span>Регистрация</span>
            </button>
          </div>
        </div>

        <!-- Контент форм с анимацией -->
        <div class="form-container">
          <transition name="form-slide" mode="out-in">
            <div v-if="activeTab === 'login'" key="login" class="form-wrapper">
              <login-form @success="handleLoginSuccess" />
            </div>
            <div v-else key="register" class="form-wrapper">
              <register-form @success="handleRegisterSuccess" />
            </div>
          </transition>
        </div>

        <!-- Декоративные элементы -->
        <div class="corner-accent top-left"></div>
        <div class="corner-accent bottom-right"></div>
      </el-card>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { User, EditPen } from "@element-plus/icons-vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

const router = useRouter();
const userStore = useUserStore();
const activeTab = ref<"login" | "register">("login");

const handleLoginSuccess = (data: any) => {
  userStore.login(data.accessToken, data.username, data.userId);
  router.push("/home");
  ElMessage.success(`Добро пожаловать, ${data.username}!`);
};

const handleRegisterSuccess = () => {
  ElMessage.success("Регистрация успешна! Теперь войдите в систему");
  activeTab.value = "login";
};

onMounted(() => {
  // Добавляем класс для запуска анимаций после монтирования
  document.body.classList.add('auth-page-loaded');
});
</script>

<style scoped lang="scss">
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  background: var(--el-bg-color-page); /* Используем стандартную переменную */
  overflow: hidden;
}

// Анимированный фон
.auth-background {
  position: absolute;
  inset: 0;
  overflow: hidden;

  .gradient-sphere {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 20s ease-in-out infinite;

    /* Градиенты на основе цветовой схемы Element Plus */
    &.sphere-1 {
      width: 600px;
      height: 600px;
      background: linear-gradient(135deg, var(--el-color-primary-light-3), var(--el-color-primary));
      top: -20%;
      left: -10%;
      animation-duration: 25s;
    }

    &.sphere-2 {
      width: 500px;
      height: 500px;
      background: linear-gradient(135deg, var(--el-color-primary-light-5), var(--el-color-primary-light-3));
      bottom: -20%;
      right: -10%;
      animation-duration: 30s;
      animation-delay: -10s;
    }

    &.sphere-3 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, var(--el-color-danger-light-3), var(--el-color-warning-light-3));
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-duration: 35s;
      animation-delay: -5s;
    }
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(64, 158, 255, 0.03) 1px, transparent 1px), /* Используем RGB из --el-color-primary */
      linear-gradient(90deg, rgba(64, 158, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-move 60s linear infinite;
  }
}

// Основная карточка
.auth-card {
  width: 100%;
  max-width: 480px;
  background: var(--el-bg-color-overlay); /* Более подходящая переменная для карточек */
  border: 1px solid var(--el-border-color);
  border-radius: 12px; /* Слегка уменьшил радиус для соответствия El Plus */
  position: relative;
  z-index: 1;
  overflow: hidden;

  :deep(.el-card__body) {
    padding: 40px 32px; /* Привел отступы к более стандартному виду */
  }

  // Декоративные углы
  .corner-accent {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0.05;

    &.top-left {
      top: 0;
      left: 0;
      background: linear-gradient(135deg, var(--el-color-primary) 0%, transparent 50%);
    }

    &.bottom-right {
      bottom: 0;
      right: 0;
      background: linear-gradient(-45deg, var(--el-color-primary) 0%, transparent 50%);
    }
  }
}

// Логотип
.logo-container {
  text-align: center;
  margin-bottom: 32px; /* Уменьшил отступ */

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  .logo-icon {
    width: 56px; /* Слегка уменьшил */
    height: 56px;
    background: linear-gradient(135deg, var(--el-color-primary-light-3), var(--el-color-primary));
    border-radius: 12px; /* Привел к --el-border-radius-base */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: logo-pulse 3s ease-in-out infinite;

    .logo-svg {
      width: 100%;
      height: 100%;

      .logo-text {
        fill: white;
        font-size: 24px; /* Скорректировал размер */
        font-weight: 700;
        font-family: "Inter", sans-serif; /* Явно указал шрифт */
      }
    }
  }

  .auth-title {
    margin: 0;
    font-size: 2rem; /* Уменьшил размер */
    font-weight: 700;
    background: linear-gradient(135deg, var(--el-color-primary-light-3), var(--el-color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    font-family: "Inter", sans-serif; /* Явно указал шрифт */
  }

  .auth-subtitle {
    margin: 0;
    color: var(--el-text-color-secondary);
    font-size: 0.95rem; /* Скорректировал размер */
    font-weight: 400;
    font-family: "Inter", sans-serif; /* Явно указал шрифт */
  }
}

// Табы
.tabs-container {
  margin-bottom: 32px;

  .tab-selector {
    display: flex;
    background: var(--el-fill-color-light);
    border-radius: var(--el-border-radius-base); /* Стандартный радиус */
    padding: 4px;
    position: relative;

    .tab-indicator {
      position: absolute;
      top: 4px;
      left: 4px;
      width: calc(50% - 4px);
      height: calc(100% - 8px);
      background: var(--el-bg-color);
      border-radius: calc(var(--el-border-radius-base) - 2px);
      box-shadow: var(--el-box-shadow-light);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.is-register .tab-indicator {
      transform: translateX(calc(100% + 8px));
    }

    .tab-button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px; /* Скорректировал отступы */
      background: none;
      border: none;
      border-radius: calc(var(--el-border-radius-base) - 2px);
      font-size: 0.95rem; /* Скорректировал размер */
      font-weight: 500;
      color: var(--el-text-color-regular);
      cursor: pointer;
      position: relative;
      z-index: 1;
      transition: all 0.3s;
      font-family: "Inter", sans-serif; /* Явно указал шрифт */

      &.active {
        color: var(--el-color-primary);
      }

      &:hover:not(.active) {
        color: var(--el-text-color-primary);
      }

      .el-icon {
        font-size: 1.1rem; /* Скорректировал размер */
      }
    }
  }
}

// Контейнер форм
.form-container {
  position: relative;
  min-height: 300px;
}

// Анимации
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes logo-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.15); /* Используем оттенок primary */
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 4px 30px rgba(64, 158, 255, 0.25);
  }
}

// Transition анимации
.card-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.title-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.title-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.subtitle-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
}

.subtitle-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

// Адаптивность
@media (max-width: 520px) {
  .auth-card {
    margin: 20px;
    max-width: calc(100% - 40px);

    :deep(.el-card__body) {
      padding: 24px; /* Уменьшил отступы для мобильных */
    }
  }

  .logo-container {
    .logo-wrapper {
      flex-direction: column;
      gap: 12px;
    }

    .auth-title {
      font-size: 1.75rem;
    }
  }

  .tabs-container {
    .tab-selector {
      .tab-button {
        padding: 10px 16px;
        font-size: 0.9rem;

        .el-icon {
          font-size: 1rem;
        }
      }
    }
  }
}

// УДАЛЕНО: Вся секция :global(.dark)
// Управление темной темой теперь полностью осуществляется через ThemeStore и main.scss
// Декоративные элементы автоматически адаптируются через CSS переменные
</style>
