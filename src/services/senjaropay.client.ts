import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { randomUUID } from 'crypto';
import type { SenjaroPayConfig, ApiResult } from '../types.js';
import { resolveBaseUrl } from '../security.js';

export class SenjaroPayClient {
  private readonly http: AxiosInstance;

  constructor(private readonly config: SenjaroPayConfig) {
    this.http = axios.create({
      timeout: 45000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    });
  }

  get isLive(): boolean {
    return this.config.isLive;
  }

  get environment(): string {
    return this.config.environment;
  }

  private headers(idempotent = false): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.config.apiKey) headers['x-api-key'] = this.config.apiKey;
    if (this.config.apiSecret) headers['x-api-secret'] = this.config.apiSecret;
    if (idempotent) headers['x-idempotency-key'] = randomUUID();
    return headers;
  }

  async post<T = unknown>(
    path: string,
    body: Record<string, unknown> = {},
    options: { idempotent?: boolean; baseUrlOverride?: string | null } = {},
  ): Promise<ApiResult<T>> {
    const base = resolveBaseUrl(this.config, options.baseUrlOverride);
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data: body,
      headers: this.headers(Boolean(options.idempotent)),
    };

    const response = await this.http.request<T>(config);
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      data: response.data,
      mock: false,
    };
  }

  async getWalletBalances(baseUrlOverride?: string | null) {
    return this.post('/senjaropay/merchant/payments/balance', {}, { baseUrlOverride });
  }

  async listTransactions(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/senjaropay/merchant/payments/listTransactions', body, {
      baseUrlOverride,
    });
  }

  async getMobilePaymentStatus(
    referenceId: string,
    baseUrlOverride?: string | null,
  ) {
    return this.post(
      '/senjaropay/merchant/payments/status',
      { referenceId },
      { baseUrlOverride },
    );
  }

  async getCardPaymentStatus(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/senjaropay/merchant/card/status', body, { baseUrlOverride });
  }

  async createMobilePayment(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/senjaropay/merchant/payments/create', body, {
      idempotent: true,
      baseUrlOverride,
    });
  }

  async createCardCheckout(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/senjaropay/merchant/card/pay', body, {
      idempotent: true,
      baseUrlOverride,
    });
  }

  async initiateHostedCheckout(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/api/hostedcheckout/initiate', body, {
      idempotent: true,
      baseUrlOverride,
    });
  }

  async listBillCategories(baseUrlOverride?: string | null) {
    return this.post('/api/billPayments/categories', {}, { baseUrlOverride });
  }

  async lookupBill(body: Record<string, unknown>, baseUrlOverride?: string | null) {
    return this.post('/api/billPayments/lookup', body, { baseUrlOverride });
  }

  async payBill(body: Record<string, unknown>, baseUrlOverride?: string | null) {
    return this.post('/api/billPayments/pay', body, {
      idempotent: true,
      baseUrlOverride,
    });
  }

  async getBillStatus(body: Record<string, unknown>, baseUrlOverride?: string | null) {
    return this.post('/api/billPayments/status', body, { baseUrlOverride });
  }

  async lookupBankAccount(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post(
      '/senjaropay/merchant/fundtransfer/api/account-name-lookup',
      body,
      { baseUrlOverride },
    );
  }

  async createCashoutTransfer(
    body: Record<string, unknown>,
    baseUrlOverride?: string | null,
  ) {
    return this.post('/senjaropay/merchant/cashout/api/transfer', body, {
      idempotent: true,
      baseUrlOverride,
    });
  }
}
