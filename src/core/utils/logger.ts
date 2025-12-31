export type LogLevel = "debug" | "info" | "warn" | "error";

type LoggerOptions = {
  scope?: string;
  level?: LogLevel;
};

const levelRank: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export class Logger {
  private readonly scope?: string;
  private readonly level: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.scope = options.scope;
    this.level = options.level ?? ((process.env.LOG_LEVEL as LogLevel) || "info");
  }

  child(scope: string): Logger {
    const nextScope = this.scope ? `${this.scope}:${scope}` : scope;
    return new Logger({ scope: nextScope, level: this.level });
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log("debug", message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.log("error", message, meta);
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
    if (levelRank[level] < levelRank[this.level]) return;

    const ts = new Date().toISOString();
    const prefix = this.scope ? `[${ts}] [${level.toUpperCase()}] [${this.scope}]` : `[${ts}] [${level.toUpperCase()}]`;

    if (!meta || Object.keys(meta).length === 0) {
      // eslint-disable-next-line no-console
      console.log(`${prefix} ${message}`);
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`${prefix} ${message} ${safeJson(meta)}`);
  }
}

function safeJson(obj: unknown): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return "[unserializable-meta]";
  }
}
