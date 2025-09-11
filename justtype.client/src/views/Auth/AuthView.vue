<template>
  <div class="auth-container">
    <div class="auth-background">
      <div class="orb-container">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="gradient-orb orb-4"></div>
      </div>
    </div>

    <div class="grid-overlay"></div>
    <div class="auth-content">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">{{ isLogin ? "Welcome back" : "Create account" }}</h1>
          <p class="auth-subtitle">
            {{
              isLogin ? "Enter your credentials to continue" : "Start your journey with us today"
            }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <!-- Комбинированное поле для входа (username/email) -->
          <AnimatedInput
            id="identifier"
            v-model="formData.identifier"
            :label="isLogin ? 'Username or Email' : 'Username'"
            :placeholder="isLogin ? 'username or you@example.com' : 'johndoe'"
            :error="errors.identifier"
            @focus="clearError('identifier')"
            @blur="validateField('identifier')"
          >
            <template #prefix>
              <MdiIcon
                :path="isLogin && isEmailInput ? mdiEmail : mdiAccount"
                :size="20"
                class="input-icon"
              />
            </template>
          </AnimatedInput>

          <!-- Поле email только для регистрации -->
          <AnimatedInput
            v-if="!isLogin"
            id="email"
            v-model="formData.email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            :error="errors.email"
            @focus="clearError('email')"
            @blur="validateField('email')"
          >
            <template #prefix>
              <MdiIcon :path="mdiEmail" :size="20" class="input-icon" />
            </template>
          </AnimatedInput>

          <!-- Поле пароля -->
          <AnimatedInput
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="••••••••"
            :error="errors.password"
            @focus="clearError('password')"
            @blur="validateField('password')"
          >
            <template #prefix>
              <MdiIcon :path="mdiLock" :size="20" class="input-icon" />
            </template>
            <template #suffix>
              <button type="button" @click="showPassword = !showPassword" class="password-toggle">
                <MdiIcon :path="showPassword ? mdiEyeOff : mdiEye" :size="20" />
              </button>
            </template>
          </AnimatedInput>

          <!-- Подтверждение пароля (только для регистрации) -->
          <AnimatedInput
            v-if="!isLogin"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm password"
            placeholder="••••••••"
            :error="errors.confirmPassword"
            @focus="clearError('confirmPassword')"
            @blur="validateField('confirmPassword')"
          >
            <template #prefix>
              <MdiIcon :path="mdiLock" :size="20" class="input-icon" />
            </template>
            <template #suffix>
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="password-toggle"
              >
                <MdiIcon :path="showConfirmPassword ? mdiEyeOff : mdiEye" :size="20" />
              </button>
            </template>
          </AnimatedInput>

          <!-- Индикатор силы пароля (только для регистрации) -->
          <div v-if="!isLogin && formData.password" class="password-strength">
            <div class="strength-bar">
              <div
                class="strength-fill"
                :style="{ width: passwordStrength.percentage + '%' }"
                :class="passwordStrength.level"
              ></div>
            </div>
            <span class="strength-text" :class="passwordStrength.level">
              {{ passwordStrength.text }}
            </span>
          </div>

          <!-- Опции для входа -->
          <div v-if="isLogin" class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" class="checkbox" />
              <span class="checkbox-label">Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <!-- Согласие с условиями (только для регистрации) -->
          <div v-if="!isLogin" class="agreement-section">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="formData.agreement" class="checkbox" />
              <span class="checkbox-label">
                I agree to the
                <a href="#" class="terms-link">Terms of Service</a>
                and
                <a href="#" class="terms-link">Privacy Policy</a>
              </span>
            </label>
            <span v-if="errors.agreement" class="error-text">{{ errors.agreement }}</span>
          </div>

          <!-- Кнопка отправки -->
          <button type="submit" class="submit-button" :disabled="isLoading || !isFormValid">
            <span v-if="!isLoading">{{ isLogin ? "Sign in" : "Create account" }}</span>
            <div v-else class="loading-spinner"></div>
          </button>

          <!-- Индикатор прогресса -->
          <div v-if="isLoading" class="progress-indicator">
            <div class="progress-bar"></div>
          </div>
        </form>

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <div class="social-buttons">
          <button class="social-button google-button">
            <MdiIcon :path="mdiGoogle" :size="20" class="social-icon google-icon" />
            Google
          </button>

          <button class="social-button github-button">
            <MdiIcon :path="mdiGithub" :size="20" class="social-icon github-icon" />
            GitHub
          </button>
        </div>

        <div class="auth-footer">
          <p>
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
            <a href="#" @click.prevent="toggleMode" class="auth-link">
              {{ isLogin ? "Sign up" : "Sign in" }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import AnimatedInput from "@/components/AnimatedInput.vue";
import { mdiEye, mdiEyeOff, mdiEmail, mdiLock, mdiAccount, mdiGoogle, mdiGithub } from "@mdi/js";
import MdiIcon from "@/components/MdiIcon.vue";
import { loginByUsername, loginByEmail, register } from "@/api/authApi";
import { getAuthErrorMessage, getErrorMessage } from "@/api/errorHandler";
import { useUserStore } from "@/stores/userStore";
import { notify } from "@/services/message";

const router = useRouter();
const userStore = useUserStore();

const isLogin = ref(true);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const formData = reactive({
  identifier: "", // Для входа: username или email
  email: "", // Только для регистрации
  password: "",
  confirmPassword: "",
  agreement: false,
});

const errors = reactive({
  identifier: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: "",
});

const isEmailInput = computed(() => {
  return formData.identifier.includes("@");
});

// Расчет силы пароля
const passwordStrength = computed(() => {
  const password = formData.password;
  if (!password) return { percentage: 0, level: "", text: "" };

  let strength = 0;

  // Длина
  if (password.length >= 6) strength += 20;
  if (password.length >= 8) strength += 20;

  // Разнообразие символов
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

  if (strength <= 30) return { percentage: strength, level: "weak", text: "Weak" };
  if (strength <= 60) return { percentage: strength, level: "medium", text: "Medium" };
  if (strength <= 80) return { percentage: strength, level: "good", text: "Good" };
  return { percentage: strength, level: "strong", text: "Strong" };
});

watch(
  () => formData.password,
  () => {
    if (formData.confirmPassword && !isLogin.value) {
      validateField("confirmPassword");
    }
  }
);

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  // Очищаем форму и ошибки
  Object.keys(formData).forEach((key) => {
    const k = key as keyof typeof formData;
    if (k === "agreement") {
      formData[k] = false;
    } else {
      formData[k] = "";
    }
  });
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });
};

