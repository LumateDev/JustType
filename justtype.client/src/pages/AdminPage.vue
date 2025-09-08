<template>
  <div class="admin-page">
    <h1 class="page-title">Панель администратора</h1>

    <div class="grid">
      <!-- Карточка создания пользователя -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">
            <span>Создать пользователя</span>
          </div>
        </template>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @submit.prevent="onSubmit"
        >
          <el-form-item label="Логин" prop="login">
            <el-input v-model="form.login" placeholder="Введите логин" />
          </el-form-item>

          <el-form-item label="Пароль" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Введите пароль"
              show-password
            />
          </el-form-item>

          <el-form-item label="Подтверждение пароля" prop="confirm">
            <el-input
              v-model="form.confirm"
              type="password"
              placeholder="Повторите пароль"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="creating" native-type="submit">Создать</el-button>
            <el-button @click="onReset" :disabled="creating">Сбросить</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- Карточка списка пользователей -->
      <el-card shadow="hover" class="card users-card">
        <template #header>
          <div class="users-header">
            <span>Пользователи</span>
            <div class="actions">
              <el-input
                v-model="search"
                placeholder="Поиск по логину..."
                clearable
                size="medium"
                :prefix-icon="Search"
                class="search"
              />
              <el-button size="medium" @click="loadUsers" :loading="loadingUsers" :icon="Refresh">
                Обновить
              </el-button>
            </div>
          </div>
        </template>

        <el-skeleton v-if="loadingUsers && users.length === 0" :rows="4" animated />

        <el-table
          v-else
          :data="filteredUsers"
          size="medium"
          border
          class="users-table"
          :empty-text="loadingUsers ? 'Загрузка...' : 'Нет данных'"
        >
          <el-table-column prop="login" label="Логин" min-width="180" />
          <el-table-column label="Роль" width="140">
            <template #default="{ row }">
              <el-tag :type="row.status === 2 ? 'warning' : 'info'">
                {{ row.status === 2 ? "Admin" : "User" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Статус" width="140">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'danger' : 'success'">
                {{ row.status === 1 ? "Banned" : "Active" }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Refresh, Search } from "@element-plus/icons-vue";
import { registerUserByAdmin, fetchUsers } from "@/api/adminApi";
import type { AdminUserResponse } from "@/interfaces";
import { getAdminErrorMessage, getErrorMessage } from "@/api/errorHandler";

const formRef = ref<FormInstance>();
const creating = ref(false);
const loadingUsers = ref(false);
const users = ref<AdminUserResponse[]>([]);
const search = ref("");

const form = reactive({
  login: "",
  password: "",
  confirm: "",
});
const rules: FormRules<typeof form> = {
  login: [
    { required: true, message: "Введите логин", trigger: "blur" },
    { min: 3, message: "Логин должен быть не менее 3 символов", trigger: "blur" },
  ],
  password: [{ required: true, message: "Введите пароль", trigger: "blur" }],
  confirm: [
    { required: true, message: "Подтвердите пароль", trigger: "blur" },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.password) callback(new Error("Пароли не совпадают"));
        else callback();
      },
      trigger: "blur",
    },
  ],
};

const filteredUsers = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return users.value;
  return users.value.filter((u) => u.login.toLowerCase().includes(q));
});

async function loadUsers() {
  loadingUsers.value = true;
  try {
    users.value = await fetchUsers();
  } catch (e) {
    ElMessage.error(getErrorMessage(e, "Не удалось загрузить пользователей"));
  } finally {
    loadingUsers.value = false;
  }
}

async function onSubmit() {
  if (!formRef.value) return;
  const valid = await formRef.value.validate();
  if (!valid) {
    ElMessage.warning("Проверьте корректность данных формы");
    return;
  }

  creating.value = true;
  try {
    await registerUserByAdmin(form.login, form.password);
    ElMessage.success(`Пользователь "${form.login}" создан`);
    onReset();
    await loadUsers();
  } catch (e) {
    ElMessage.error(getAdminErrorMessage(e));
  } finally {
    creating.value = false;
  }
}

function onReset() {
  form.login = "";
  form.password = "";
  form.confirm = "";
  formRef.value?.clearValidate();
}

onMounted(loadUsers);
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 1100px) {
  .grid {
    grid-template-columns: 420px 1fr; /* левая узкая форма, справа таблица */
  }
}

.card {
  width: 100%;
}

.card .card-header {
  font-weight: 600;
}

.users-card .users-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.users-card .actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.users-card .search {
  width: 260px;
}

.users-table {
  width: 100%;
  border-radius: 2px;
  /* Ограничиваем высоту, чтобы таблица не растягивала страницу.
     Тело таблицы станет прокручиваемым автоматически. */
  max-height: 65vh;
}

.users-table :deep(.el-table__cell) {
  vertical-align: middle;
}
</style>
