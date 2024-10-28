---
title: "Nextra"
sidebar: false
---

# {{ $frontmatter.title }}

## Introduction

- [First Steps with Nextra](/temas/web/nextra/first-steps)
- [MDX: Markdown for the component era](/temas/web/nextra/mdx)
- [Theme Configuration](/temas/web/nextra/theme-configuration)

## Nextra Monorepo

- [Nextra monorepo](/temas/web/nextra/nextra-monorepo)
- [pnpm workspaces](/temas/introduccion-a-javascript/pnpm/workspaces)

## Examples of Nextra Sites

- See the nextra documentation in the [nextra/docs](https://github.com/gh-cli-for-education/nextra/tree/casiano/docs) folder at branch `casiano` at the fork [gh-cli-for-education/nextra](https://github.com/gh-cli-for-education/nextra/) of the original [/shudding/nextra](https://github.com/shuding/nextra) repo. 
- See the [Folder examples](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples) at branch `casiano` at the fork [gh-cli-for-education/nextra](https://github.com/gh-cli-for-education/nextra/) containing:
  - [blog](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/blog)
  - [docs](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/docs)
  - [swr-site](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/swr-site) 
  - See my comments in the [README.md](https://github.com/gh-cli-for-education/nextra/blob/casiano/README.md#development-1) on how to serve locally those examples.
- [PL site](https://ull-pl.vercel.app/)
- [GraphQL site](https://github.com/graphql/graphql.github.io/tree/source) and its deployment [GraphQL](https://graphql.org/)
- [Nextra ShowCase](https://nextra.site/showcase): A list of open source projects powered by Nextra

### Actual SWR Site 

See also the actual SWR site:

- [vercel/swr-site](https://github.com/vercel/swr-site)

**SWR (`stale-while-revalidate`** is a cache invalidation strategy) is a React Hooks library for remote data fetching. 

To see an example of use, you can go to the PL site and have a look at the component [teams.jsx](https://github.com/crguezl/pl-nextra/blob/main/components/teams.jsx) file[^credentials]. 

[![images/nextra/swr-pl-teams.png](/images/nextra/swr-pl-teams.png)](https://ull-pl.vercel.app/user)

[^credentials]: Remember to have the credentials updated in the `.env.local` file and the Vercel environment variables of the project or it will crash.