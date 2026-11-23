import type { SenjaroPayConfig, ApiResult } from '../types.js';
export declare class SenjaroPayClient {
    private readonly config;
    private readonly http;
    constructor(config: SenjaroPayConfig);
    get isLive(): boolean;
    get environment(): string;
    private headers;
    post<T = unknown>(path: string, body?: Record<string, unknown>, options?: {
        idempotent?: boolean;
        baseUrlOverride?: string | null;
    }): Promise<ApiResult<T>>;
    getWalletBalances(baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    listTransactions(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    getMobilePaymentStatus(referenceId: string, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    getCardPaymentStatus(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    createMobilePayment(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    createCardCheckout(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    initiateHostedCheckout(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    listBillCategories(baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    lookupBill(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    payBill(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    getBillStatus(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    lookupBankAccount(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
    createCashoutTransfer(body: Record<string, unknown>, baseUrlOverride?: string | null): Promise<ApiResult<unknown>>;
}
