import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type ReaderSettings = {
  fontSize: number; // px
  lineHeight: number; // unitless ratio
  readerWidth: number; // rem
};

const DEFAULTS: ReaderSettings = {
  fontSize: 17,
  lineHeight: 1.7,
  readerWidth: 42,
};

export const READER_DEFAULTS = DEFAULTS;

export const READER_BOUNDS = {
  fontSize: { min: 14, max: 22, step: 1 },
  lineHeight: { min: 1.3, max: 2.0, step: 0.05 },
  readerWidth: { min: 32, max: 56, step: 1 },
} as const;

const STORAGE_KEY = "evillious-reader-settings";

function readStorage(): ReaderSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
    return {
      fontSize:
        typeof parsed.fontSize === "number" && Number.isFinite(parsed.fontSize)
          ? parsed.fontSize
          : DEFAULTS.fontSize,
      lineHeight:
        typeof parsed.lineHeight === "number" && Number.isFinite(parsed.lineHeight)
          ? parsed.lineHeight
          : DEFAULTS.lineHeight,
      readerWidth:
        typeof parsed.readerWidth === "number" && Number.isFinite(parsed.readerWidth)
          ? parsed.readerWidth
          : DEFAULTS.readerWidth,
    };
  } catch {
    return DEFAULTS;
  }
}

function writeStorage(s: ReaderSettings): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota / private mode: silently drop */
  }
}

type Ctx = {
  settings: ReaderSettings;
  set: <K extends keyof ReaderSettings>(key: K, value: ReaderSettings[K]) => void;
  reset: () => void;
};

const ReaderSettingsContext = createContext<Ctx | null>(null);

export function ReaderSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReaderSettings>(() => readStorage());

  useEffect(() => {
    writeStorage(settings);
  }, [settings]);

  const set: Ctx["set"] = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  return (
    <ReaderSettingsContext.Provider value={{ settings, set, reset }}>
      {children}
    </ReaderSettingsContext.Provider>
  );
}

export function useReaderSettings(): Ctx {
  const ctx = useContext(ReaderSettingsContext);
  if (!ctx) throw new Error("useReaderSettings must be used within <ReaderSettingsProvider>");
  return ctx;
}

export function readerSettingsCssVars(s: ReaderSettings): CSSProperties {
  return {
    "--reader-font-size": `${s.fontSize / 16}rem`,
    "--reader-line-height": `${s.lineHeight}`,
    "--reader-max-width": `${s.readerWidth}rem`,
  } as CSSProperties;
}