const clearError = (field: keyof typeof errors) => {
  errors[field] = "";
};

// Вычисляемое свойство для проверки валидности формы
const isFormValid = computed(() => {
  if (isLogin.value) {
    // Для входа: identifier и пароль
    return formData.identifier && formData.password && !errors.identifier && !errors.password;
  } else {
    // Для регистрации: identifier (username), email, пароль, подтверждение и согласие
    return (
      formData.identifier &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.agreement &&
      !errors.identifier &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  }
});

const validateField = (field: keyof typeof errors) => {
  switch (field) {
    case "identifier":
      if (!formData.identifier.trim()) {
        errors.identifier = isLogin.value
          ? "Username or email is required"
          : "Username is required";
      } else if (!isLogin.value) {
        // Валидация username только для регистрации
        if (formData.identifier.length < 3) {
          errors.identifier = "Username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.identifier)) {
          errors.identifier = "Only letters, numbers, _ and - allowed";
        }
      }
      break;

    case "email":
      if (!isLogin.value) {
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Invalid email format";
        }
      }
      break;

    case "password":
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      break;

    case "confirmPassword":
      if (!isLogin.value) {
        if (!formData.confirmPassword) {
          errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
          errors.confirmPassword = "Passwords do not match";
        }
      }
      break;
  }
};

const validateForm = () => {
  let isValid = true;

  // Валидация identifier
  validateField("identifier");
  if (errors.identifier) isValid = false;

  // Валидация email (только для регистрации)
  if (!isLogin.value) {
    validateField("email");
    if (errors.email) isValid = false;

    validateField("confirmPassword");
    if (errors.confirmPassword) isValid = false;

    if (!formData.agreement) {
      errors.agreement = "You must agree to the terms";
      isValid = false;
    }
  }

  // Валидация пароля
  validateField("password");
  if (errors.password) isValid = false;

  return isValid;
};

const handleSubmit = async () => {
  if (isLoading.value) return;

  if (!validateForm()) return;

  isLoading.value = true;

  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });

  try {
    if (isLogin.value) {
      // Нормализуем identifier для логина
      const normalizedIdentifier = formData.identifier.toLowerCase().trim();
      let response;

      if (isEmailInput.value) {
        response = await loginByEmail(normalizedIdentifier, formData.password);
      } else {
        response = await loginByUsername(normalizedIdentifier, formData.password);
      }

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      if (rememberMe.value) {
        localStorage.setItem("rememberUser", normalizedIdentifier);
      }

      userStore.login(
        response.accessToken,
        normalizedIdentifier,
        isEmailInput.value ? normalizedIdentifier : "",
        ""
      );

      notify.success("Welcome back!");
      await router.push("/home");
    } else {
      // Нормализуем данные для регистрации
      const normalizedUsername = formData.identifier.toLowerCase().trim();
      const normalizedEmail = formData.email.toLowerCase().trim();

      const registerResponse = await register(
        normalizedUsername,
        normalizedEmail,
        formData.password
      );

      const loginResponse = await loginByUsername(normalizedUsername, formData.password);
      localStorage.setItem("accessToken", loginResponse.accessToken);
      localStorage.setItem("refreshToken", loginResponse.refreshToken);

      userStore.login(
        loginResponse.accessToken,
        normalizedUsername,
        normalizedEmail,
        registerResponse.userId
      );

      notify.success("Account created successfully!");
      await router.push("/home");
    }
  } catch (error) {
    console.error("Auth error:", error);

    const errorMessage = isLogin.value
      ? getAuthErrorMessage(error)
      : getErrorMessage(error, "Registration failed");

    if (isLogin.value) {
      notify.error(errorMessage);
    } else {
      if (errorMessage.toLowerCase().includes("email")) {
        errors.email = errorMessage;
      } else if (errorMessage.toLowerCase().includes("username")) {
        errors.identifier = errorMessage;
      } else if (errorMessage.toLowerCase().includes("password")) {
        errors.password = errorMessage;
      } else {
        notify.error(errorMessage);
      }
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "auth-styles";
</style>
