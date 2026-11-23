import { zodToJsonSchema } from 'zod-to-json-schema';
import { GetWalletBalancesSchema, ListTransactionsSchema, GetMobilePaymentStatusSchema, GetCardPaymentStatusSchema, CreateMobilePaymentSchema, CreateCardCheckoutSchema, InitiateHostedCheckoutSchema, ListBillCategoriesSchema, LookupBillSchema, PayBillSchema, GetBillStatusSchema, LookupBankAccountSchema, CreateCashoutTransferSchema, SimulateMerchantCallbackSchema, CreateDemoPaymentFlowSchema, } from './schemas.js';
function schema(zodSchema) {
    return zodToJsonSchema(zodSchema);
}
export const TOOLS = [
    {
        name: 'get_wallet_balances',
        description: 'Fetch merchant wallet balances (TZS/USD). Maps to POST /senjaropay/merchant/payments/balance.',
        inputSchema: schema(GetWalletBalancesSchema),
    },
    {
        name: 'list_transactions',
        description: 'List merchant payment transactions with optional date/status filters. Maps to POST /senjaropay/merchant/payments/listTransactions.',
        inputSchema: schema(ListTransactionsSchema),
    },
    {
        name: 'get_mobile_payment_status',
        description: 'Get mobile money payment status by referenceId. Maps to POST /senjaropay/merchant/payments/status.',
        inputSchema: schema(GetMobilePaymentStatusSchema),
    },
    {
        name: 'get_card_payment_status',
        description: 'Get card payment status by payment_id/transid/order_id/reference. Maps to POST /senjaropay/merchant/card/status.',
        inputSchema: schema(GetCardPaymentStatusSchema),
    },
    {
        name: 'create_mobile_payment',
        description: 'MOVES MONEY (USSD push). Create a mobile money collection. Requires human approval in live mode. Maps to POST /senjaropay/merchant/payments/create. Sends x-idempotency-key automatically.',
        inputSchema: schema(CreateMobilePaymentSchema),
    },
    {
        name: 'create_card_checkout',
        description: 'MOVES MONEY once customer pays. Create a card checkout session and return checkout_url. Maps to POST /senjaropay/merchant/card/pay.',
        inputSchema: schema(CreateCardCheckoutSchema),
    },
    {
        name: 'initiate_hosted_checkout',
        description: 'Create a hosted checkout / WooCommerce payment session. Returns senjaropay.me/PL-… pay link. Maps to POST /api/hostedcheckout/initiate.',
        inputSchema: schema(InitiateHostedCheckoutSchema),
    },
    {
        name: 'list_bill_categories',
        description: 'List bill payment categories (LUKU, airtime, etc.). Maps to POST /api/billPayments/categories.',
        inputSchema: schema(ListBillCategoriesSchema),
    },
    {
        name: 'lookup_bill',
        description: 'Look up a utility bill by utilityCode + utilityRef. Read-only. Maps to POST /api/billPayments/lookup.',
        inputSchema: schema(LookupBillSchema),
    },
    {
        name: 'pay_bill',
        description: 'MOVES MONEY. Pay a utility bill from merchant wallet. Require human approval in live mode. Maps to POST /api/billPayments/pay.',
        inputSchema: schema(PayBillSchema),
    },
    {
        name: 'get_bill_status',
        description: 'Get bill payment status. Maps to POST /api/billPayments/status.',
        inputSchema: schema(GetBillStatusSchema),
    },
    {
        name: 'lookup_bank_account',
        description: 'Resolve a bank account name before cashout. Maps to POST /senjaropay/merchant/fundtransfer/api/account-name-lookup.',
        inputSchema: schema(LookupBankAccountSchema),
    },
    {
        name: 'create_cashout_transfer',
        description: 'MOVES MONEY. Create a merchant cashout/bank transfer. Require human approval in live mode. Maps to POST /senjaropay/merchant/cashout/api/transfer.',
        inputSchema: schema(CreateCashoutTransferSchema),
    },
    {
        name: 'simulate_merchant_callback',
        description: 'Return a golden merchant webhook/callback payload example for grounding webhook integrations (does not call the network).',
        inputSchema: schema(SimulateMerchantCallbackSchema),
    },
    {
        name: 'create_demo_payment_flow',
        description: 'Grounding tool: runs balance → create mobile payment → status → card checkout as a chronological trace with insights. Live mode only when SENJAROPAY_ENVIRONMENT=sandbox (or mock).',
        inputSchema: schema(CreateDemoPaymentFlowSchema),
    },
];
