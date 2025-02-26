# typescript-mcp-roland

A very simple MCP server to explain who Roland is.

The server is just reading the `about.md` in `files/`.

To make this work, you need to ...

- clone the repository
- edit the `server.ts` and `server.json`to make sure `serverHome` is set to the correct path
- run `npm install` to install the dependencies
- run `npm run build` to build the TypeScript code
- configure Windsurf (or any other MCP enabled client) with the snippet in the `server.json` file
