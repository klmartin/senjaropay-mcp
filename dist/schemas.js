import { z } from 'zod';
const BaseUrlOverride = z
    .string()
    .url()
    .optional()
    .describe('Optional API base URL override (must be allowlisted via SENJAROPAY_ALLOWED_HOSTS)');
const CustomerSchema = z
    .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    phone_number: z.string().optional(),
})
    .partial();
export const GetWalletBalancesSchema = z.object({
    api_url: BaseUrlOverride,
});
export const ListTransactionsSchema = z.object({
    start_date: z.string().optional().describe('YYYY-MM-DD business date'),
    end_date: z.string().optional().describe('YYYY-MM-DD business date'),
    status: z.string().optional(),
    reference_id: z.string().optional(),
    limit: z.number().int().min(1).max(100).optional().default(10),
    offset: z.number().int().min(0).optional().default(0),
    api_url: BaseUrlOverride,
});
export const GetMobilePaymentStatusSchema = z.object({
    referenceId: z.string().min(1).describe('Payment reference returned by create_mobile_payment'),
    api_url: BaseUrlOverride,
});
export const GetCardPaymentStatusSchema = z
    .object({
    payment_id: z.string().optional(),
    transid: z.string().optional(),
    order_id: z.string().optional(),
    orderId: z.string().optional(),
    reference: z.string().optional(),
    api_url: BaseUrlOverride,
})
    .refine((v) => Boolean(v.payment_id || v.transid || v.order_id || v.orderId || v.reference), { message: 'Provide one of payment_id, transid, order_id, orderId, or reference' });
export const CreateMobilePaymentSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('TZS'),
    phone_number: z
        .string()
        .min(9)
        .describe('MSISDN, preferably 255XXXXXXXXX'),
    customer: CustomerSchema.optional(),
    webhook_url: z.string().url().optional(),
    submerchant_id: z.string().optional(),
    api_url: BaseUrlOverride,
});
export const CreateCardCheckoutSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('TZS'),
    email: z.string().email(),
    phone_number: z.string().min(9),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    webhook_url: z.string().url().optional(),
    success_url: z.string().url().optional(),
    fail_url: z.string().url().optional(),
    redirect_url: z.string().url().optional(),
    cancel_url: z.string().url().optional(),
    api_url: BaseUrlOverride,
});
export const InitiateHostedCheckoutSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('TZS'),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(9).describe('Tanzanian MSISDN e.g. 255712345678'),
    country: z.string().default('TZ'),
    city: z.string().default('Dar es Salaam'),
    address: z.string().optional(),
    description: z.string().optional(),
    redirect_url: z.string().url(),
    cancel_url: z.string().url(),
    callback_url: z.string().url().optional(),
    source: z.string().optional(),
    woo_order_id: z.string().optional(),
    woo_order_key: z.string().optional(),
    woo_site_url: z.string().url().optional(),
    api_url: BaseUrlOverride,
});
export const ListBillCategoriesSchema = z.object({
    api_url: BaseUrlOverride,
});
export const LookupBillSchema = z.object({
    utilityCode: z.string().min(1),
    utilityRef: z.string().min(1),
    api_url: BaseUrlOverride,
});
export const PayBillSchema = z.object({
    utilityCode: z.string().min(1),
    utilityRef: z.string().min(1),
    amount: z.number().positive(),
    wallet_id: z.union([z.string(), z.number()]).optional(),
    api_url: BaseUrlOverride,
});
export const GetBillStatusSchema = z.object({
    reference: z.string().optional(),
    reference_id: z.string().optional(),
    transid: z.string().optional(),
    api_url: BaseUrlOverride,
}).refine((v) => Boolean(v.reference || v.reference_id || v.transid), {
    message: 'Provide reference, reference_id, or transid',
});
export const LookupBankAccountSchema = z.object({
    bank: z.string().min(1),
    account: z.string().min(1),
    transid: z.string().optional(),
    api_url: BaseUrlOverride,
});
export const CreateCashoutTransferSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('TZS'),
    account: z.string().min(1),
    bank: z.string().min(1),
    name: z.string().optional(),
    receiver_name: z.string().optional(),
    account_name: z.string().optional(),
    api_url: BaseUrlOverride,
});
export const SimulateMerchantCallbackSchema = z.object({
    reference_id: z.string().min(1),
    status: z.string().default('SUCCESS'),
    amount: z.number().optional(),
    currency: z.string().length(3).optional().default('TZS'),
});
export const CreateDemoPaymentFlowSchema = z.object({
    amount: z.number().positive().default(1000),
    currency: z.string().length(3).default('TZS'),
    phone_number: z.string().default('255712345678'),
    email: z.string().email().default('demo@example.com'),
    api_url: BaseUrlOverride,
});
