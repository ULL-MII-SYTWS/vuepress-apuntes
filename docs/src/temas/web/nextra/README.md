---
title: "Nextra"
sidebar: false
---

# {{ $frontmatter.title }}

## Introduction

- [First Steps with Nextra](/temas/web/nextra/first-steps)
- [MDX: Markdown for the component era](/temas/web/nextra/mdx)
- [Theme Configuration](/temas/web/nextra/theme-configuration)
- [SWR: Stale While Revalidate](/temas/web/nextra/swr)
- [Server Side Nextra](/temas/web/nextra/server-side-nextra) 
- [Next.js middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware) (Check in the docs you are using Pages.router and using stable version 15)

A **monorepo** is a single repository containing multiple distinct projects , with well-defined relationships between them.
One of the main reasons for using a monorepo is to have a single source of truth for all projects. This means that all projects can be kept in sync and changes can be made across all projects in a single commit. 
When working in JavaScript and Node.js projects, monorepos are often used to manage multiple packages that are published to npm.
This is the case of Nextra.

You can see that is a monorepo for the presence of a `packages` directory in the root of the project containing three npm related packages:

```bash
➜  nextra git:(casiano) ✗ tree -L 1 packages
packages
├── nextra
├── nextra-theme-blog
└── nextra-theme-docs
```

Also you can see in the `package.json` that the project depends on [changesets](https://github.com/changesets/changesets/tree/main#readme) 
(which is also a monorepo!). **Changesets** is a concept that hold two bits of information: a version type (following [semver](https://semver.org/)), and change information to be added to a changelog. In a monorepo context, changesets will handle bumping dependencies of changed packages.

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

See the [dictionary](https://github.com/changesets/changesets/blob/main/docs/dictionary.md).

<youtube id="https://youtu.be/puQYAhpfpkA?si=iejoe08NgL14WMIX"></youtube>

## Nextra Monorepo


- [Nextra monorepo](/temas/web/nextra/nextra-monorepo)
- [pnpm workspaces](/temas/introduccion-a-javascript/pnpm/workspaces)

## Introduction to React 

See the section [Introduction to React](/react/intro).

## Examples of Nextra Sites

See section [Examples of Nextra Sites](/temas/web/nextra/nextra-examples).

[^credentials]: Remember to have the credentials updated in the `.env.local` file and the Vercel environment variables of the project or it will crash.