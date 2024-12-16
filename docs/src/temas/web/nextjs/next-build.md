
# Building the site

When you build the site, Next.js will show the paths, the information on its rendering, size and the first load JS.


## Codes

The codes are:

```console
ƒ Middleware                                         57.2 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
   (ISR)      incremental static regeneration (uses revalidate in getStaticProps)
ƒ  (Dynamic)  server-rendered on demand
```

## Output

And here is an example of the output:

```console
Route (pages)                                        Size     First Load JS
┌ ○ /                                                2.88 kB         167 kB
├   /_app                                            0 B             159 kB
├ ● /_meta (373 ms)                                  249 B           160 kB
├ ○ /404                                             1.59 kB         165 kB
├ ○ /advanced                                        1.6 kB          165 kB
├ ● /advanced/_meta (373 ms)                         256 B           160 kB
├ ○ /advanced/accesing-config                        3.14 kB         167 kB
├   └ css/3d60d0aceaeb37d9.css                       124 B
├ ○ /advanced/at-alias                               2.52 kB         166 kB
├ ƒ /api/auth/[...nextauth]                          0 B             159 kB
├ ƒ /api/github-repos/[username]                     0 B             159 kB
├ ƒ /api/restricted                                  0 B             159 kB
├ ● /auth/_meta                                      251 B           160 kB
├ ○ /auth/login                                      1.9 kB          166 kB
├ ○ /auth/restricted                                 2.29 kB         166 kB
├ ○ /clientComponent                                 2.88 kB         167 kB
├ ○ /clientSideProtectedExample                      2.27 kB         166 kB
├ ƒ /clientSideProtectedExampleDynamicPage           2.88 kB         171 kB
├ ○ /code                                            1.96 kB         166 kB
├ ● /context (405 ms)                                1.59 kB         165 kB
├ ƒ /dynamic-mdx                                     2.3 kB          171 kB
├ ƒ /dynamic-post-building                           2.31 kB         171 kB
├ ● /dynamic-post-building-getstaticprops (7896 ms)  2.31 kB         171 kB
├ ● /FileReader (405 ms)                             1.9 kB          166 kB
├ ● /get-static-props (ISR: 60 Seconds) (725 ms)     2.78 kB         167 kB
├ ● /get-static-props-readfile (405 ms)              1.89 kB         166 kB
├ ○ /intro-to-components                             3.1 kB          167 kB
├   └ css/a0786626dbb3c2b6.css                       103 B
├ ○ /live (377 ms)                                   87.1 kB         251 kB
├ ○ /passinginfo                                     1.99 kB         166 kB
├ ● /posts/[id] (1823 ms)                            642 B           160 kB
├   └ css/096e8b2b15818a7e.css                       575 B
├   ├ /posts/2024-12-08-leccion (478 ms)
├   ├ /posts/2024-12-09-leccion (478 ms)
├   └ /posts/2024-12-10-leccion.mdx (434 ms)
├ ○ /protected/secret                                2.23 kB         166 kB
├ ● /readFile (404 ms)                               1.55 kB         165 kB
├ ƒ /serverSideProtectedExample                      414 B           160 kB
├ ○ /swr                                             3.31 kB         172 kB
├ ƒ /user/[username]                                 801 B           160 kB
└ ○ /userRepos                                       2.5 kB          166 kB
    └ css/42ff6ee1a7e6fab4.css                       625 B
+ First Load JS shared by all                        174 kB
  ├ chunks/framework-36020a0d63a5b403.js             44.8 kB
  ├ chunks/main-a099d1c0233bb564.js                  37.8 kB
  ├ chunks/pages/_app-c5a310a9b1d2af76.js            75 kB
  ├ css/396771fc71f5a51c.css                         14.7 kB
  └ other shared chunks (total)                      1.71 kB
```


## Route Types

::: tip Route Types

These symbols indicate how each route is rendered:

1. **○**: Static routes, prerendered at build time
2. **●**: Static Site Generation (SSG) routes, using `getStaticProps`
3. **(ISR)**: Incremental Static Regeneration routes: ISR routes are pages that are initially generated at build time, like static pages, but can be regenerated on-demand after a specified time interval. 
   1. It uses the `revalidate` option in `getStaticProps` to set the time interval for regeneration.
   2. When a request comes in past the revalidate time, the page will be regenerated in the background.
   3. The updated page replaces the old version for subsequent requests.
   4. If the background regeneration fails, the old page remains unaltered.
4. **ƒ**: Dynamic routes, server-rendered on each request
5. **Size**: This column shows the size of the JavaScript specific to that route, not including shared chunks.
6. **First Load JS**: This represents the total amount of JavaScript downloaded when visiting the page for the first time, including shared chunks.
::: 

Here's the modified markdown with route names converted to markdown links:

## Analysis of some routes

Now, let's analyze some specific entries:

```plaintext
Route (pages)                                        Size     First Load JS
┌ ○ /                                                2.88 kB         167 kB
```

The [home route](https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/) ("/") has 2.88 kB of route-specific JS, but the total JS downloaded on first load is 167 kB.

