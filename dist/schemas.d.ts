import { z } from 'zod';
export declare const GetWalletBalancesSchema: z.ZodObject<{
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    api_url?: string | undefined;
}, {
    api_url?: string | undefined;
}>;
export declare const ListTransactionsSchema: z.ZodObject<{
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    status?: string | undefined;
    api_url?: string | undefined;
    start_date?: string | undefined;
    end_date?: string | undefined;
    reference_id?: string | undefined;
}, {
    status?: string | undefined;
    api_url?: string | undefined;
    start_date?: string | undefined;
    end_date?: string | undefined;
    reference_id?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
export declare const GetMobilePaymentStatusSchema: z.ZodObject<{
    referenceId: z.ZodString;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    referenceId: string;
    api_url?: string | undefined;
}, {
    referenceId: string;
    api_url?: string | undefined;
}>;
export declare const GetCardPaymentStatusSchema: z.ZodEffects<z.ZodObject<{
    payment_id: z.ZodOptional<z.ZodString>;
    transid: z.ZodOptional<z.ZodString>;
    order_id: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    api_url?: string | undefined;
    payment_id?: string | undefined;
    transid?: string | undefined;
    order_id?: string | undefined;
    orderId?: string | undefined;
    reference?: string | undefined;
}, {
    api_url?: string | undefined;
    payment_id?: string | undefined;
    transid?: string | undefined;
    order_id?: string | undefined;
    orderId?: string | undefined;
    reference?: string | undefined;
}>, {
    api_url?: string | undefined;
    payment_id?: string | undefined;
    transid?: string | undefined;
    order_id?: string | undefined;
    orderId?: string | undefined;
    reference?: string | undefined;
}, {
    api_url?: string | undefined;
    payment_id?: string | undefined;
    transid?: string | undefined;
    order_id?: string | undefined;
    orderId?: string | undefined;
    reference?: string | undefined;
}>;
export declare const CreateMobilePaymentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    phone_number: z.ZodString;
    customer: z.ZodOptional<z.ZodObject<{
        firstname: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        lastname: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        country: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone_number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        firstname?: string | undefined;
        lastname?: string | undefined;
        email?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        address?: string | undefined;
        phone_number?: string | undefined;
    }, {
        firstname?: string | undefined;
        lastname?: string | undefined;
        email?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        address?: string | undefined;
        phone_number?: string | undefined;
    }>>;
    webhook_url: z.ZodOptional<z.ZodString>;
    submerchant_id: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phone_number: string;
    amount: number;
    currency: string;
    api_url?: string | undefined;
    customer?: {
        firstname?: string | undefined;
        lastname?: string | undefined;
        email?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        address?: string | undefined;
        phone_number?: string | undefined;
    } | undefined;
    webhook_url?: string | undefined;
    submerchant_id?: string | undefined;
}, {
    phone_number: string;
    amount: number;
    api_url?: string | undefined;
    currency?: string | undefined;
    customer?: {
        firstname?: string | undefined;
        lastname?: string | undefined;
        email?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        address?: string | undefined;
        phone_number?: string | undefined;
    } | undefined;
    webhook_url?: string | undefined;
    submerchant_id?: string | undefined;
}>;
export declare const CreateCardCheckoutSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    email: z.ZodString;
    phone_number: z.ZodString;
    firstname: z.ZodOptional<z.ZodString>;
    lastname: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    webhook_url: z.ZodOptional<z.ZodString>;
    success_url: z.ZodOptional<z.ZodString>;
    fail_url: z.ZodOptional<z.ZodString>;
    redirect_url: z.ZodOptional<z.ZodString>;
    cancel_url: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone_number: string;
    amount: number;
    currency: string;
    firstname?: string | undefined;
    lastname?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    api_url?: string | undefined;
    webhook_url?: string | undefined;
    success_url?: string | undefined;
    fail_url?: string | undefined;
    redirect_url?: string | undefined;
    cancel_url?: string | undefined;
}, {
    email: string;
    phone_number: string;
    amount: number;
    firstname?: string | undefined;
    lastname?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    api_url?: string | undefined;
    currency?: string | undefined;
    webhook_url?: string | undefined;
    success_url?: string | undefined;
    fail_url?: string | undefined;
    redirect_url?: string | undefined;
    cancel_url?: string | undefined;
}>;
export declare const InitiateHostedCheckoutSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    country: z.ZodDefault<z.ZodString>;
    city: z.ZodDefault<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    redirect_url: z.ZodString;
    cancel_url: z.ZodString;
    callback_url: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    woo_order_id: z.ZodOptional<z.ZodString>;
    woo_order_key: z.ZodOptional<z.ZodString>;
    woo_site_url: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    country: string;
    city: string;
    amount: number;
    currency: string;
    redirect_url: string;
    cancel_url: string;
    first_name: string;
    last_name: string;
    phone: string;
    address?: string | undefined;
    api_url?: string | undefined;
    description?: string | undefined;
    callback_url?: string | undefined;
    source?: string | undefined;
    woo_order_id?: string | undefined;
    woo_order_key?: string | undefined;
    woo_site_url?: string | undefined;
}, {
    email: string;
    amount: number;
    redirect_url: string;
    cancel_url: string;
    first_name: string;
    last_name: string;
    phone: string;
    country?: string | undefined;
    city?: string | undefined;
    address?: string | undefined;
    api_url?: string | undefined;
    currency?: string | undefined;
    description?: string | undefined;
    callback_url?: string | undefined;
    source?: string | undefined;
    woo_order_id?: string | undefined;
    woo_order_key?: string | undefined;
    woo_site_url?: string | undefined;
}>;
export declare const ListBillCategoriesSchema: z.ZodObject<{
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    api_url?: string | undefined;
}, {
    api_url?: string | undefined;
}>;
export declare const LookupBillSchema: z.ZodObject<{
    utilityCode: z.ZodString;
    utilityRef: z.ZodString;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    utilityCode: string;
    utilityRef: string;
    api_url?: string | undefined;
}, {
    utilityCode: string;
    utilityRef: string;
    api_url?: string | undefined;
}>;
export declare const PayBillSchema: z.ZodObject<{
    utilityCode: z.ZodString;
    utilityRef: z.ZodString;
    amount: z.ZodNumber;
    wallet_id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    utilityCode: string;
    utilityRef: string;
    api_url?: string | undefined;
    wallet_id?: string | number | undefined;
}, {
    amount: number;
    utilityCode: string;
    utilityRef: string;
    api_url?: string | undefined;
    wallet_id?: string | number | undefined;
}>;
export declare const GetBillStatusSchema: z.ZodEffects<z.ZodObject<{
    reference: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    transid: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    api_url?: string | undefined;
    reference_id?: string | undefined;
    transid?: string | undefined;
    reference?: string | undefined;
}, {
    api_url?: string | undefined;
    reference_id?: string | undefined;
    transid?: string | undefined;
    reference?: string | undefined;
}>, {
    api_url?: string | undefined;
    reference_id?: string | undefined;
    transid?: string | undefined;
    reference?: string | undefined;
}, {
    api_url?: string | undefined;
    reference_id?: string | undefined;
    transid?: string | undefined;
    reference?: string | undefined;
}>;
export declare const LookupBankAccountSchema: z.ZodObject<{
    bank: z.ZodString;
    account: z.ZodString;
    transid: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    bank: string;
    account: string;
    api_url?: string | undefined;
    transid?: string | undefined;
}, {
    bank: string;
    account: string;
    api_url?: string | undefined;
    transid?: string | undefined;
}>;
export declare const CreateCashoutTransferSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    account: z.ZodString;
    bank: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    receiver_name: z.ZodOptional<z.ZodString>;
    account_name: z.ZodOptional<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    bank: string;
    account: string;
    api_url?: string | undefined;
    name?: string | undefined;
    receiver_name?: string | undefined;
    account_name?: string | undefined;
}, {
    amount: number;
    bank: string;
    account: string;
    api_url?: string | undefined;
    currency?: string | undefined;
    name?: string | undefined;
    receiver_name?: string | undefined;
    account_name?: string | undefined;
}>;
export declare const SimulateMerchantCallbackSchema: z.ZodObject<{
    reference_id: z.ZodString;
    status: z.ZodDefault<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    reference_id: string;
    currency: string;
    amount?: number | undefined;
}, {
    reference_id: string;
    status?: string | undefined;
    amount?: number | undefined;
    currency?: string | undefined;
}>;
export declare const CreateDemoPaymentFlowSchema: z.ZodObject<{
    amount: z.ZodDefault<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodString>;
    phone_number: z.ZodDefault<z.ZodString>;
    email: z.ZodDefault<z.ZodString>;
    api_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone_number: string;
    amount: number;
    currency: string;
    api_url?: string | undefined;
}, {
    email?: string | undefined;
    phone_number?: string | undefined;
    api_url?: string | undefined;
    amount?: number | undefined;
    currency?: string | undefined;
}>;
