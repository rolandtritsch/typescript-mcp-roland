# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Implementation Overview

This is a TypeScript-based [Model Context Protocol (MCP)][mcp] server that provides information about Roland through a simple tool interface. The server reads content from markdown files and exposes it through MCP tools.

For user-facing documentation about what this project does and how to install it, see [README.md][].

For information about the development workflow and how to contribute changes, see [CONTRIBUTING.md][].

## Architecture

### Server Implementation (`src/server.ts`)

The server uses the MCP SDK's `McpServer` class with a `StdioServerTransport` for communication. Key architectural points:

- **Server Configuration**: The `serverHome` constant (line 10) must be updated to match the absolute path where the repository is cloned. This is critical for the server to locate data files.
- **Tool Registration**: Tools are registered using the `server.tool()` method. Currently implements one tool: `about-roland`.
- **Data Source**: Content is read from markdown files in the `files/` directory.
- **Error Handling**: Main process has error catching with process exit on fatal errors.

### Configuration Files

The server requires configuration in the MCP client. Two configuration file templates are provided:

- `server.json`: Generic template with `<serverHome>` placeholder
- `mcp_config-template.json`: Specific example configuration (contains hardcoded paths that need updating)

**Important**: When deploying, the `<serverHome>` placeholder or hardcoded path must be replaced with the actual repository location.

### TypeScript Configuration

- **Target**: ES2022
- **Module System**: Node16 (ESM)
- **Output Directory**: `build/`
- **Source Directory**: `src/`

The project uses ES modules (`"type": "module"` in package.json) with the `.js` extension for imports.

## Making Changes

### Adding New Tools

To add a new tool that serves content from a file:

1. Add a markdown file to `files/` directory
2. Register the tool in `src/server.ts` using `server.tool(name, description, handler)`
3. In the handler, use `readFile()` to load content and return it as text

Example:
```typescript
server.tool('tool-name', 'Description', async () => {
  const content = await readFile(`${serverHome}/files/file.md`, 'utf-8');
  return { content: [{ type: 'text', text: content }] };
});
```

### Path Management

The `serverHome` variable is hardcoded in `src/server.ts:10`. When cloning to a new location, this must be updated. Consider this when making changes that reference file paths.

### SDK Version

Currently using `@modelcontextprotocol/sdk` version 1.7.0. The SDK uses a newer API style with direct method registration (not the legacy `setRequestHandler` pattern).

## Why These Implementation Choices

### Hardcoded `serverHome` Path

The `serverHome` constant is hardcoded rather than using relative paths or environment variables because:

1. **MCP Server Constraint**: MCP servers run in isolated contexts where the working directory may not be the repository root
2. **Simplicity**: For a reference implementation, explicit paths make the data flow clearer
3. **Trade-off**: This requires manual configuration but eliminates runtime path resolution complexity

### Single-File Server

The entire server implementation fits in one file (`src/server.ts`) because:

1. **Template Purpose**: This is intentionally minimal to serve as a starting point for other MCP servers
2. **Clarity**: All logic is visible in one place, making it easy to understand the complete flow
3. **Scope**: The server only implements one tool, so additional abstraction would add unnecessary complexity

### Markdown Data Files

Content is stored in markdown files in `files/` rather than being embedded in code because:

1. **Separation of Concerns**: Content is data, not code, and should be editable without rebuilding
2. **Extensibility**: New tools can be added by adding new markdown files without changing the core structure
3. **Readability**: Markdown is human-readable and can include formatting that's preserved when served

### ES Modules

The project uses ES modules (`"type": "module"`) with Node16 module resolution because:

1. **SDK Compatibility**: The MCP SDK is distributed as ES modules
2. **Modern Standard**: ES modules are the current JavaScript standard
3. **TypeScript Alignment**: The TypeScript configuration targets ES2022, which has native ESM support

[CONTRIBUTING.md]: ./CONTRIBUTING.md
[mcp]: https://github.com/modelcontextprotocol
[README.md]: ./README.md
