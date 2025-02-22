---
title: Nextra
layout: Practica
published: true
sidebar: auto
order: 14
key: nextra
prev: jekyll-search.md
next: 
campus: https://campusdoctoradoyposgrado2425.ull.es/mod/assign/view.php?id=29486
rubrica:
  -  Contiene ejemplos de Bleed, 
  -  Banner,
  -  Callout, 
  -  Cards, 
  -  Code Extensions, 
  -  Expression Evaluation, 
  -  File Trees, 
  -  frontmatter, 
  -  Heroicons, 
  -  iframe, 
  -  Markdown import, 
  -  Mermaid, 
  -  Using Components (MDX) 
  -  useState
  -  useConfig
  -  useSWR
  -  Uses external images with the Image component
  -  Uses `@` to import components
  -  Uses getStaticProps to make a fetch at build time
  -  Uses useEffect to make a fetch at runtime
  -  Has a hello world  on the server side using pages/api/hello.js
  -  Has an example of middleware
  -  Deployment in Vercel
  - "Has forked nextra and familiarized with the concept of monorepo"
  - "The code is correct and works"
  - "Well-prepared report"
  - "Kanban Board project containing the rubric issues"
  - "Has submitted the .zip on the campus with the repo"
---

# Práctica {{ $frontmatter.title }}

[Nextra](/temas/web/nextra) is a framework on top of Next.js, that lets you build content focused websites. It has all the great features from Next.js, plus extra power to create Markdown-based content with ease.

## Introducción

Cree un web site con nextra siguiendo los tutoriales en la sección [Nextra](/temas/web/nextra/) de estos apuntes.

## MDX

Véase el tutorial en la sección [MDX](/temas/web/nextra/mdx) de estos apuntes.

## Theme Configuration

Véase el tutorial en la sección [Theme Configuration](/temas/web/nextra/theme-configuration) de estos apuntes.

## Introducción a los monorepos


See [Introducción a los monorepos con Nextra monorepo](/temas/web/nextra/nextra-monorepo).

You can fork my own fork of nextra and start from  branch `casiano`  https://github.com/gh-cli-for-education/nextra/tree/casiano
or the original at https://github.com/shuding/nextra.

Getting to master building a monorepo is complicated, I just ask that you take a look, get familiar with the tools used in this case and give some proof that you tried to fulfill this requirement *"Has forked nextra and familiarized with the concept of monorepo"*.
The fork with some commit on a branch with your `name` is enough. Remember to put the link to the fork in the README.md file of the assignment.

See also [pnpm workspaces](/temas/introduccion-a-javascript/pnpm/workspaces)

## Examples of Nextra Sites

Véase la sección [Examples of Nextra Sites](/temas/web/nextra/nextra-examples) de estos apuntes.


## Tareas

Deberá leer e incluir en su repo ejemplos como se describen en las secciones 
- Bleed, 
- Callout, 
- Cards, 
- Code Extensions, 
- Expression Evaluation, 
- File Trees, 
- frontmatter, 
- Heroicons, 
- iframe,
- Markdown import, 
- Mermaid y 
- Using Components  (MDX)
- useConfig

Puede apoyarse en el capítulo <a href="https://ull-pl.vercel.app/nextra-playground" target="_blank">Learning and Playing with Nextra</a>
de los apuntes de PL.

## Despliegues

Haga un despliegue en Vercel (haga un fork del repo a su cuenta si es necesario).

<Rubrica :items="$frontmatter.rubrica" />

