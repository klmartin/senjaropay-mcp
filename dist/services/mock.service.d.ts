import type { ApiResult } from '../types.js';
export declare const MockService: {
    getWalletBalances(): ApiResult<{
        count: number;
        wallets: {
            id: number;
            currency: string;
            actual_balance: number;
            available_balance: number;
            owner_type: string;
        }[];
        grounding: {
            note: string;
        };
    }>;
    listTransactions(args: {
        limit?: number;
        offset?: number;
        status?: string | null;
    }): ApiResult<{
        status: string;
        merchant_id: string;
        count: number;
        data: {
            id: `${string}-${string}-${string}-${string}-${string}`;
            transaction_reference_id: string;
            reference_id: string;
            amount: number;
            currency: string;
            status: string;
            method: string;
            main_channel: string;
            sub_channel: string;
            customer_phone: string;
            customer_email: string;
            created_at: string;
        }[];
        grounding: {
            note: string;
        };
    }>;
    getMobilePaymentStatus(referenceId: string): ApiResult<{
        message: string;
        transactionId: `${string}-${string}-${string}-${string}-${string}`;
        displayId: string;
        method: string;
        status: string;
        reference_id: string;
        amount: number;
        currency: string;
        created_at: string;
        grounding: {
            note: string;
        };
    }>;
    getCardPaymentStatus(reference: string): ApiResult<{
        status: string;
        code: number;
        data: {
            object: string;
            payment_type: string;
            reference: string;
            payment_id: `${string}-${string}-${string}-${string}-${string}`;
            status: string;
            amount: {
                currency: string;
                value: number;
            };
            created_at: string;
            updated_at: string;
            provider_status: string;
        };
        grounding: {
            note: string;
        };
    }>;
    createMobilePayment(args: {
        amount: number;
        currency: string;
        phone_number: string;
    }): ApiResult<{
        status: string;
        code: number;
        data: {
            amount: {
                currency: string;
                value: number;
            };
            api_version: string;
            expires_at: string;
            object: string;
            payment_type: string;
            reference: string;
            status: string;
            phone_number: string;
            submerchant_id: null;
        };
        grounding: {
            note: string;
            next_step: string;
        };
    }>;
    createCardCheckout(args: {
        amount: number;
        currency: string;
    }): ApiResult<{
        status: string;
        code: number;
        data: {
            amount: {
                currency: string;
                value: number;
            };
            expires_at: string;
            object: string;
            payment_type: string;
            reference: string;
            status: string;
            checkout_url: string;
        };
        grounding: {
            note: string;
        };
    }>;
    initiateHostedCheckout(args: {
        amount: number;
        currency: string;
        woo_order_id?: string | null;
    }): ApiResult<{
        success: boolean;
        message: string;
        token: string;
        reference_id: string;
        payment_link: string;
        redirect_url: string;
        requested_amount: number;
        requested_currency: string;
        woocommerce: {
            woo_order_id: string;
        } | undefined;
        grounding: {
            note: string;
        };
    }>;
    listBillCategories(): ApiResult<{
        success: boolean;
        data: {
            id: number;
            name: string;
            code: string;
        }[];
    }>;
    lookupBill(args: {
        utilityCode: string;
        utilityRef: string;
    }): ApiResult<{
        success: boolean;
        data: {
            utilityCode: string;
            utilityRef: string;
            customer_name: string;
            amount_due: number;
            currency: string;
            status: string;
        };
    }>;
    payBill(args: {
        amount: number;
        utilityCode: string;
        utilityRef: string;
    }): ApiResult<{
        success: boolean;
        data: {
            reference: string;
            status: string;
            amount: number;
            utilityCode: string;
            utilityRef: string;
        };
        grounding: {
            warning: string;
        };
    }>;
    getBillStatus(reference: string): ApiResult<{
        success: boolean;
        data: {
            reference: string;
            status: string;
            amount: number;
            currency: string;
        };
    }>;
    lookupBankAccount(args: {
        bank: string;
        account: string;
    }): ApiResult<{
        success: boolean;
        data: {
            bank: string;
            account: string;
            account_name: string;
        };
    }>;
    createCashoutTransfer(args: {
        amount: number;
        currency: string;
        bank: string;
        account: string;
    }): ApiResult<{
        status: string;
        code: number;
        data: {
            object: string;
            status: string;
            amount: number;
            currency: string;
            bank: string;
            account: string;
            account_name: string;
            reference: string;
        };
        grounding: {
            warning: string;
        };
    }>;
    simulateMerchantCallback(args: {
        reference_id: string;
        status: string;
        amount?: number;
        currency?: string;
    }): ApiResult<{
        callback_url_example: string;
        headers_example: {
            'Content-Type': string;
            'X-SenjaroPay-Timestamp': string;
            'X-SenjaroPay-Signature': string;
        };
        payload: {
            reference_id: string;
            status: string;
            transaction_id: `${string}-${string}-${string}-${string}-${string}`;
            currency: string;
            amount: number;
            merchant_id: string;
            updated_at: string;
            woo_order_id: null;
            checkout_token: null;
        };
        grounding: {
            note: string;
        };
    }>;
};
