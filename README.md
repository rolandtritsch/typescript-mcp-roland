# typescript-mcp-roland

A simple [Model Context Protocol (MCP)][mcp] server that provides information about Roland through AI assistant interfaces.

## What It Does

This MCP server exposes tools that allow AI assistants (like Claude, ChatGPT, or other MCP-enabled clients) to retrieve information about Roland. When integrated into an AI assistant, it provides a `about-roland` tool that returns biographical and professional information.

## Why This Exists

This server serves as both:

1. **A functional tool**: Provides a standardized way for AI assistants to access information about Roland
2. **A reference implementation**: Demonstrates a minimal, well-structured TypeScript MCP server that can be used as a template for similar projects

## Installation

### Prerequisites

- Node.js (version 18 or higher recommended)
- An MCP-enabled client (Claude Desktop, Windsurf, or other MCP clients)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd typescript-mcp-roland
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the server:
   ```bash
   npm run build
   ```

4. Update the `serverHome` path in `src/server.ts` (line 10) to match your installation location:
   ```typescript
   const serverHome = '/path/to/typescript-mcp-roland';
   ```

5. Rebuild after updating the path:
   ```bash
   npm run build
   ```

### Configuration

Add the server to your MCP client configuration. For most clients, add this to your MCP configuration file:

```json
{
  "mcpServers": {
    "roland": {
      "command": "node",
      "args": ["/path/to/typescript-mcp-roland/build/server.js"]
    }
  }
}
```

Replace `/path/to/typescript-mcp-roland` with your actual installation path.

For detailed configuration examples, see `server.json` and `mcp_config-template.json`.

## Usage

Once configured, your AI assistant will have access to the `about-roland` tool. You can ask questions like:

- "What can you tell me about Roland?"
- "Use the about-roland tool to learn about Roland"

The assistant will retrieve and present the information from the server.

## Project Resources

- **Implementation Details**: See [CLAUDE.md][] for architecture and implementation documentation
- **Contributing**: See [CONTRIBUTING.md][] for development workflow and how to make changes
- **MCP Protocol**: Learn more at the [Model Context Protocol repository][mcp]

[CLAUDE.md]: ./CLAUDE.md
[CONTRIBUTING.md]: ./CONTRIBUTING.md
[mcp]: https://github.com/modelcontextprotocol
