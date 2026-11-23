/**
 * Resolve an optional base URL override. Rejects non-HTTPS hosts except localhost,
 * and rejects hosts outside the configured allowlist (plus the default API host).
 */
export function resolveBaseUrl(config, override) {
    if (!override || !String(override).trim()) {
        return config.baseUrl;
    }
    let url;
    try {
        url = new URL(String(override).trim());
    }
    catch {
        throw new Error(`Invalid base URL override: ${override}`);
    }
    const host = url.host.toLowerCase();
    const isLocal = host === 'localhost' ||
        host.startsWith('localhost:') ||
        host === '127.0.0.1' ||
        host.startsWith('127.0.0.1:');
    if (url.protocol !== 'https:' && !isLocal) {
        throw new Error('Base URL override must use HTTPS (HTTP only allowed for localhost)');
    }
    const defaultHost = new URL(config.baseUrl).host.toLowerCase();
    const allowed = new Set([defaultHost, ...config.allowedHosts.map((h) => h.toLowerCase())]);
    if (!allowed.has(host) && !isLocal) {
        throw new Error(`Host "${host}" is not allowed. Set SENJAROPAY_ALLOWED_HOSTS to permit overrides.`);
    }
    return url.origin.replace(/\/$/, '');
}
export function formatError(err) {
    if (!err)
        return 'Unknown error';
    if (typeof err === 'string')
        return err;
    if (err instanceof Error) {
        const anyErr = err;
        if (anyErr.response) {
            return JSON.stringify({
                message: anyErr.message,
                status: anyErr.response.status,
                data: anyErr.response.data,
            }, null, 2);
        }
        return anyErr.message;
    }
    try {
        return JSON.stringify(err, null, 2);
    }
    catch {
        return String(err);
    }
}
