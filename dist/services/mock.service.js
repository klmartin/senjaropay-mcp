import { randomUUID } from 'crypto';
function ok(data) {
    return { ok: true, status: 200, data, mock: true };
}
function ref(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
export const MockService = {
    getWalletBalances() {
        return ok({
            count: 2,
            wallets: [
                {
                    id: 221,
                    currency: 'TZS',
                    actual_balance: 250000.0,
                    available_balance: 248500.0,
                    owner_type: 'MERCHANT',
                },
                {
                    id: 222,
                    currency: 'USD',
                    actual_balance: 120.5,
                    available_balance: 120.5,
                    owner_type: 'MERCHANT',
                },
            ],
            grounding: {
                note: 'Mock wallet balances. Live mode calls POST /senjaropay/merchant/payments/balance.',
            },
        });
    },
    listTransactions(args) {
        const limit = Math.min(Math.max(Number(args.limit) || 10, 1), 100);
        const rows = Array.from({ length: Math.min(limit, 3) }, (_, i) => ({
            id: randomUUID(),
            transaction_reference_id: `SP260101.1200.S${10000 + i}`,
            reference_id: ref('MOB'),
            amount: 1000 + i * 500,
            currency: 'TZS',
            status: args.status || (i === 0 ? 'SUCCESS' : 'PENDING'),
            method: 'MOBILE',
            main_channel: 'SELCOM',
            sub_channel: 'MPESA',
            customer_phone: '255712345678',
            customer_email: 'customer@example.com',
            created_at: new Date(Date.now() - i * 3600_000).toISOString(),
        }));
        return ok({
            status: 'success',
            merchant_id: 'mock-merchant-id',
            count: rows.length,
            data: rows,
            grounding: {
                note: 'Mock transaction list. Live filters: start_date, end_date, status, reference_id, limit, offset.',
            },
        });
    },
    getMobilePaymentStatus(referenceId) {
        return ok({
            message: 'Transaction found',
            transactionId: randomUUID(),
            displayId: 'SP260101.1200.S12345',
            method: 'MOBILE',
            status: 'SUCCESS',
            reference_id: referenceId,
            amount: 1000,
            currency: 'TZS',
            created_at: new Date().toISOString(),
            grounding: {
                note: 'Statuses commonly include PENDING, SUCCESS, FAIL, CANCELLED.',
            },
        });
    },
    getCardPaymentStatus(reference) {
        return ok({
            status: 'success',
            code: 200,
            data: {
                object: 'payment',
                payment_type: 'card',
                reference,
                payment_id: randomUUID(),
                status: 'SUCCESS',
                amount: { currency: 'TZS', value: 5000 },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                provider_status: 'COMPLETED',
            },
            grounding: {
                note: 'Accepts payment_id | transid | order_id | orderId | reference.',
            },
        });
    },
    createMobilePayment(args) {
        const reference = ref('MOB');
        return ok({
            status: 'success',
            code: 201,
            data: {
                amount: { currency: args.currency.toUpperCase(), value: args.amount },
                api_version: '1.0',
                expires_at: new Date(Date.now() + 15 * 60_000).toISOString(),
                object: 'payment',
                payment_type: 'mobile',
                reference,
                status: 'pending',
                phone_number: args.phone_number,
                submerchant_id: null,
            },
            grounding: {
                note: 'Live create requires header x-idempotency-key and body payment_type=mobile.',
                next_step: `Poll get_mobile_payment_status with referenceId=${reference}`,
            },
        });
    },
    createCardCheckout(args) {
        const reference = ref('CARD');
        return ok({
            status: 'success',
            code: 201,
            data: {
                amount: { currency: args.currency.toUpperCase(), value: args.amount },
                expires_at: new Date(Date.now() + 30 * 60_000).toISOString(),
                object: 'payment',
                payment_type: 'card',
                reference,
                status: 'pending',
                checkout_url: `https://checkout.example/mock/${reference}`,
            },
            grounding: {
                note: 'Redirect the customer to checkout_url. Confirm via get_card_payment_status.',
            },
        });
    },
    initiateHostedCheckout(args) {
        const referenceId = `PL-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
        const paymentLink = `https://senjaropay.me/${referenceId}`;
        return ok({
            success: true,
            message: 'Checkout session created (MOCK)',
            token: referenceId,
            reference_id: referenceId,
            payment_link: paymentLink,
            redirect_url: paymentLink,
            requested_amount: args.amount,
            requested_currency: args.currency.toUpperCase(),
            woocommerce: args.woo_order_id
                ? { woo_order_id: args.woo_order_id }
                : undefined,
            grounding: {
                note: 'Hosted checkout bridges to a custom pay link on senjaropay.me/{reference}.',
            },
        });
    },
    listBillCategories() {
        return ok({
            success: true,
            data: [
                { id: 1, name: 'Electricity', code: 'LUKU' },
                { id: 2, name: 'Airtime', code: 'TOP' },
                { id: 3, name: 'Water', code: 'DAWASCO' },
            ],
        });
    },
    lookupBill(args) {
        return ok({
            success: true,
            data: {
                utilityCode: args.utilityCode,
                utilityRef: args.utilityRef,
                customer_name: 'Mock Customer',
                amount_due: 15000,
                currency: 'TZS',
                status: 'FOUND',
            },
        });
    },
    payBill(args) {
        const reference = ref('BILL');
        return ok({
            success: true,
            data: {
                reference,
                status: 'PENDING',
                amount: args.amount,
                utilityCode: args.utilityCode,
                utilityRef: args.utilityRef,
            },
            grounding: {
                warning: 'This tool moves money in live mode. Confirm with a human first.',
            },
        });
    },
    getBillStatus(reference) {
        return ok({
            success: true,
            data: {
                reference,
                status: 'SUCCESS',
                amount: 15000,
                currency: 'TZS',
            },
        });
    },
    lookupBankAccount(args) {
        return ok({
            success: true,
            data: {
                bank: args.bank,
                account: args.account,
                account_name: 'MOCK ACCOUNT NAME',
            },
        });
    },
    createCashoutTransfer(args) {
        return ok({
            status: 'success',
            code: 201,
            data: {
                object: 'withdrawal',
                status: 'PENDING',
                amount: args.amount,
                currency: args.currency.toUpperCase(),
                bank: args.bank,
                account: args.account,
                account_name: 'MOCK ACCOUNT NAME',
                reference: ref('WD'),
            },
            grounding: {
                warning: 'Cashout moves merchant funds. Require human approval in live mode.',
            },
        });
    },
    simulateMerchantCallback(args) {
        return ok({
            callback_url_example: 'https://merchant.example/webhooks/senjaropay',
            headers_example: {
                'Content-Type': 'application/json',
                'X-SenjaroPay-Timestamp': String(Math.floor(Date.now() / 1000)),
                'X-SenjaroPay-Signature': 't=...,v1=...',
            },
            payload: {
                reference_id: args.reference_id,
                status: args.status.toUpperCase(),
                transaction_id: randomUUID(),
                currency: (args.currency || 'TZS').toUpperCase(),
                amount: args.amount ?? 1000,
                merchant_id: 'mock-merchant-id',
                updated_at: new Date().toISOString(),
                woo_order_id: null,
                checkout_token: null,
            },
            grounding: {
                note: 'Merchant callbacks POST JSON to transactions.callback_url. WooCommerce merges query params like woo_order_id into the body.',
            },
        });
    },
};
