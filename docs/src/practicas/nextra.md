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
  -  Using Components (MDX) y 
  -  useConfig
  - "Código de la práctica correcto y funciona"
  - "Informe bien elaborado"
  - "Kanban Board project conteniendo las incidencias de la rúbrica"
  - "Ha entregado el .zip en el campus con el repo"
---

# Práctica {{ $frontmatter.title }}

[Nextra](/temas/web/nextra) is a framework on top of Next.js, that lets you build content focused websites. It has all the great features from Next.js, plus extra power to create Markdown-based content with ease.

Cree un web site con nextra siguiendo el tutorial en 

- <a href="https://nextra.site/docs" target="_blank">nextra.site</a>. 
  
## First Steps

Véase el tutorial en la sección [First Steps](/temas/web/nextra/first-steps) de estos apuntes.

## MDX

Véase el tutorial en la sección [MDX](/temas/web/nextra/mdx) de estos apuntes.

## Theme Configuration

Véase el tutorial en la sección [Theme Configuration](/temas/web/nextra/theme-configuration) de estos apuntes.

## Tutorial en PL

Un  tutorial del profesor está en:

- <a href="https://ull-pl.vercel.app/nextra-playground" target="_blank">Learning and Playing with Nextra</a>.

::: warning
Mis apuntes de PL han sido hechos con la versión 2.13 de nextra. La versión a 2024-10 de nextra es la 3.1.

En los apuntes de PL (2024-10): 

```
➜  pl2324-apuntes git:(main) ✗ npm ls nextra
pl-nextra@0.0.2 /Users/casianorodriguezleon/campus-virtual/2324/pl2324/pl2324-apuntes
├─┬ nextra-theme-docs@2.13.2
│ └── nextra@2.13.2 deduped
└── nextra@2.13.2
```

En su tarea será algo así:

```
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(main) ✗ npm ls nextra
nextra-docs-template@1.0.0 /Users/casianorodriguezleon/campus-virtual/2425/sytws2425/practicas/nextra/nextra-casiano-rodriguez-leon-alu0100291865
├─┬ nextra-theme-docs@3.1.0
│ └── nextra@3.1.0 deduped
└── nextra@3.1.0
```
:::

Véase el blog de Dimitri Postolov [Nextra 3 – Your Favourite MDX Framework, Now on 🧪 Steroids](https://the-guild.dev/blog/nextra-3) for a list of the changes.


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

que se describen en el capítulo <a href="https://ull-pl.vercel.app/nextra-playground" target="_blank">Learning and Playing with Nextra</a>
de los apuntes de PL del profesor.

## Despliegues

Haga un despliegue en Vercel (haga un fork del repo a su cuenta si es necesario).

<Rubrica :items="$frontmatter.rubrica" />

