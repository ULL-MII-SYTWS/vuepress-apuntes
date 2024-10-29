---
title: "Nextra monorepo"
---

# {{ $frontmatter.title }}

See and follow the instructions in the [README.md](https://github.com/gh-cli-for-education/nextra/blob/casiano/README.md) 
in the branch `casiano` at the fork of the [Nextra monorepo](https://github.com/gh-cli-for-education/nextra/tree/casiano).

The Nextra repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and
[Turborepo](https://github.com/vercel/turborepo). To install dependencies, run
`pnpm install` in the project root directory.

## Installation

Worked with node v22.2.0 but not with v23.0.0:

```
➜  nextra-theme-docs git:(casiano) ✗ node --version
v22.2.0
```

The Nextra repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and
[Turborepo](https://github.com/vercel/turborepo). To install dependencies, run
`pnpm install` in the project root directory.

## Build Nextra Core

```bash
cd packages/nextra
pnpm build
```

Watch mode: `pnpm dev`

## Build Nextra Theme

```bash
cd packages/nextra-theme-docs
pnpm build
```

## Development

### Running the package nextra in watch mode 

Set `nvm use v22`. I went to the `packages/nextra` directory and run `pnpm dev`. It uses [tsup](https://tsup.egoist.dev/) a utility to bundle TypeScript code.

### Running the package nextra-theme-docs in watch mode

I opened a new terminal; set `nvm use v22` and then went to the `packages/nextra-theme-docs` directory. 

```bash
➜  nextra git:(casiano) ✗ cd packages/nextra-theme-docs 
```

I run `pnpm dev`. 
It concurrently runs 

- `tsup --watch` and 
- `TAILWIND_MODE=watch pnpm postcss css/styles.css -o dist/style.css --watch`.

Here are the scripts in the `package.json` file:

`➜  nextra-theme-docs git:(casiano) ✗ jq '.scripts' package.json`

```json 
{
  "build": "tsup",
  "build:all": "pnpm build && pnpm build:tailwind",
  "build:tailwind": "pnpm postcss css/styles.css -o dist/style.css --verbose",
  "clean": "rimraf ./dist ./style.css",
  "dev": "concurrently \"pnpm dev:layout\" \"pnpm dev:tailwind\"",
  "dev:layout": "tsup --watch",
  "dev:tailwind": "TAILWIND_MODE=watch pnpm postcss css/styles.css -o dist/style.css --watch",
  "prepublishOnly": "pnpm build:all",
  "test": "vitest run",
  "types": "tsup --dts-only",
  "types:check": "tsc --noEmit"
}
```

The table below shows the description of some of the available scripts:

| Command           | Description              |
| ----------------- | ------------------------ |
| pnpm dev          | Watch mode               |
| pnpm dev:layout   | Watch mode (layout only) |
| pnpm dev:tailwind | Watch mode (style only)  |

### Running the example docs in watch mode

I opened a new terminal; set `nvm use v22` and then went to `examples/docs` and run:

```console
➜  docs git:(casiano) ✗ pnpm dev

> example-docs@ dev /Users/casianorodriguezleon/campus-virtual/2223/learning/nextjs-learning/nextra-learning/nextra/examples/docs
> next

⚠ Port 3000 is in use, trying 3001 instead.
⚠ Port 3001 is in use, trying 3002 instead.
⚠ Port 3002 is in use, trying 3003 instead.
  ▲ Next.js 15.0.1
  - Local:        http://localhost:3003

✓ Starting...
  automatically enabled Fast Refresh for 2 custom loaders
✓ Ready in 4.5s
```

Any changes to `example/docs` will be re-rendered instantly.

Here we have used the watch mode for both nextra and the theme in separated terminals.
Otherwise, if you update the core or theme packages, a rebuild is required. 

### Watching the propagation of the changes 

Now, go to file `packages/nextra/src/client/components/callout.tsx` and change the `TypeToEmoji` object and modify the warning emoji
for `warning` to '👀' (eye emoji).

`packages/nextra/src/client/components/callout.tsx` 

```ts
const TypeToEmoji = {
  default: '💡',
  error: '🚫',
  info: <InformationCircleIcon className="_mt-1" />,
  warning: ' 👀' // '⚠️'
}
```
Now in the file 
`/examples/docs/src/pages/themes/docs/callout.mdx` you have an example of usage of the `callout` component with the `type` attribute set to `warning`:

````md
### Warning

<Callout type="warning">This API will be deprecated soon.</Callout>

```mdx
<Callout type="warning">This API will be deprecated soon.</Callout>
```
````

When we go to the browser and refresh the page we see the eyes emoji in the warning callout:

![warning callout](/images/nextra/warning-callout.png)

## pnpm workspaces

See chapter [pnpm Workspaces](/temas/introduccion-a-javascript/pnpm/workspaces)