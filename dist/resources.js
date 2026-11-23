export const RESOURCES = [
    {
        uri: 'senjaropay://docs/auth',
        name: 'Authentication',
        description: 'How SenjaroPay merchant API authentication works',
        mimeType: 'text/markdown',
        text: `# SenjaroPay API Authentication

Merchant API routes use API key headers:

\`\`\`
x-api-key: YOUR_PUBLIC_KEY
x-api-secret: YOUR_SECRET
\`\`\`

Money-creating routes also require:

\`\`\`
x-idempotency-key: <unique-uuid-per-attempt>
\`\`\`

Scopes commonly used:
- \`payments:create\` — create mobile/card payments, bills, cashout
- \`payments:read\` / \`transactions:read\` — status & lists
- \`balance:read\` — wallet balances

Base URL (production): \`https://api.senjaropay.com\`

MCP env:
- \`SENJAROPAY_API_KEY\`
- \`SENJAROPAY_API_SECRET\`
- \`SENJAROPAY_API_BASE_URL\` (optional)
- \`SENJAROPAY_ENVIRONMENT\` = sandbox | production | mock
`,
    },
    {
        uri: 'senjaropay://docs/mobile-payments',
        name: 'Mobile payments',
        description: 'Create and poll mobile money collections',
        mimeType: 'text/markdown',
        text: `# Mobile Money Collections

## Create
\`POST /senjaropay/merchant/payments/create\`

Body sketch:
\`\`\`json
{
  "payment_type": "mobile",
  "phone_number": "255712345678",
  "details": { "amount": 1000, "currency": "TZS" },
  "customer": { "firstname": "Jane", "lastname": "Doe", "email": "jane@example.com" },
  "webhook_url": "https://merchant.example/hooks/senjaropay"
}
\`\`\`

Response includes \`data.reference\` and \`data.status: pending\`.

## Status
\`POST /senjaropay/merchant/payments/status\` with \`{ "referenceId": "..." }\`.

Statuses: PENDING, SUCCESS, FAIL, CANCELLED.
`,
    },
    {
        uri: 'senjaropay://docs/card-payments',
        name: 'Card checkout',
        description: 'Card checkout URL flow via Unlimit',
        mimeType: 'text/markdown',
        text: `# Card Checkout

## Create
\`POST /senjaropay/merchant/card/pay\`

Returns \`data.checkout_url\` — redirect the customer there.

## Status
\`POST /senjaropay/merchant/card/status\` with one of:
\`payment_id\`, \`transid\`, \`order_id\`, \`orderId\`, \`reference\`.
`,
    },
    {
        uri: 'senjaropay://docs/hosted-checkout',
        name: 'Hosted checkout / WooCommerce',
        description: 'Hosted checkout bridged to senjaropay.me pay links',
        mimeType: 'text/markdown',
        text: `# Hosted Checkout

\`POST /api/hostedcheckout/initiate\` creates a one-day invoice pay link.

Response:
- \`redirect_url\` / \`payment_link\` → \`https://senjaropay.me/PL-...\`
- \`token\` / \`reference_id\` → pay-link reference

For WooCommerce, pass \`callback_url\`, \`woo_order_id\`, \`woo_order_key\`, \`woo_site_url\`.

Do **not** use \`/process/{token}\` — that frontend route does not exist.
`,
    },
    {
        uri: 'senjaropay://docs/webhooks',
        name: 'Merchant webhooks',
        description: 'Callback payload shape and signing',
        mimeType: 'text/markdown',
        text: `# Merchant Callbacks

SenjaroPay POSTs JSON to \`transactions.callback_url\`:

\`\`\`json
{
  "reference_id": "MOB_...",
  "status": "SUCCESS",
  "transaction_id": "uuid",
  "currency": "TZS",
  "merchant_id": "uuid",
  "updated_at": "ISO-8601"
}
\`\`\`

Optional signed headers:
- \`X-SenjaroPay-Timestamp\`
- \`X-SenjaroPay-Signature\` (\`t=...,v1=...\`)

Use tool \`simulate_merchant_callback\` for a golden payload.
`,
    },
    {
        uri: 'senjaropay://examples/node-express',
        name: 'Golden Node/Express pattern',
        description: 'Minimal Node create + status polling example',
        mimeType: 'text/markdown',
        text: `# Golden Node pattern

\`\`\`js
import axios from 'axios';
import { randomUUID } from 'crypto';

const client = axios.create({
  baseURL: process.env.SENJAROPAY_API_BASE_URL || 'https://api.senjaropay.com',
  headers: {
    'x-api-key': process.env.SENJAROPAY_API_KEY,
    'x-api-secret': process.env.SENJAROPAY_API_SECRET,
    'Content-Type': 'application/json',
  },
});

export async function createMobilePayment({ amount, phone }) {
  const { data } = await client.post(
    '/senjaropay/merchant/payments/create',
    {
      payment_type: 'mobile',
      phone_number: phone,
      details: { amount, currency: 'TZS' },
    },
    { headers: { 'x-idempotency-key': randomUUID() } },
  );
  return data;
}

export async function getStatus(referenceId) {
  const { data } = await client.post('/senjaropay/merchant/payments/status', {
    referenceId,
  });
  return data;
}
\`\`\`
`,
    },
    {
        uri: 'senjaropay://examples/curl',
        name: 'Golden curl examples',
        description: 'curl snippets for balance, create, status',
        mimeType: 'text/markdown',
        text: `# curl examples

\`\`\`bash
# Balance
curl -sS -X POST "$BASE/senjaropay/merchant/payments/balance" \\
  -H "x-api-key: $KEY" -H "x-api-secret: $SECRET"

# Create mobile payment
curl -sS -X POST "$BASE/senjaropay/merchant/payments/create" \\
  -H "x-api-key: $KEY" -H "x-api-secret: $SECRET" \\
  -H "x-idempotency-key: $(uuidgen)" \\
  -H "Content-Type: application/json" \\
  -d '{"payment_type":"mobile","phone_number":"255712345678","details":{"amount":1000,"currency":"TZS"}}'

# Status
curl -sS -X POST "$BASE/senjaropay/merchant/payments/status" \\
  -H "x-api-key: $KEY" -H "x-api-secret: $SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"referenceId":"MOB_..."}'
\`\`\`
`,
    },
];
export function getResource(uri) {
    return RESOURCES.find((r) => r.uri === uri);
}
