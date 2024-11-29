---
sidebar: auto
---
# Can I make server side programming in Nextra?

Yes, you can perform server-side programming in Nextra, since it’s built on top of Next.js. This means Nextra inherits all of Next.js’s core features, including **server-side rendering (SSR)**, **API routes**, and **server-side data fetching** methods (like `getServerSideProps`).

However, there are some considerations to keep in mind:

## How Server-Side Programming Works in Nextra

1. **API Routes**: You can define API routes in a Nextra project just like in a regular Next.js project. Place your API files inside the `pages/api` directory to create serverless functions or API endpoints. These endpoints can handle server-side logic, database operations, authentication, and more.

2. **Server-Side Rendering (SSR)**: Nextra supports SSR via `getServerSideProps` in custom pages. However, since Nextra is generally used for static documentation sites or blogs, SSR might be less common, as static generation is usually preferred for speed and simplicity. Still, for pages that require dynamic data fetching on the server, you can add `getServerSideProps` to retrieve data at request time.

3. **Data Fetching with Static Site Generation (SSG)**: Since Nextra is optimized for static content, we can use **SSG** with `getStaticProps`, where data is fetched at build time. See the example at [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/pages/get-static-props.mdx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/pages/get-static-props.mdx) at branch `all-repos`. This can be useful for loading content or configuration data that doesn’t change often. But if you need fresh data on each request, SSR can be implemented as well.

## Adding Server-Side Logic to a Nextra Page

Example: suppose you want to fetch **all** the GitHub public repos of a user and show them dynamically on a Nextra page.


You can find a solution at branch `allrepos` of repo [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/tree/allrepos). Here are the involved files:

```
├── components
│   └── ask-user.jsx
├── pages
│   ├── api
│   │   └── github-repos
│   │       └── [username].js
│   ├── user
│   │   └── [username].jsx
│   └── userRepos.mdx
└── theme.config.jsx
```


- The code at [pages/userRepos.mdx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/edit/allrepos/pages/userRepos.mdx)
- The `ask-user.jsx` component code at file [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/components/ask-user.jsx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/components/ask-user.jsx)
- The dynamic page file [pages/user/\[username\].jsx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/pages/user/%5Busername%5D.jsx) at branch `allrepos`:
- The server code at file [pages/api/github-repos/\[username\].js](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/pages/api/github-repos/%5Busername%5D.js)
  - See the GitHub Docs chapter [Using pagination in the REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers)

## Limitations
While Nextra allows for server-side programming, it’s optimized for static content. As a result:
- Using too much server-side logic might go against Nextra’s goal of providing fast, statically generated content.
- Some out-of-the-box features like Nextra’s Markdown-powered documentation setup might not benefit from SSR, as they are intended to be pre-rendered at build time.

## When to Use Server-Side Programming in Nextra
- **Authenticated content**: For example, to check user authentication status and render content conditionally.
- **Dynamic content**: When data needs to be fetched fresh on each request (e.g., real-time data, personalized content).
- **APIs**: To create backend functionality without needing a separate server.

In general, Nextra’s server-side capabilities make it more flexible, but it’s best suited for projects where most pages remain static.