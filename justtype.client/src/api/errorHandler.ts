import axios from "axios";
import type { ServerErrorResponse } from "@/types";

export class ErrorHandler {
  // Универсальный метод для получения сообщения об ошибке
  static getErrorMessage(e: unknown, defaultMessage: string = "Ошибка запроса"): string {
    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      // Общие ошибки
      if (status === 401) return "Требуется авторизация";
      if (status === 403) return "Недостаточно прав";
      if (status === 404) return "Ресурс не найден";
      if (status === 409) return "Конфликт данных";
      if (status === 500) return "Внутренняя ошибка сервера";

      return (
        data?.error ||
        data?.Error ||
        data?.message ||
        data?.details ||
        data?.Details ||
        defaultMessage
      );
    }

    if (e instanceof Error) return e.message;
    return defaultMessage;
  }

  // Специализированный метод для ошибок авторизации
  static getAuthErrorMessage(e: unknown): string {
    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      if (status === 401) return "Неверный логин или пароль";
      if (status === 404) return "Аккаунт не найден";
      return data?.error || data?.Error || data?.message || "Ошибка авторизации";
    }
    if (e instanceof Error) return e.message;
    return "Ошибка авторизации";
  }

  // Специализированный метод для ошибок администратора
  static getAdminErrorMessage(e: unknown): string {
    if (axios.isAxiosError<ServerErrorResponse>(e)) {
      const status = e.response?.status;
      const data = e.response?.data;

      if (status === 401) return "Требуется авторизация администратора";
      if (status === 403) return "Недостаточно прав администратора";
      if (status === 409) return "Логин уже существует";
      return data?.error || data?.Error || data?.message || "Ошибка административной операции";
    }
    if (e instanceof Error) return e.message;
    return "Ошибка административной операции";
  }

  // Метод для сетевых ошибок
  static getNetworkErrorMessage(e: unknown): string {
    if (axios.isAxiosError(e)) {
      if (e.code === "NETWORK_ERROR") return "Нет соединения с сервером";
      if (e.code === "ECONNABORTED") return "Превышено время ожидания";
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
