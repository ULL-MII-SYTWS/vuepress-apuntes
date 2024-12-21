# Incremental Static Regeneration (ISR)

ISR is a powerful feature that allows you to update static content without rebuilding your entire site.

## Example

Visit the routes `/blog/1` and `/blog/2`, etc. to see the Incremental Static Regeneration in action.

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

## Error during deploying at Vercel

Got the following error during deploying at Vercel:

```
A Serverless Function has exceeded the unzipped maximum size of 250 MB 
```

So I have to remove the `app` folder from the branch `guide` and deploy again. This example is in the branch `ISR`

### The result of `next build`

```
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(ISR) pnpm build

> nextra-docs-template@1.0.0 build /Users/casianorodriguezleon/campus-virtual/2425/sytws2425/practicas/nextra/nextra-casiano-rodriguez-leon-alu0100291865
> next build

   ▲ Next.js 15.0.2
   - Environments: .env.local

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
/Users/casianorodriguezleon/campus-virtual/2425/sytws2425/practicas/nextra/nextra-casiano-rodriguez-leon-alu0100291865/data
""
""
 ✓ Generating static pages (41/41)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                                          Size     First Load JS
┌ ○ /_not-found                                      900 B           101 kB
└ ● /blog/[id]                                       136 B          99.8 kB
    ├ /blog/1
    ├ /blog/2
    ├ /blog/3
    └ [+7 more paths]
+ First Load JS shared by all                        99.7 kB
  ├ chunks/3940710d-8bc0c1562b0390ff.js              52.5 kB
  ├ chunks/610-44c9479a9ebc9a86.js                   45.2 kB
  └ other shared chunks (total)                      1.94 kB

Route (pages)                                        Size     First Load JS
┌ ○ /                                                2.92 kB         167 kB
├   /_app                                            0 B             159 kB
├ ● /_meta                                           249 B           160 kB
├ ○ /404                                             1.62 kB         165 kB
├ ○ /advanced                                        1.63 kB         165 kB
├ ● /advanced/_meta                                  256 B           160 kB
├ ○ /advanced/accesing-config (330 ms)               3.18 kB         167 kB
├   └ css/3d60d0aceaeb37d9.css                       124 B
├ ○ /advanced/at-alias (330 ms)                      2.55 kB         166 kB
├ ƒ /api/auth/[...nextauth]                          0 B             159 kB
├ ƒ /api/github-repos/[username]                     0 B             159 kB
├ ƒ /api/restricted                                  0 B             159 kB
├ ● /auth/_meta                                      251 B           160 kB
├ ○ /auth/login                                      1.94 kB         166 kB
├ ○ /auth/restricted                                 2.33 kB         166 kB
├ ○ /clientComponent (330 ms)                        2.92 kB         167 kB
├ ○ /clientSideProtectedExample (332 ms)             2.3 kB          166 kB
├ ƒ /clientSideProtectedExampleDynamicPage           2.9 kB          171 kB
├ ○ /code (331 ms)                                   1.99 kB         166 kB
├ ● /context                                         1.63 kB         165 kB
├ ƒ /dynamic-mdx                                     2.34 kB         171 kB
├ ƒ /dynamic-post-building                           2.35 kB         171 kB
├ ● /dynamic-post-building-getstaticprops (8906 ms)  2.35 kB         171 kB
├ ● /FileReader                                      1.94 kB         166 kB
├ ● /get-static-props (ISR: 60 Seconds) (900 ms)     2.81 kB         167 kB
├ ● /get-static-props-readfile (385 ms)              1.92 kB         166 kB
├ ○ /intro-to-components (329 ms)                    3.14 kB         167 kB
├   └ css/a0786626dbb3c2b6.css                       103 B
├ ○ /ISR (331 ms)                                    5.3 kB          169 kB
├ ○ /live                                            87.1 kB         251 kB
├ ○ /passinginfo (330 ms)                            2.02 kB         166 kB
├ ● /posts/[id] (3355 ms)                            658 B           160 kB
├   └ css/096e8b2b15818a7e.css                       575 B
├   ├ /posts/2024-12-08-leccion (1145 ms)
├   └ /posts/2024-12-09-leccion (1144 ms)
├ ○ /protected/secret                                2.27 kB         166 kB
├ ● /readFile (400 ms)                               1.58 kB         165 kB
├ ƒ /serverSideProtectedExample                      412 B           160 kB
├ ○ /swr                                             3.33 kB         172 kB
├ ƒ /user/[username]                                 801 B           160 kB
└ ○ /userRepos                                       2.53 kB         166 kB
    └ css/42ff6ee1a7e6fab4.css                       625 B
+ First Load JS shared by all                        174 kB
  ├ chunks/framework-415c6982541a665e.js             44.8 kB
  ├ chunks/main-586ee97ea7b75755.js                  37.8 kB
  ├ chunks/pages/_app-036e4bf31b2dd712.js            75 kB
  ├ css/396771fc71f5a51c.css                         14.7 kB
  └ other shared chunks (total)                      1.73 kB

ƒ Middleware                                         57.2 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
   (ISR)      incremental static regeneration (uses revalidate in generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

The problem has to be s.t. related to the size of the `app` directory. The comment `[+7 more paths]`
seems to indicate that since we are using `https://jsonplaceholder.typicode.com/posts` may be 
there are too many routes.

```sh
Route (app)                                          Size     First Load JS
┌ ○ /_not-found                                      900 B           101 kB
└ ● /blog/[id]                                       136 B          99.8 kB
    ├ /blog/1
    ├ /blog/2
    ├ /blog/3
    └ [+7 more paths]
+ First Load JS shared by all                        99.7 kB
  ├ chunks/3940710d-8bc0c1562b0390ff.js              52.5 kB
  ├ chunks/610-44c9479a9ebc9a86.js                   45.2 kB
  └ other shared chunks (total)                      1.94 kB
```

## v0 Diagnostics

Thus, I went to v0 for [help](ISR-deployment).