import type { SenjaroPayConfig } from './types.js';
/**
 * Resolve an optional base URL override. Rejects non-HTTPS hosts except localhost,
 * and rejects hosts outside the configured allowlist (plus the default API host).
 */
export declare function resolveBaseUrl(config: SenjaroPayConfig, override?: string | null): string;
export declare function formatError(err: unknown): string;
