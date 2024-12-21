---
title: "Nextra monorepo"
---

# {{ $frontmatter.title }}

## Introduction to Monorepos. Nextra as an example


::: tip 📚 Monorepo Definition 
A **monorepo** is a single repository containing multiple distinct projects , with well-defined relationships between them.
One of the main reasons for using a monorepo is to have a single source of truth for all projects. This means that all projects can be kept in sync and changes can be made across all projects in a single commit. 
When working in JavaScript and Node.js projects, monorepos are often used to manage multiple packages that are published to npm.
This is the case of Nextra.

<youtube id="2QSBXhuqSlI?si=0EDpbna1EWyRebtk"></youtube>

You can see that is a monorepo for the presence of a `packages` directory in the root of the project containing three npm related packages:
::: 

```bash
➜  nextra git:(casiano) ✗ tree -L 1 packages
packages
├── nextra
├── nextra-theme-blog
└── nextra-theme-docs
```

Also you can see in the Nextra `package.json` that the project depends on the npm module [changesets](https://github.com/changesets/changesets/tree/main#readme), which is also a monorepo!. 

::: tip 📚 Changesets
**Changesets** is a concept that hold two bits of information: 
1. A version type (following [semver](https://semver.org/)), and 
2. Change information to be added to a changelog. 
   
In a monorepo context, changesets will handle bumping dependencies of changed packages.
::: 


There is a configuration file `.changeset/config.json ` that specifies the packages that are part of the monorepo:

```js
➜  nextra git:(casiano) ✗ cat .changeset/config.json 
{
  "$schema": "https://unpkg.com/@changesets/config@2.0.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [["nextra", "nextra-theme-docs", "nextra-theme-blog"]],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "onlyUpdatePeerDependentsWhenOutOfRange": true
  },
  "ignore": ["example-blog", "example-docs", "swr-site", "docs"]
}
```

The overall changeset cycle after initialization should lead is a loop that looks like:

1. Changesets added along with each change
2. The `version` command is run when a release is ready, and the changes are verified
3. The `publish` command is run afterwards.

See the changesets [glossary](https://github.com/changesets/changesets/blob/main/docs/dictionary.md).

Watch the video below **Version Your Packages with Changesets**:

<youtube id="vO80X5zM8_Y?si=Xr6EHWA9yEi7xcwh"></youtube>

Try to reproduce the steps in the video in the Nextra monorepo.

## Workspace Dependencies in the  `package.json`  

If you look at the `package.json`  of nextra, you find this line:

```json
   ...
 "devDependencies": {
    "@tailwindcss/nesting": "^0.0.0-insiders.565cd3e",
     ...
    "nextra": "workspace:*",
    ...
    "vitest": "^2.0.3"
  },
 ...
}
```

The `"workspace:*"` syntax in the `package.json` file is related to workspace management in monorepos. Let me explain its meaning and significance:

1. **Workspace Protocol**:
The `workspace:` prefix is known as the "workspace protocol" . It's used in monorepo setups to reference other packages within the same repository.
1. **Version Specifier**:
The `*` after `workspace:` is a version specifier. In this case, it means "use the version of the package that exists in the current workspace" .
1. **Local Package Reference**:
`"nextra": "workspace:*"` indicates that this package depends on another package named "`nextra`" that exists within the same monorepo workspace .It will use whatever version of `nextra` is currently in the workspace, making it easier to develop and test changes across multiple packages simultaneously.
1. **Flexible Versioning**:
Using `workspace:*` allows for more flexible versioning within a monorepo. It ensures that the package always uses the latest version of the dependency from the workspace, rather than a specific pinned version .
1. **Build Tools Integration**:
This syntax is supported by modern JavaScript package managers like Yarn (v2+) and pnpm, which are designed to work efficiently with monorepos .
1. **Development Workflow**:
It's particularly useful during development in a monorepo, as it allows you to work on multiple packages simultaneously without needing to manually update version numbers or publish packages to test changes.

## pnpm Workspaces and Nx

<youtube id="PwfR77oe1E8?si=xaMoRgQ6oupsNk9c"></youtube>


## Instructions 

See and follow the instructions in the [README.md](https://github.com/gh-cli-for-education/nextra/blob/casiano/README.md) 
in the branch `casiano` at the fork of the [Nextra monorepo](https://github.com/shuding/nextra). 
The teacher's fork is at [gh-cli-for-education/nextra/tree/casiano](https://github.com/gh-cli-for-education/nextra/tree/casiano).

Make your own fork of the teacher's fork in your personal GitHub account.


## Installation. Turborepo and PNPM Workspaces

The Nextra repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and
[Turborepo](https://github.com/vercel/turborepo). To install dependencies, run
`pnpm install` in the project root directory.

For me, the installation worked with node v22.2.0 but not with v23.0.0:

```
➜  nextra-theme-docs git:(casiano) ✗ node --version
v22.2.0
```


### Turborepo

Turborepo uses [remote cache stores](https://turbo.build/repo/docs/core-concepts/remote-caching) via providers like [Vercel](https://turbo.build/repo/docs/core-concepts/remote-caching#vercel) to cache the result of tasks like `npm run build`, so that CI tasks avoid to do the same work twice. Other tasks are test, lint...
It parallelizes work across all available cores.
It uses the `package.json` scripts, the dependencies you've already declared, and a single `turbo.json` file. 


`➜  nextra git:(casiano) ✗ cat turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": [
        // Run `build` in workspaces I depend on first
        "^build"
      ],
      "outputs": ["dist/**", ".next/**"]
    },
    "build:tailwind": {
      "dependsOn": [],
      "outputs": ["style.css"]
    },
    "test": {
      "outputs": ["dist/**"]
    },
    "types:check": {
      "dependsOn": [
        // Run `build` in workspaces I depend on first
        "^build"
      ],
      "outputs": ["dist/**", ".next/**"]
    },
    "clean": {
      "cache": false
    },
    "dev": {
      "dependsOn": [
        // Run `build` in workspaces I depend on first
        "^build"
      ],
      "cache": false
    }
  }
}
```

### pnpm Workspaces

[pnpm has built-in support for monorepositories](https://pnpm.io/workspaces). You can create a workspace to unite multiple projects inside a single repository. A workspace must have a `pnpm-workspace.yaml` file in its root. A workspace also may have an .npmrc in its root.

```yml
➜  nextra git:(casiano) ✗ cat pnpm-workspace.yaml 
packages:
  - packages/*
  - examples/*
  - docs
```

```bash 
➜  nextra git:(casiano) ✗ cat .npmrc 
strict-peer-dependencies=false
shell-emulator=true
```
### Installation

To install dependencies, run
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

When we go to the browser to somehting like `http://localhost:3002/themes/docs/callout` and refresh the page we see the eyes emoji in the warning callout:

![warning callout](/images/nextra/warning-callout.png)

## pnpm workspaces

See chapter [pnpm Workspaces](/temas/introduccion-a-javascript/pnpm/workspaces)