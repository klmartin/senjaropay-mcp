#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SenjaroPayMcpServer } from './server.js';
const server = new SenjaroPayMcpServer();
const transport = new StdioServerTransport();
server.run(transport).catch((error) => {
    console.error('Fatal error running SenjaroPay MCP Server:', error);
    process.exit(1);
});
