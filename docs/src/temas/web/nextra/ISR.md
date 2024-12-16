# Incremental Static REgeneration (ISR)

ISR is a powerful feature that allows you to update static content without rebuilding your entire site.

## Example

Visit the routes [/blog/1](https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/blog/1) and [/blog/2](https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/blog/2), etc. to see the Incremental Static Regeneration in action.

These routes are handled by the code at `/app/blog/[id]/page.js`. Nextra uses the `pages` directory for routing but you 
can also use the `app` directory. 

## The tree structure at /app

```
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) ✗ tree app
app
├── blog
│   └── [id]
│       └── page.js
├── globals.css
└── layout.js
```

This is also an example of how in Nextra you can still use the `app` directory to add custom code to your project.

## /app/blog/[id]/page.js

Here is the code at `/app/blog/[id]/page.js`:

```js 
// This sets up ISR with a revalidation period of 60 seconds
export const revalidate = 60;

// We'll prerender only these paths at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    res.json()
  );
  // Let's limit to first 10 posts for this example
  return posts.slice(0, 10).map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({ params }) {
  // The key change here is that we now await the `params` object and destructure the `id` before using it in the fetch URL. 
  // This is required because in Next.js 15, the `params` object is now a Promise that needs to be resolved before accessing its properties
  const { id } = await params;
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (res) => res.json()
  );
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.body}</p>
      <a href="/">Back to Home</a>
    </main>
  );
}
```

1. The `revalidate = 60` line sets up ISR with a revalidation period of 60 seconds. 
This means that after a page has been generated, it will be cached and served for 60 seconds before Next.js attempts to regenerate it .
2. The `generateStaticParams` function is used to generate the static paths at build time. 
In this case, it fetches all posts and creates paths for each of them.
3. `dynamicParams = true` allows Next.js to generate new pages on-demand if a request comes in for a path 
that wasn't generated at build time .
4. The `Page` component fetches and displays the data for a specific blog post based on the `id` parameter .


Here's how ISR works with this setup :

- During `next build`, all known blog posts are generated as static pages.
- When a request is made to a generated page (e.g., `/blog/1`), it's served instantly from the cache.
- After the 60-second revalidation period, the next request will still show the cached (potentially stale) page.
- In the background, Next.js triggers a regeneration of the page.
- Once the page has been successfully regenerated, Next.js will invalidate the cache and start serving the updated page.
- If a request comes in for a page that wasn't generated at build time (e.g., `/blog/100`), Next.js will render the page on-demand and then cache it for subsequent requests.


This approach allows you to have the benefits of static generation 
(fast page loads, reduced server load) while still keeping your content up-to-date .

## The app directory vs. the pages directory

See [The app directory vs. the pages directory](/temas/web/nextjs/page-vs-app)