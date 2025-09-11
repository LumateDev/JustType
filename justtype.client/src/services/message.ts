import { ref, readonly } from "vue";

export type MessageType = "success" | "error" | "info" | "warning";

export interface MessageOptions {
  id: number;
  message: string;
  type: MessageType;
  duration: number;
  onClose?: () => void;
  timer?: ReturnType<typeof setTimeout>;
}

const messages = ref<MessageOptions[]>([]);
let idCounter = 0;

const remove = (id: number) => {
  const index = messages.value.findIndex((msg) => msg.id === id);
  if (index > -1) {
    const msg = messages.value[index];
    if (msg.onClose) {
      msg.onClose();
    }
    messages.value.splice(index, 1);
  }
};

const notify = (message: string, options: Partial<Omit<MessageOptions, "id" | "message">> = {}) => {
  const id = idCounter++;
  const duration = options.duration ?? 3000;

  const newMessage: MessageOptions = {
    id,
    message,
    type: options.type ?? "info",
    duration,
    onClose: options.onClose,
  };

  if (duration > 0) {
    newMessage.timer = setTimeout(() => {
      remove(id);
    }, duration);
  }

  messages.value.push(newMessage);

  return () => remove(id);
};

notify.success = (message: string, options?: Omit<MessageOptions, "type">) =>
  notify(message, { ...options, type: "success" });
notify.error = (message: string, options?: Omit<MessageOptions, "type">) =>
  notify(message, { ...options, type: "error" });
notify.info = (message: string, options?: Omit<MessageOptions, "type">) =>
  notify(message, { ...options, type: "info" });
notify.warning = (message: string, options?: Omit<MessageOptions, "type">) =>
  notify(message, { ...options, type: "warning" });

export function useMessage() {
  return {
    messages: readonly(messages),
    remove,
  };
}

export { notify };
