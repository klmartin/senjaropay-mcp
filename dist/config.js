const DEFAULT_BASE_URL = 'https://api.senjaropay.com';
function parseEnvironment(raw) {
    const value = String(raw || '').trim().toLowerCase();
    if (value === 'production' || value === 'prod' || value === 'live')
        return 'production';
    if (value === 'sandbox' || value === 'test')
        return 'sandbox';
    if (value === 'mock')
        return 'mock';
    return 'sandbox';
}
export function loadConfig() {
    const apiKey = (process.env.SENJAROPAY_API_KEY || process.env.SENJARO_API_KEY || '').trim() || null;
    const apiSecret = (process.env.SENJAROPAY_API_SECRET || process.env.SENJARO_API_SECRET || '').trim() || null;
    const baseUrl = (process.env.SENJAROPAY_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
    const environment = parseEnvironment(process.env.SENJAROPAY_ENVIRONMENT);
    const allowedHosts = String(process.env.SENJAROPAY_ALLOWED_HOSTS || '')
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean);
    const isLive = Boolean(apiKey && apiSecret) && environment !== 'mock';
    return {
        apiKey,
        apiSecret,
        baseUrl,
        environment: isLive ? environment : 'mock',
        allowedHosts,
        isLive,
    };
}
