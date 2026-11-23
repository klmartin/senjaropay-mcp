# SenjaroPay MCP Server

**Grounding for AI-driven SenjaroPay payment integrations**

This MCP server exposes SenjaroPay merchant payment APIs to AI agents (Claude Desktop, Cursor, Windsurf). It returns high-fidelity mock responses by default and can call your live/sandbox API when credentials are configured.

Inspired by [Tunzaa/tunzaa_mcp](https://github.com/Tunzaa/tunzaa_mcp).

## Instant Start

Run directly from GitHub (no clone required):

### 1. Claude Desktop

Add to `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "senjaropay": {
      "command": "npx",
      "args": ["-y", "github:klmartin/senjaropay-mcp"]
    }
  }
}
```

### 2. Cursor

1. **Settings → MCP → Add New MCP Server**
2. Name: `senjaropay`
3. Type: `command`
4. Command: `npx -y github:klmartin/senjaropay-mcp`

Or in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "senjaropay": {
      "command": "npx",
      "args": ["-y", "github:klmartin/senjaropay-mcp"]
    }
  }
}
```

### 3. Windsurf

```json
{
  "mcpServers": {
    "senjaropay": {
      "command": "npx",
      "args": ["-y", "github:klmartin/senjaropay-mcp"]
    }
  }
}
```

---

## Live mode

Add credentials under `env`:

```json
"env": {
  "SENJAROPAY_API_KEY": "your_api_key",
  "SENJAROPAY_API_SECRET": "your_api_secret",
  "SENJAROPAY_API_BASE_URL": "https://api.senjaropay.com",
  "SENJAROPAY_ENVIRONMENT": "sandbox"
}
```

| Variable | Default | Purpose |
|---|---|---|
| `SENJAROPAY_API_KEY` | _(empty)_ | Merchant `x-api-key` |
| `SENJAROPAY_API_SECRET` | _(empty)_ | Merchant `x-api-secret` |
| `SENJAROPAY_API_BASE_URL` | `https://api.senjaropay.com` | API host |
| `SENJAROPAY_ENVIRONMENT` | `sandbox` | `sandbox` \| `production` \| `mock` |
| `SENJAROPAY_ALLOWED_HOSTS` | _(empty)_ | Extra hosts allowed for per-tool `api_url` overrides |

If key/secret are missing (or environment is `mock`), tools return golden mock payloads.

---

## Tools

### Core
- `get_wallet_balances`
- `list_transactions`
- `get_mobile_payment_status`
- `get_card_payment_status`
- `create_mobile_payment` *(moves money)*
- `create_card_checkout` *(moves money after customer pays)*

### Extra
- `initiate_hosted_checkout` — Woo / pay-link bridge → `senjaropay.me/PL-…`
- `list_bill_categories`
- `lookup_bill`
- `pay_bill` *(moves money)*
- `get_bill_status`
- `lookup_bank_account`
- `create_cashout_transfer` *(moves money)*
- `simulate_merchant_callback`
- `create_demo_payment_flow` — grounding trace (mock, or live sandbox only)

### Resources
- `senjaropay://docs/auth`
- `senjaropay://docs/mobile-payments`
- `senjaropay://docs/card-payments`
- `senjaropay://docs/hosted-checkout`
- `senjaropay://docs/webhooks`
- `senjaropay://examples/node-express`
- `senjaropay://examples/curl`

---

## Vibe coding workflow

1. Install this MCP server.
2. Ask: *“List SenjaroPay resources and read the authentication guide.”*
3. Run: `create_demo_payment_flow`
4. Ask: *“Using the grounding trace and node-express example, implement checkout in my app.”*

---

## Local development

```bash
git clone https://github.com/klmartin/senjaropay-mcp.git
cd senjaropay-mcp
npm install
npm run build
```

Point your MCP config at the local build:

```json
{
  "command": "node",
  "args": ["C:/Users/USER/Desktop/Projects/senjaropay-mcp/dist/index.js"]
}
```

Smoke test (mock mode):

```bash
npm run smoke
```

## License

ISC
