import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { loadConfig } from './config.js';
import { formatError } from './security.js';
import { TOOLS } from './tools.js';
import { RESOURCES, getResource } from './resources.js';
import { SenjaroPayClient } from './services/senjaropay.client.js';
import { MockService } from './services/mock.service.js';
import {
  GetWalletBalancesSchema,
  ListTransactionsSchema,
  GetMobilePaymentStatusSchema,
  GetCardPaymentStatusSchema,
  CreateMobilePaymentSchema,
  CreateCardCheckoutSchema,
  InitiateHostedCheckoutSchema,
  ListBillCategoriesSchema,
  LookupBillSchema,
  PayBillSchema,
  GetBillStatusSchema,
  LookupBankAccountSchema,
  CreateCashoutTransferSchema,
  SimulateMerchantCallbackSchema,
  CreateDemoPaymentFlowSchema,
} from './schemas.js';

function textResult(payload: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2),
      },
    ],
  };
}

function assertSandboxForLiveDemo(client: SenjaroPayClient) {
  if (client.isLive && client.environment !== 'sandbox') {
    throw new Error(
      'create_demo_payment_flow in live mode requires SENJAROPAY_ENVIRONMENT=sandbox',
    );
  }
}

export class SenjaroPayMcpServer {
  private readonly server: Server;
  private readonly config = loadConfig();
  private readonly client = new SenjaroPayClient(this.config);

