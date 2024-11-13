---
sidebar: auto
---
# Can I make server side programming in Nextra?

Yes, you can perform server-side programming in Nextra, since it’s built on top of Next.js. This means Nextra inherits all of Next.js’s core features, including **server-side rendering (SSR)**, **API routes**, and **server-side data fetching** methods (like `getServerSideProps`).

However, there are some considerations to keep in mind:

### How Server-Side Programming Works in Nextra
1. **API Routes**: You can define API routes in a Nextra project just like in a regular Next.js project. Place your API files inside the `pages/api` directory to create serverless functions or API endpoints. These endpoints can handle server-side logic, database operations, authentication, and more.

2. **Server-Side Rendering (SSR)**: Nextra supports SSR via `getServerSideProps` in custom pages. However, since Nextra is generally used for static documentation sites or blogs, SSR might be less common, as static generation is usually preferred for speed and simplicity. Still, for pages that require dynamic data fetching on the server, you can add `getServerSideProps` to retrieve data at request time.

3. **Data Fetching with Static Site Generation (SSG)**: Since Nextra is optimized for static content, most Nextra sites use **SSG** with `getStaticProps`, where data is fetched at build time. This can be useful for loading content or configuration data that doesn’t change often. But if you need fresh data on each request, SSR can be implemented as well.

### Example of Adding Server-Side Logic to a Nextra Page
Suppose you want to fetch some data dynamically on a page within a Nextra site:

```javascript
// pages/example.jsx

export async function getServerSideProps(context) {
  // Fetch data from an external API or perform other server-side logic
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function ExamplePage({ data }) {
  return (
    <div>
      <h1>Dynamic Data</h1>
      <p>{data.someValue}</p>
    </div>
  );
}
```

### Limitations
While Nextra allows for server-side programming, it’s optimized for static content. As a result:
- Using too much server-side logic might go against Nextra’s goal of providing fast, statically generated content.
- Some out-of-the-box features like Nextra’s Markdown-powered documentation setup might not benefit from SSR, as they are intended to be pre-rendered at build time.

### When to Use Server-Side Programming in Nextra
- **Authenticated content**: For example, to check user authentication status and render content conditionally.
- **Dynamic content**: When data needs to be fetched fresh on each request (e.g., real-time data, personalized content).
- **APIs**: To create backend functionality without needing a separate server.

In general, Nextra’s server-side capabilities make it more flexible, but it’s best suited for projects where most pages remain static.