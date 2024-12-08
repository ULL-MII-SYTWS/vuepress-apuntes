---
title: NextAuth.js
layout: Practica
published: true
sidebar: auto
order: 15
key: nextra
prev: nextra.md
next: 
campus: https://campusdoctoradoyposgrado2425.ull.es/mod/assign/view.php?id=32998&forceview=1
rubrica:
  - Provides authentication to the Nextra Site with NextAuth.js
  - Middleware protected pages
  - Protected a Dynamic mdx page at Client Side Rendering Time
  - Gives examples of useRef
  - Add an example of `serverSideProps`  fetching data 
  - Add an example of pagination 
  - Add an example of a "dynamic" mdx page
  -  Deployment in Vercel
  - "Has forked nextra and familiarized with the concept of monorepo"
  - "The code is correct and works"
  - "Well-prepared report"
  - "Kanban Board project containing the rubric issues"
  - "Has submitted the .zip on the campus with the repo"
---

# Práctica {{ $frontmatter.title }}

## Introducción

This lab will be delivered in the same repo associated with the [Nextra](/practices/nextra) lab. Create a branch `nextra` to point to the delivery point of the previous lab and be sure to push that branch to the remote of the assignment. Deliver this task in the `main` branch.

The task is to add authentication to the Nextra Site using NextAuth.js.

- See the tutorial at section
[Reading "Getting Started with NextAuth.js"](https://ull-mii-sytws.github.io/next-auth-getting-started/)
- See also the tutorial [Auth.js tutorial for Nextra and Next.js with GitHub](https://ull-pl.vercel.app/nextra-playground/authorization/next-auth-tutorial) at my PL notes (Nextra v2)

## Other requirements

These sections can be useful for the extra requirements:

- See section [useRef explained](/react/useref)
- See section [getServerSideProps](/temas/web/nextra/server-side-nextra.html)
- See the GitHub Docs chapter [Using pagination in the REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers)
- See the section [Building Dynamic mdx with Nextra](/temas/web/nextra/dynamicmdx.html)

<Rubrica :items="$frontmatter.rubrica" />