```plaintext
├ ● /posts/[id] (1823 ms)                            642 B           160 kB
├   └ css/096e8b2b15818a7e.css                       575 B
├   ├ /posts/2024-12-08-leccion (478 ms)
├   ├ /posts/2024-12-09-leccion (478 ms)
├   └ /posts/2024-12-10-leccion.mdx (434 ms)
```

This dynamic route for [posts](https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/posts/2024-12-08-leccion) is using Static Site Generation (SSG) and took 1823 ms to generate. It has a very small route-specific size (642 B) but still requires 160 kB on first load. See section [Passing Information to getStaticProps](/temas/web/nextra/get-static-props). Since the SSG route has a `getStaticPaths` function, it generates pages for all the posts in the `posts` directory.

The route `/posts/2024-12-10-leccion` should be processed by the dynamic route code at `/pages/posts/[id].js`  but in fact the actual code in it does not know how to process and .mdx file and gives a page with a error message. See section [Dynamically read and process a MDX File](/temas/web/nextra/dynamic-readmdxfile.html#pages-dynamic-post-building-mdx)


```plaintext
├ ○ /live (377 ms)                                   87.1 kB         251 kB
```

The ["/live"](https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/live) route has a significantly larger route-specific JS size (87.1 kB) and the largest First Load JS (251 kB).

```plaintext
+ First Load JS shared by all                        174 kB
```

This indicates that 174 kB of JavaScript is shared across all routes.

## dynamic-mdx, dynamic-post-building and dynamic-post-building-getstaticprops

```plaintext
├ ƒ /dynamic-mdx                                     2.3 kB          171 kB
├ ƒ /dynamic-post-building                           2.31 kB         171 kB
├ ● /dynamic-post-building-getstaticprops (7896 ms)  2.31 kB         171 kB
``` 

The `pages/dynamic-mdx.mdx` in the branch `guide` that is mapped to the route `/dynamic-mdx`  uses `getServerSideProps`, `RemoteContent`, `buildDynamicMDX` and appears with an `ƒ` symbol which corresponds to a dynamic route, server-rendered on each request. It has a route-specific JS size of 2.3 kB and requires 171 kB on first load.

The `pages/dynamic-post-building.mdx` in the branch `guide` that is mapped to the route `/dynamic-post-building`  uses `getServerSideProps`, `RemoteContent`, `buildDynamicMDX` and appears with an `ƒ` symbol which corresponds to a dynamic route, server-rendered on each request. It has a route-specific JS size of 2.31 kB and requires 171 kB on first load.

The `pages/dynamic-post-building-getstaticprops.mdx` in the branch `guide` is explained in section [Dynamically read and process a MDX File](/temas/web/nextra/dynamic-readmdxfile.html#pages-dynamic-post-building-mdx) and is mapped to the route 
`/dynamic-post-building-getstaticprops`. It illustrates how to build your own mdx posts and give them an style compatible with nextra. It  uses `getStaticProps`, `RemoteContent`, `buildDynamicMDX` and appears with an `●` symbol which corresponds to a static site generation route, using `getStaticProps`. It has a route-specific JS size of 2.31 kB and requires 171 kB on first load. 




## CSS Files

Some routes have associated CSS files. Notice how they are renamed to a hash value. All of them
are static routes, prerendered at build time.

```plaintext
Route (pages)                                        Size     First Load JS
┌ ○ /                                                2.88 kB         167 kB
.
.
├ ○ /advanced/accesing-config                        3.14 kB         167 kB
├   └ css/3d60d0aceaeb37d9.css                       124 B
├ ○ /intro-to-components                             3.1 kB          167 kB
├   └ css/a0786626dbb3c2b6.css                       103 B
``` 

These CSS files are relatively small, indicating good CSS optimization.

## Conclusions

::: tip Conclusions

**Code Splitting**: Next.js is effectively code-splitting, as evidenced by the difference between the "Size" and "First Load JS" columns. Most routes have a small "Size" but a larger "First Load JS", indicating that shared code is being loaded separately.

**Static Generation**: Many routes are statically generated (○ or ●), which is good for performance as they can be cached and served quickly.

**Dynamic Routes**: There are several dynamic routes (ƒ), which will be server-rendered on each request. These might benefit from optimization if they receive high traffic.

**Large Shared Bundle**: The shared JavaScript bundle (174 kB) is relatively large. This could be an area for optimization, perhaps by reducing dependencies or code-splitting further.

**Performance Considerations**: The "/live" route has a significantly larger bundle size. If this is a frequently accessed route, it might be worth investigating ways to reduce its size.

**Build Times**: Some SSG routes have long build times (e.g., "/posts/[id]" at 1823 ms). If build times become an issue, these routes might be candidates for optimization.

**CSS**: Some routes have associated CSS files, which are relatively small, indicating good CSS optimization.


Overall, the build output suggests a well-optimized Next.js application with effective use of static generation and code splitting. However, there might be room for improvement in reducing the shared bundle size and optimizing some of the larger route-specific bundles .
::: 

## References

See the deployment at vercel <https://nextra-casiano-rodriguez-leon-alu0100291865.vercel.app/>