  constructor() {
    this.server = new Server(
      {
        name: 'senjaropay-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      },
    );

    this.registerHandlers();
  }

  private registerHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }));

    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: RESOURCES.map(({ uri, name, description, mimeType }) => ({
        uri,
        name,
        description,
        mimeType,
      })),
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const doc = getResource(request.params.uri);
      if (!doc) {
        throw new Error(`Unknown resource: ${request.params.uri}`);
      }
      return {
        contents: [
          {
            uri: doc.uri,
            mimeType: doc.mimeType,
            text: doc.text,
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const name = request.params.name;
      const args = (request.params.arguments || {}) as Record<string, unknown>;

      try {
        const result = await this.dispatch(name, args);
        return textResult(result);
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: formatError(err) }],
        };
      }
    });
  }

  private async dispatch(name: string, args: Record<string, unknown>) {
    const live = this.client.isLive;

    switch (name) {
      case 'get_wallet_balances': {
        const input = GetWalletBalancesSchema.parse(args);
        if (!live) return MockService.getWalletBalances();
        return this.client.getWalletBalances(input.api_url);
      }

      case 'list_transactions': {
        const input = ListTransactionsSchema.parse(args);
        if (!live) {
          return MockService.listTransactions({
            limit: input.limit,
            offset: input.offset,
            status: input.status,
          });
        }
        return this.client.listTransactions(
          {
            start_date: input.start_date,
            end_date: input.end_date,
            status: input.status,
            reference_id: input.reference_id,
            limit: input.limit,
            offset: input.offset,
          },
          input.api_url,
        );
      }

      case 'get_mobile_payment_status': {
        const input = GetMobilePaymentStatusSchema.parse(args);
        if (!live) return MockService.getMobilePaymentStatus(input.referenceId);
        return this.client.getMobilePaymentStatus(input.referenceId, input.api_url);
      }

      case 'get_card_payment_status': {
        const input = GetCardPaymentStatusSchema.parse(args);
        const reference =
          input.reference ||
          input.payment_id ||
          input.transid ||
          input.order_id ||
          input.orderId ||
          'UNKNOWN';
        if (!live) return MockService.getCardPaymentStatus(reference);
        return this.client.getCardPaymentStatus(
          {
            payment_id: input.payment_id,
            transid: input.transid,
            order_id: input.order_id,
            orderId: input.orderId,
            reference: input.reference,
          },
          input.api_url,
        );
      }

      case 'create_mobile_payment': {
        const input = CreateMobilePaymentSchema.parse(args);
        if (!live) {
          return MockService.createMobilePayment({
            amount: input.amount,
            currency: input.currency,
            phone_number: input.phone_number,
          });
        }
        return this.client.createMobilePayment(
          {
            payment_type: 'mobile',
            phone_number: input.phone_number,
            details: { amount: input.amount, currency: input.currency },
            customer: input.customer,
            webhook_url: input.webhook_url,
            submerchant_id: input.submerchant_id,
          },
          input.api_url,
        );
      }

      case 'create_card_checkout': {
        const input = CreateCardCheckoutSchema.parse(args);
        if (!live) {
          return MockService.createCardCheckout({
            amount: input.amount,
            currency: input.currency,
          });
        }
        return this.client.createCardCheckout(
          {
            payment_type: 'card',
            details: { amount: input.amount, currency: input.currency },
            customer: {
              email: input.email,
              phone_number: input.phone_number,
              firstname: input.firstname,
              lastname: input.lastname,
              country: input.country,
              city: input.city,
              address: input.address,
            },
            webhook_url: input.webhook_url,
            success_url: input.success_url,
            fail_url: input.fail_url,
            redirect_url: input.redirect_url,
            cancel_url: input.cancel_url,
          },
          input.api_url,
        );
      }

      case 'initiate_hosted_checkout': {
        const input = InitiateHostedCheckoutSchema.parse(args);
        if (!live) {
          return MockService.initiateHostedCheckout({
            amount: input.amount,
            currency: input.currency,
            woo_order_id: input.woo_order_id,
          });
        }
        return this.client.initiateHostedCheckout(
          {
            amount: input.amount,
            currency: input.currency,
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            phone: input.phone,
            country: input.country,
            city: input.city,
            address: input.address,
            description: input.description,
            redirect_url: input.redirect_url,
            cancel_url: input.cancel_url,
            callback_url: input.callback_url,
            source: input.source,
            woo_order_id: input.woo_order_id,
            woo_order_key: input.woo_order_key,
            woo_site_url: input.woo_site_url,
          },
          input.api_url,
        );
      }

      case 'list_bill_categories': {
        const input = ListBillCategoriesSchema.parse(args);
        if (!live) return MockService.listBillCategories();
        return this.client.listBillCategories(input.api_url);
      }

      case 'lookup_bill': {
        const input = LookupBillSchema.parse(args);
        if (!live) {
          return MockService.lookupBill({
            utilityCode: input.utilityCode,
            utilityRef: input.utilityRef,
          });
        }
        return this.client.lookupBill(
          { utilityCode: input.utilityCode, utilityRef: input.utilityRef },
          input.api_url,
        );
      }

      case 'pay_bill': {
        const input = PayBillSchema.parse(args);
        if (!live) {
          return MockService.payBill({
            amount: input.amount,
            utilityCode: input.utilityCode,
            utilityRef: input.utilityRef,
          });
        }
        return this.client.payBill(
          {
            utilityCode: input.utilityCode,
            utilityRef: input.utilityRef,
            amount: input.amount,
            wallet_id: input.wallet_id,
          },
          input.api_url,
        );
      }

      case 'get_bill_status': {
        const input = GetBillStatusSchema.parse(args);
        const reference = input.reference || input.reference_id || input.transid || '';
        if (!live) return MockService.getBillStatus(reference);
        return this.client.getBillStatus(
          {
            reference: input.reference,
            reference_id: input.reference_id,
            transid: input.transid,
          },
          input.api_url,
        );
      }

      case 'lookup_bank_account': {
        const input = LookupBankAccountSchema.parse(args);
        if (!live) {
          return MockService.lookupBankAccount({
            bank: input.bank,
            account: input.account,
          });
        }
        return this.client.lookupBankAccount(
          { bank: input.bank, account: input.account, transid: input.transid },
          input.api_url,
        );
      }

      case 'create_cashout_transfer': {
        const input = CreateCashoutTransferSchema.parse(args);
        if (!live) {
          return MockService.createCashoutTransfer({
            amount: input.amount,
            currency: input.currency,
            bank: input.bank,
            account: input.account,
          });
        }
        return this.client.createCashoutTransfer(
          {
            amount: input.amount,
            currency: input.currency,
            account: input.account,
            bank: input.bank,
            name: input.name,
            receiver_name: input.receiver_name,
            account_name: input.account_name,
          },
          input.api_url,
        );
      }

      case 'simulate_merchant_callback': {
        const input = SimulateMerchantCallbackSchema.parse(args);
        return MockService.simulateMerchantCallback({
          reference_id: input.reference_id,
          status: input.status,
          amount: input.amount,
          currency: input.currency,
        });
      }

      case 'create_demo_payment_flow': {
        const input = CreateDemoPaymentFlowSchema.parse(args);
        assertSandboxForLiveDemo(this.client);

        const trace: Array<Record<string, unknown>> = [];

        const step = async (label: string, fn: () => Promise<unknown>) => {
          const started = new Date().toISOString();
          const result = await fn();
          trace.push({
            step: label,
            at: started,
            result,
            insight:
              label === 'get_wallet_balances'
                ? 'Always check balances before creating payouts or bill payments.'
                : label === 'create_mobile_payment'
                  ? 'Persist data.reference and poll status; do not assume SUCCESS from create.'
                  : label === 'get_mobile_payment_status'
                    ? 'Handle PENDING with backoff; SUCCESS/FAIL are terminal for mobile.'
                    : 'Card create returns checkout_url — redirect the browser, then poll status.',
          });
        };

        if (!live) {
          await step('get_wallet_balances', async () => MockService.getWalletBalances());
          await step('create_mobile_payment', async () =>
            MockService.createMobilePayment({
              amount: input.amount,
              currency: input.currency,
              phone_number: input.phone_number,
            }),
          );
          const mockCreate = MockService.createMobilePayment({
            amount: input.amount,
            currency: input.currency,
            phone_number: input.phone_number,
          });
          const reference =
            (mockCreate.data as { data?: { reference?: string } })?.data?.reference ||
            'MOB_MOCK_REF';
          await step('get_mobile_payment_status', async () =>
            MockService.getMobilePaymentStatus(reference),
          );
          await step('create_card_checkout', async () =>
            MockService.createCardCheckout({
              amount: input.amount,
              currency: input.currency,
            }),
          );
        } else {
          await step('get_wallet_balances', async () =>
            this.client.getWalletBalances(input.api_url),
          );
          const created = await this.client.createMobilePayment(
            {
              payment_type: 'mobile',
              phone_number: input.phone_number,
              details: { amount: input.amount, currency: input.currency },
              customer: { email: input.email },
            },
            input.api_url,
          );
          trace.push({
            step: 'create_mobile_payment',
            at: new Date().toISOString(),
            result: created,
            insight: 'Persist data.reference and poll status; do not assume SUCCESS from create.',
          });
          const reference =
            (created.data as { data?: { reference?: string } })?.data?.reference ||
            (created.data as { reference?: string })?.reference;
          if (reference) {
            await step('get_mobile_payment_status', async () =>
              this.client.getMobilePaymentStatus(reference, input.api_url),
            );
          }
          await step('create_card_checkout', async () =>
            this.client.createCardCheckout(
              {
                payment_type: 'card',
                details: { amount: input.amount, currency: input.currency },
                customer: {
                  email: input.email,
                  phone_number: input.phone_number,
                },
              },
              input.api_url,
            ),
          );
        }

        return {
          mode: live ? 'live-sandbox' : 'mock',
          summary:
            'Chronological SenjaroPay grounding trace. Convert each step into production code using resources senjaropay://docs/* and senjaropay://examples/*.',
          trace,
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  async run(transport: Transport) {
    await this.server.connect(transport);
  }
}
