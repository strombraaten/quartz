# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Quartz v4 is a static site generator designed to publish digital gardens and notes as websites. It transforms Markdown content into a fully-featured website with features like backlinks, graph visualization, search, and more. The project is built with TypeScript and uses a plugin-based architecture.

## Common Commands

### Development
- `npx quartz build --serve` - Build and serve locally with hot-reload at http://localhost:8080
- `npx quartz build --serve --port 3000` - Serve on custom port
- `npx quartz build` - Build site to `public/` directory without serving
- `npx quartz build -d docs` - Build from custom content directory

### Testing & Quality
- `npm run test` - Run tests using tsx
- `npm run check` - Run TypeScript type-checking and Prettier format checking
- `npm run format` - Format all files with Prettier

### Other Commands
- `npx quartz create` - Initialize new Quartz site
- `npx quartz update` - Get latest Quartz updates
- `npx quartz sync` - Sync content to/from GitHub
- `npx quartz build --help` - Show all build options and flags

### Advanced Options
- `--verbose` or `-v` - Enable detailed logging during build
- `--concurrency N` - Set number of threads for parsing (default: auto-scaled 1-4 based on file count)
- `--output` or `-o` - Specify output directory (default: `public`)
- `--directory` or `-d` - Specify content directory (default: `content`)

## Architecture

### Core Concepts

**Plugin Pipeline**: Quartz uses a three-stage plugin pipeline to transform Markdown content into a static website:

1. **Transformers** (`quartz/plugins/transformers/`): Process individual files (e.g., parse frontmatter, convert Obsidian-flavored markdown, add syntax highlighting, generate TOC)
2. **Filters** (`quartz/plugins/filters/`): Determine which content to publish (e.g., remove drafts)
3. **Emitters** (`quartz/plugins/emitters/`): Generate final output files (e.g., HTML pages, RSS feed, sitemap, tag pages)

### Key Files & Directories

- `quartz.config.ts` - Main configuration file defining plugins, theme, analytics, and site-wide settings
- `quartz.layout.ts` - Layout configuration defining component placement (header, footer, sidebar, etc.)
- `content/` - Default directory for Markdown content
- `public/` - Default build output directory
- `quartz/` - Core Quartz source code
  - `quartz/bootstrap-cli.mjs` - CLI entry point
  - `quartz/build.ts` - Build orchestration and file watching
  - `quartz/processors/` - Core processing logic (parse, filter, emit)
  - `quartz/components/` - React/Preact UI components (ArticleTitle, Graph, Search, etc.)
  - `quartz/plugins/` - Plugin implementations
  - `quartz/util/` - Shared utilities

### Processing Flow

1. **Parse** (`processors/parse.ts`): Read Markdown files → Apply text transforms → Parse to MD AST → Transform MD AST → Convert to HTML AST → Transform HTML AST
2. **Filter** (`processors/filter.ts`): Apply filter plugins to determine publishable content
3. **Emit** (`processors/emit.ts`): Generate output files through emitter plugins

### Multi-threading

Quartz uses worker threads for parsing large content sets. When `concurrency > 1`, the worker script (`quartz/worker.ts`) is transpiled to `quartz-cache/transpiled-worker.mjs` and used via the `workerpool` library. Files are processed in chunks of 128.

### Component System

Components are Preact-based and defined in `quartz/components/`. Each component can have:
- TypeScript/TSX implementation
- Associated styles in `components/styles/`
- Client-side scripts in `components/scripts/`

Components are composed in `quartz.layout.ts` to define page layouts for single pages (`defaultContentPageLayout`) and list pages (`defaultListPageLayout`).

### Configuration

The site is configured through two main files:

**quartz.config.ts**:
- `configuration`: Global settings (title, theme, analytics, locale, ignore patterns)
- `plugins`: Three arrays of plugin instances (transformers, filters, emitters)

**quartz.layout.ts**:
- `sharedPageComponents`: Components used across all pages (head, header, footer, afterBody)
- `defaultContentPageLayout`: Layout for single content pages (beforeBody, left, right sidebars)
- `defaultListPageLayout`: Layout for list/index pages

## Plugin Development

When creating custom plugins:

- Transformers: Implement `QuartzTransformerPlugin` interface with optional `textTransform`, `markdownPlugins`, `htmlPlugins`, and `externalResources` methods
- Filters: Implement `QuartzFilterPlugin` with a `shouldPublish` method
- Emitters: Implement `QuartzEmitterPlugin` with an `emit` method (and optionally `partialEmit` for incremental builds)

All plugins are instantiated as functions that return plugin instances, allowing for optional configuration parameters.

## Important Notes

- The project uses ES modules (`"type": "module"` in package.json)
- TypeScript is configured with strict mode and Preact JSX (`jsxImportSource: "preact"`)
- Requires Node.js >= 22 and npm >= 10.9.2
- Uses `remark` and `rehype` for Markdown/HTML AST processing
- Tests use Node's built-in test runner (via tsx)
- File paths within Quartz use POSIX format internally
- Incremental builds are supported when using `--serve` mode via file watching with chokidar
