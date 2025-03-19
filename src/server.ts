import { readFile } from 'node:fs/promises';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'roland',
  version: '0.2.0',
});

const serverHome = '/home/yoda/Development/Home/typescript-mcp-roland';
server.tool('about-roland', 'Give more information about Roland', async () => {
  const about = await readFile(`${serverHome}/files/about.md`, 'utf-8');
  return { content: [{ type: 'text', text: about }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
