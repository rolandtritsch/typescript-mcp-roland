import { readFile } from 'node:fs/promises';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'roland',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools = [
    {
      name: 'about_roland',
      description: 'Give more information about Roland',
    },
  ];

  return { tools };
});

const serverHome = '/home/yoda/Development/Home/typescript-mcp-roland';
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'about_roland') {
    const about = await readFile(`${serverHome}/files/about.md`, 'utf-8');
    return { toolResult: about };
  }
  throw new McpError(ErrorCode.MethodNotFound, `Method/Tool not found: ${request.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
