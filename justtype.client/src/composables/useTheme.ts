import { computed, watch } from "vue";
import { useStorage } from "@vueuse/core";

export type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  accentHover: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  focus: string;
  hover: string;
  border: string;
  error: string;
  success: string;
  gradient: string;
}

const themes: Record<Theme, ThemeColors> = {
  light: {
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    accentHover: "#db2777",
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceHover: "#f1f5f9",
    text: "#1e293b",
    textMuted: "#64748b",
    focus: "#6366f1",
    hover: "#6366f1",
    border: "#e2e8f0",
    error: "#ef4444",
    success: "#10b981",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  dark: {
    primary: "#818cf8",
    primaryHover: "#6366f1",
    secondary: "#a78bfa",
    accent: "#f472b6",
    accentHover: "#ec4899",
    background: "#0f172a",
    surface: "#1e293b",
    surfaceHover: "#334155",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    focus: "#818cf8",
    hover: "#818cf8",
    border: "#334155",
    error: "#f87171",
    success: "#34d399",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
};

type ToggleOptions = {
  event?: MouseEvent;
  animate?: boolean;
};
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
};

export function useTheme() {
  const prefersDark =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const currentTheme = useStorage<Theme>("theme", (prefersDark ? "dark" : "light") as Theme);

  const setThemeVars = (theme: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
      // Добавляем RGB версии для primary, secondary и accent
      if (key === "primary" || key === "secondary" || key === "accent") {
        root.style.setProperty(`--color-${key}-rgb`, hexToRgb(value));
      }
    });
    root.setAttribute("data-theme", theme);
    // Помогает системным контролам подстроиться
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  };

  // Применяем переменные при изменении (и при первом запуске)
  watch(currentTheme, (newTheme) => setThemeVars(newTheme), { immediate: true });

  const colors = computed(() => themes[currentTheme.value]);

  const applyTheme = (theme: Theme, opts: ToggleOptions = {}) => {
    switchTheme(theme, opts);
  };

  const toggleTheme = (event?: MouseEvent) => {
    const next = currentTheme.value === "light" ? "dark" : "light";
    switchTheme(next, { event, animate: true });
  };

  function switchTheme(theme: Theme, opts: ToggleOptions = {}) {
    if (typeof document === "undefined") {
      currentTheme.value = theme;
      return;
    }

    const root = document.documentElement;
    const supportsVT = "startViewTransition" in document;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = opts.animate !== false && supportsVT && !prefersReduced;

    const { x, y } = getOrigin(opts.event);
    const radius = computeMaxRadius(x, y);

    // Координаты и радиус используются в CSS-анимации
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);

    if (shouldAnimate) {
      // Добавляем класс с направлением анимации
      const direction = theme === "dark" ? "to-dark" : "to-light";
      root.classList.add("view-transition-theme", `theme-${direction}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transition = (document as any).startViewTransition(() => {
        currentTheme.value = theme;
      });

      transition.finished.finally(() => {
        root.classList.remove("view-transition-theme", `theme-${direction}`);
      });
    } else {
      currentTheme.value = theme;
    }
  }

  function getOrigin(event?: MouseEvent) {
    if (event) {
      return { x: event.clientX, y: event.clientY };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  function computeMaxRadius(x: number, y: number) {
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    return Math.hypot(maxX, maxY);
  }

  return {
    currentTheme: computed(() => currentTheme.value),
    colors,
    toggleTheme, // toggleTheme(event?: MouseEvent)
    applyTheme, // applyTheme(theme, { event?, animate? })
  };
}
