import axios from "axios";
import type { ServerErrorResponse } from "@/types";

export class ErrorHandler {
  // Универсальный метод для получения сообщения об ошибке
  static getErrorMessage(e: unknown, defaultMessage: string = "Ошибка запроса"): string {
    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      // Общие ошибки
      if (status === 400) return data?.error || "Неверный запрос";
      if (status === 401) return "Требуется авторизация";
      if (status === 403) return "Доступ запрещен";
      if (status === 404) return data?.error || "Ресурс не найден";
      if (status === 409) return data?.error || "Конфликт данных";
      if (status === 500) return data?.error || "Внутренняя ошибка сервера";
      if (status === 502) return "Сервер недоступен";
      if (status === 503) return "Сервис временно недоступен";

      return data?.error || data?.message || defaultMessage;
    }

    if (e instanceof Error) return e.message;
    return defaultMessage;
  }

  // Специализированный метод для ошибок авторизации
  static getAuthErrorMessage(e: unknown): string {
    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      // Специфичные сообщения для авторизации
      if (status === 401) return data?.error || "Неверный логин или пароль";
      if (status === 403) return data?.error || "Аккаунт заблокирован";
      if (status === 404) return data?.error || "Пользователь не найден";
      if (status === 409) return data?.error || "Пользователь уже существует";

      return data?.error || "Ошибка авторизации";
    }
    return "Ошибка авторизации";
  }

  // Специализированный метод для ошибок администратора
  static getAdminErrorMessage(e: unknown): string {
    const message = this.getErrorMessage(e, "Ошибка административной операции");

    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      // Дополнительная специфика для админки
      if (status === 401) return "Требуется авторизация администратора";
      if (status === 403) return data?.error || "Недостаточно прав администратора";

      return data?.error || message;
    }
    return message;
  }

  // Метод для сетевых ошибок
  static getNetworkErrorMessage(e: unknown): string {
    if (axios.isAxiosError(e)) {
      if (e.code === "NETWORK_ERROR") return "Нет соединения с сервером";
      if (e.code === "ECONNABORTED") return "Превышено время ожидания";
      if (e.response?.status === 0) return "Сервер недоступен";
      return "Сетевая ошибка";
    }
    return "Сетевая ошибка";
  }
}

export const getErrorMessage = (e: unknown, defaultMessage?: string) =>
  ErrorHandler.getErrorMessage(e, defaultMessage);

export const getAuthErrorMessage = (e: unknown) => ErrorHandler.getAuthErrorMessage(e);

export const getAdminErrorMessage = (e: unknown) => ErrorHandler.getAdminErrorMessage(e);

export const getNetworkErrorMessage = (e: unknown) => ErrorHandler.getNetworkErrorMessage(e);
