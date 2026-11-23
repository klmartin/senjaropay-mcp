export type Environment = 'sandbox' | 'production' | 'mock';
export interface SenjaroPayConfig {
    apiKey: string | null;
    apiSecret: string | null;
    baseUrl: string;
    environment: Environment;
    allowedHosts: string[];
    isLive: boolean;
}
export interface ApiResult<T = unknown> {
    ok: boolean;
    status: number;
    data: T;
    mock?: boolean;
}
