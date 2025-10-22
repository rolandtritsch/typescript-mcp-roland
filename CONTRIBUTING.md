# Contributing to typescript-mcp-roland

This document explains how to make changes to this project and the development workflow for contributors and committers.

For information about the project's architecture and implementation, see [CLAUDE.md][].

For information about what this project does and how to install it, see [README.md][].

## Roles

- **Contributors**: Submit pull requests with proposed changes
- **Committers**: Review, merge pull requests, and publish new versions when required

## Development Workflow

### 1. Clone the Repository

```bash
git clone <repository-url>
cd typescript-mcp-roland
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

Branch naming format: `roland/<ticket-id>/<3-word-description>`

If there's no ticket ID, use `ad-hoc` instead:

```bash
# With ticket ID
git checkout -b roland/ISSUE-123/add-new-tool

# Without ticket ID (ad-hoc changes)
git checkout -b roland/ad-hoc/fix-typo-readme
```

### 4. Make Changes

#### Building

Compile TypeScript after making changes:

```bash
npm run build
```

This compiles `src/**/*.ts` to `build/` and makes the output executable.

#### Testing

Test the server interactively using the MCP Inspector:

```bash
npm run inspector
```

The inspector provides an interactive interface to:
- Verify tools are registered correctly
- Test tool invocations
- Inspect request/response payloads
- Debug server behavior

#### Code Quality Requirements

Before submitting changes:

1. **All tests must pass**: Use `npm run inspector` to verify the server works correctly
2. **Code coverage**: Aim for 80% code coverage (when applicable)
3. **Build must succeed**: `npm run build` must complete without errors
4. **TypeScript strict mode**: All code must compile with strict type checking enabled

#### Commit Conventions

Commit as often as makes sense. Each commit should represent a logical unit of work.

```bash
git add <files>
git commit -m "Clear description of what changed"
```

### 5. Create a Pull Request

Create the PR using the `gh` CLI tool:

```bash
# Push your branch
git push -u origin roland/<ticket-id>/<3-word-description>

# Create the PR
gh pr create --title "<ticket-id>: <3-word-description>" --body ""
```

**PR Title Format**: `<ticket-id>: <3-word-description>`

Examples:
- `ISSUE-123: Add new tool`
- `ad-hoc: Fix typo README`

**PR Body**: Leave empty (GitHub will show the commits)

### 6. Push Changes

After making commits, push to the remote branch:

```bash
git push
```

Verify that GitHub workflows succeed. Check the Actions tab in the repository.

### 7. Merge and Cleanup (Committers Only)

Once the PR is approved:

1. **Squash merge** the PR using `gh`:
   ```bash
   gh pr merge <pr-number> --squash --delete-branch
   ```

2. The branch will be automatically deleted on the remote

3. Update your local repository:
   ```bash
   git checkout trunk
   git pull
   git branch -d roland/<ticket-id>/<3-word-description>
   ```

## Common Development Tasks

### Adding a New Tool

See [CLAUDE.md][] section "Adding New Tools" for implementation details.

Summary:
1. Add a markdown file to `files/` directory
2. Register the tool in `src/server.ts` using `server.tool()`
3. Build and test with the inspector
4. Follow the workflow above to submit changes

### Updating Dependencies

```bash
npm update
npm run build
npm run inspector  # Verify everything still works
```

### Publishing a New Version (Committers Only)

1. Update version in `package.json`
2. Update version in `src/server.ts` (McpServer configuration)
3. Create a commit: `git commit -m "Bump version to X.Y.Z"`
4. Create a tag: `git tag vX.Y.Z`
5. Push: `git push && git push --tags`

## File Size Guidelines

- **Source files**: Maximum 400 lines of code
- **Test files**: Maximum 800 lines of code

If a file exceeds these limits, refactor it into smaller, focused modules.

## Tools Used

- **Git**: Version control (`git` CLI)
- **GitHub CLI**: Pull request management (`gh` CLI)
- **npm**: Package management and build scripts
- **TypeScript**: Language and compiler
- **MCP Inspector**: Interactive testing tool for MCP servers

## Getting Help

If you encounter issues or have questions:

1. Check [CLAUDE.md][] for implementation details
2. Check [README.md][] for installation and usage information
3. Review existing issues in the GitHub repository
4. Open a new issue if your question hasn't been addressed

[CLAUDE.md]: ./CLAUDE.md
[README.md]: ./README.md
