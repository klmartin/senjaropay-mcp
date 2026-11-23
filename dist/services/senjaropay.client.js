import axios from 'axios';
import { randomUUID } from 'crypto';
import { resolveBaseUrl } from '../security.js';
export class SenjaroPayClient {
    config;
    http;
    constructor(config) {
        this.config = config;
        this.http = axios.create({
            timeout: 45000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            validateStatus: () => true,
        });
    }
    get isLive() {
        return this.config.isLive;
    }
    get environment() {
        return this.config.environment;
    }
    headers(idempotent = false) {
        const headers = {};
        if (this.config.apiKey)
            headers['x-api-key'] = this.config.apiKey;
        if (this.config.apiSecret)
            headers['x-api-secret'] = this.config.apiSecret;
        if (idempotent)
            headers['x-idempotency-key'] = randomUUID();
        return headers;
    }
    async post(path, body = {}, options = {}) {
        const base = resolveBaseUrl(this.config, options.baseUrlOverride);
        const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
        const config = {
            method: 'POST',
            url,
            data: body,
            headers: this.headers(Boolean(options.idempotent)),
        };
        const response = await this.http.request(config);
        return {
            ok: response.status >= 200 && response.status < 300,
            status: response.status,
            data: response.data,
            mock: false,
        };
    }
    async getWalletBalances(baseUrlOverride) {
        return this.post('/senjaropay/merchant/payments/balance', {}, { baseUrlOverride });
    }
    async listTransactions(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/payments/listTransactions', body, {
            baseUrlOverride,
        });
    }
    async getMobilePaymentStatus(referenceId, baseUrlOverride) {
        return this.post('/senjaropay/merchant/payments/status', { referenceId }, { baseUrlOverride });
    }
    async getCardPaymentStatus(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/card/status', body, { baseUrlOverride });
    }
    async createMobilePayment(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/payments/create', body, {
            idempotent: true,
            baseUrlOverride,
        });
    }
    async createCardCheckout(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/card/pay', body, {
            idempotent: true,
            baseUrlOverride,
        });
    }
    async initiateHostedCheckout(body, baseUrlOverride) {
        return this.post('/api/hostedcheckout/initiate', body, {
            idempotent: true,
            baseUrlOverride,
        });
    }
    async listBillCategories(baseUrlOverride) {
        return this.post('/api/billPayments/categories', {}, { baseUrlOverride });
    }
    async lookupBill(body, baseUrlOverride) {
        return this.post('/api/billPayments/lookup', body, { baseUrlOverride });
    }
    async payBill(body, baseUrlOverride) {
        return this.post('/api/billPayments/pay', body, {
            idempotent: true,
            baseUrlOverride,
        });
    }
    async getBillStatus(body, baseUrlOverride) {
        return this.post('/api/billPayments/status', body, { baseUrlOverride });
    }
    async lookupBankAccount(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/fundtransfer/api/account-name-lookup', body, { baseUrlOverride });
    }
    async createCashoutTransfer(body, baseUrlOverride) {
        return this.post('/senjaropay/merchant/cashout/api/transfer', body, {
            idempotent: true,
            baseUrlOverride,
        });
    }
}
