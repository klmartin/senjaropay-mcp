#!/usr/bin/env node
/**
 * Smoke test: import built server modules and exercise mock handlers
 * without starting stdio (so CI can run non-interactively).
 */
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function load(rel) {
  return import(pathToFileURL(path.join(root, rel)).href);
}

async function main() {
  process.env.SENJAROPAY_ENVIRONMENT = 'mock';
  delete process.env.SENJAROPAY_API_KEY;
  delete process.env.SENJAROPAY_API_SECRET;

  const { TOOLS } = await load('dist/tools.js');
  const { RESOURCES } = await load('dist/resources.js');
  const { MockService } = await load('dist/services/mock.service.js');
  const { loadConfig } = await load('dist/config.js');

  const config = loadConfig();
  if (config.isLive) {
    throw new Error('Expected mock mode when keys are unset');
  }

  if (!Array.isArray(TOOLS) || TOOLS.length < 10) {
    throw new Error(`Expected >=10 tools, got ${TOOLS?.length}`);
  }

  const names = new Set(TOOLS.map((t) => t.name));
  for (const required of [
    'get_wallet_balances',
    'list_transactions',
    'get_mobile_payment_status',
    'get_card_payment_status',
    'create_mobile_payment',
    'create_card_checkout',
    'initiate_hosted_checkout',
    'create_demo_payment_flow',
  ]) {
    if (!names.has(required)) throw new Error(`Missing tool: ${required}`);
  }

  if (!RESOURCES?.length) throw new Error('No resources registered');

  const balances = MockService.getWalletBalances();
  if (!balances.mock || !balances.ok) throw new Error('Mock balances failed');

  const created = MockService.createMobilePayment({
    amount: 1000,
    currency: 'TZS',
    phone_number: '255712345678',
  });
  if (!created.data?.data?.reference) {
    throw new Error('Mock create_mobile_payment missing reference');
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        tools: TOOLS.length,
        resources: RESOURCES.length,
        sample_reference: created.data.data.reference,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
