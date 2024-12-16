# The app directory vs. the pages directory

The key differences between the `app` directory (which uses the App Router) and the `pages` directory 
(which uses the Pages Router) in Next.js. are:

:::tip Key differences

## Routing

1. In the `pages` directory, routing is based on file names (e.g., `pages/about.js` creates a `/about` route) .
2. The `app` directory uses **folder-based routing**. Each folder represents a route segment, 
and you create a `page.js` file inside the folder to make it publicly accessible .

## File Structure

1. The `app` directory introduces new special files like `layout.js`, `loading.js`, and `error.js` that apply to specific route segments .
2. For example, [app/blog/layout.js](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/app/layout.js) 
would apply to all routes under `/blog`.

## Layouts

1. In the `pages` directory, you'd use a custom `_app.js` file for global layouts.
2. The `app` directory uses `layout.js` files, which can be nested and composed, providing more flexible layouts per route segment .

## Data Fetching

1. The `pages` directory uses `getStaticProps`, `getServerSideProps`, and `getStaticPaths` for data fetching.
2. In the `app` directory, these are replaced with a new model where you can use `async/await` directly in your components 
and a new `generateStaticParams` function for static path generation.

## Server Components

1. By default, components in the `app` directory are React Server Components, which render on the server, 
reducing the amount of JavaScript sent to the client .
2. You can opt into client-side rendering by adding `'use client'` at the top of a file.

## Metadata and SEO

1. In the `pages` directory, you'd typically use `next/head` for metadata.
2. The `app` directory introduces a new Metadata API, allowing you to define
metadata directly in your components or in a `layout.js` file .

## Loading UI:

The `app` directory introduces a new `loading.js` file for creating loading UI 
with [Suspense](https://react.dev/reference/react/Suspense) .

## Error Handling:

Instead of a global `_error.js` page, the `app` directory allows you to create `error.js` f
iles for more granular error handling.

## Route Handlers:

API routes in the `pages` directory (`pages/api/*`) are replaced with `route.js` 
files in the `app` directory, offering more flexibility .

## Colocating Files

The `app` directory allows you to colocate your components, styles, tests, and other related files next to your routes.
This means we can organize related files together within the same directory structure, close to where they are used.

## Parallel Routes and Intercepting Routes:

These are new advanced routing features available only in the `app` directory .

## Incremental Adoption

The `app` directory and App Router represent a significant evolution in Next.js, 
offering more powerful and flexible ways to build your application. 
They're designed to work alongside the `pages` directory, allowing for incremental adoption .
:::