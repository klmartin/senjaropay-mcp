# Decisions

## Scope — v1 tools

Context: expose SenjaroPay merchant APIs to AI agents via MCP, similar to
Tunzaa/Malipo MCP.

### Chosen
- **Separate GitHub repo (`senjaropay-mcp`)**, not a folder inside the Express
  monolith. Agents install with `npx -y github:…` like Tunzaa.
- **API-key tools only** for v1. Session/JWT routes (paylink admin, webhook
  settings UI) need new API-key wrappers before MCP exposure.
- **Mock-by-default** when `SENJAROPAY_API_KEY` / `SENJAROPAY_API_SECRET` are
  unset. Live mode when both are set and environment ≠ `mock`.
- **stdio transport only** for Claude Desktop / Cursor / Windsurf.
- **Money-moving tools** (`create_mobile_payment`, `create_card_checkout`,
  `pay_bill`, `create_cashout_transfer`) include explicit danger language so
  clients can require human approval.
- **`create_demo_payment_flow` live path is sandbox-only** to avoid accidental
  production charges from a grounding tool.
- **Hosted checkout included** because WooCommerce/pay-link bridge is a core
  merchant onboarding path (`/api/hostedcheckout/initiate` → `senjaropay.me/PL-…`).

### Rejected / deferred
- Remote HTTP MCP hosting (v1 is local stdio).
- Paylink CRUD / webhook admin (session auth today).
- Spend caps (revisit after first merchant agents ship).

### Endpoint map (locked)
| Tool | Endpoint |
|---|---|
| get_wallet_balances | POST /senjaropay/merchant/payments/balance |
| list_transactions | POST /senjaropay/merchant/payments/listTransactions |
| get_mobile_payment_status | POST /senjaropay/merchant/payments/status |
| get_card_payment_status | POST /senjaropay/merchant/card/status |
| create_mobile_payment | POST /senjaropay/merchant/payments/create |
| create_card_checkout | POST /senjaropay/merchant/card/pay |
| initiate_hosted_checkout | POST /api/hostedcheckout/initiate |
| list_bill_categories | POST /api/billPayments/categories |
| lookup_bill | POST /api/billPayments/lookup |
| pay_bill | POST /api/billPayments/pay |
| get_bill_status | POST /api/billPayments/status |
| lookup_bank_account | POST /senjaropay/merchant/fundtransfer/api/account-name-lookup |
| create_cashout_transfer | POST /senjaropay/merchant/cashout/api/transfer |
