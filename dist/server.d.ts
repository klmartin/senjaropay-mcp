import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
export declare class SenjaroPayMcpServer {
    private readonly server;
    private readonly config;
    private readonly client;
    constructor();
    private registerHandlers;
    private dispatch;
    run(transport: Transport): Promise<void>;
}
