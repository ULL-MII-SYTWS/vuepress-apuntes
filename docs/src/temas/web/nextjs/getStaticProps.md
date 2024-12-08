# Passing Information to getStaticProps 

:::  tip While `getStaticProps` doesn't directly accept arguments in the way a regular function would, there are a couple of ways to pass information to it:
1. Using [Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes): If you're using dynamic routes, you can access route parameters in `getStaticProps`.
2. Using `context` object: `getStaticProps` receives a `context` object which can contain additional information.
:::


## Using Dynamic Routes

If you have a dynamic route, like `pages/posts/[id].js`, you can access the `id` parameter in `getStaticProps`.
Consider the following tree structure:

```plaintext
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) ✗ tree -I 'node_modules|api|advanced|auth|components|public|src|data|protected|*.mdx|*.jsx|_meta*' -P 'pages|posts|\[id\].js' --matchdirs
.
├── pages
│   ├── posts
│   │   └── [id].js
│   └── user
└── posts
    ├── 2024-12-08-leccion.md
    └── 2024-12-09-leccion.md
```

Then you can access the `id` parameter in `getStaticProps` like this:


`filename="pages/posts/[id].js"`

```js copy
import { promises as fs } from 'fs'
import path from 'path'
import { useRouter } from 'next/router'
//import { NotFoundPage } from 'nextra-theme-docs'


export default function Post({ postContent }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!postContent) {
    return (<div>
              <h1>404. Page not found!</h1>
            </div>)
  }

  return <pre>{postContent}</pre>
}

export async function getStaticProps({ params }) {
  const { id } = params
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filePath = path.join(postsDirectory, `${id}.md`)

  try {
    const postContent = await fs.readFile(filePath, 'utf8')
    return {
      props: {
        postContent,
      },
    }
  } catch (error) {
    // If the file is not found, return null for postContent
    if (error.code === 'ENOENT') {
      return {
        props: {
          postContent: null,
        },
      }
    }
    throw error
  }
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.md$/, '') },
  }))

  return { paths, fallback: true }
}
```

In this example, `getStaticProps` receives the `id` from the URL parameters and uses it to read the corresponding file.

 

::: tip Notice how we're handling non-existent posts.
1. In `getStaticPaths`, [we've set `fallback: true`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-true). This allows Next.js to generate pages for paths that weren't pre-rendered at build time .
2. In `getStaticProps`, if the file is not found, we return `null` for `postContent` instead of throwing an error.
3. In the `Post` component, we've added checks for the fallback state and for when `postContent` is null:
4. We use the `useRouter` hook to check if the page is in a fallback state.
  - When a request comes in for a page that wasn't pre-rendered, Next.js starts generating the HTML and JSON for that page.
  - During this generation process, `router.isFallback` is `true`.
  - Once the page generation is complete, Next.js serves the newly generated page, and for subsequent requests, `router.isFallback` will be `false`
  - Relationship of `router.isFallback` with `fallback` in `getStaticPaths`:
    1. If `fallback: false`, `router.isFallback` will always be `false` because any paths not returned by `getStaticPaths` will result in a 404 page.
    2. If `fallback: true` or `fallback: 'blocking'`, `router.isFallback` can be `true` for paths not pre-rendered at build time .
  - Remember, `router.isFallback` is only relevant for pages with dynamic routes that use `getStaticProps` and `getStaticPaths`. It's not applicable to pages using `getServerSideProps` or client-side data fetching.
5. If `postContent` is `null` (meaning the post wasn't found), we render a `404. Page not found!` message.
:::

Now, when you visit a post that doesn't exist:

- If the post hasn't been generated yet, you'll briefly see a `Loading...` message while Next.js attempts to generate the page.
- If the post truly doesn't exist, you'll see a `404. Page not found!` message.

### The role of the function `getStaticPaths`

[The function `getStaticPaths` plays a crucial role in Next.js](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths) when working with dynamic routes and static generation. 

::: danger Here's an explanation of its purpose and functionality:
1. **Specifying Dynamic Routes**: `getStaticPaths` is used to define which paths will be pre-rendered for pages that use dynamic routes. In the example above, it's determining which post IDs should be pre-rendered at build time.
2. **Static Generation**: When you export `getStaticPaths` from a page that uses dynamic routes, *Next.js will statically pre-render all the paths specified by `getStaticPaths`*. This means that **these pages are generated at build time**, resulting in faster page loads and better SEO.
3. **Defining Paths**: The function returns an object with a `paths` key, which is an array of objects. Each object in this array represents a route that should be pre-rendered . In our example, it's creating a path for each markdown file in the `posts` directory.
4. [**Fallback Behavior**](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-false): `getStaticPaths` also allows you to control the fallback behavior for paths that aren't pre-rendered. In our example, [`fallback: false`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-false) means that any paths not returned by `getStaticPaths` will result in a [404 page]() .
5. **Build-Time Execution**: `getStaticPaths` runs at build time in production. It's not called during runtime in production, which is important for performance .
:::

Here's a breakdown of what our `getStaticPaths` function is doing:

```javascript
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.md$/, '') },
  }))

  return { paths, fallback: false }
}
```

1. It reads the `posts` directory.
2. For each file in the directory, it creates a `params` object with an `id` that corresponds to the filename (without the `.md` extension).
3. It returns these paths, telling Next.js to pre-render a page for each of these `id`s.


This function works in tandem with `getStaticProps`. While `getStaticPaths` defines which paths to pre-render, `getStaticProps` is then called for each of these paths to fetch the data needed to render the page .

By using `getStaticPaths`, you're able to create static pages for dynamic routes, combining the benefits of dynamic content with the performance and SEO advantages of static generation.

## Using the `context` object


::: tip The context object passed to getStaticProps

[Contains several properties](https://nextjs.org/docs/pages/api-reference/functions/get-static-props#context-parameter) that you can use :

- `params`: If you're using [dynamic routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes), `params` contains the route parameters.
- `draftMode`: `true` if the page is in the [Draft Mode](https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode) and `false` otherwise. Is useful when your pages fetch data from a [headless CMS](https://youtu.be/ajRbuyLUfZE?si=xAd1FVuId03nLaZG) and you’d want Next.js to render these pages at **request** time instead of build time and fetch the draft content instead of the published content. You’d want Next.js to bypass Static Generation only for this specific case.
- `preview`: (Deprecated for draftMode) A boolean indicating if the page is in [preview mode](https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode).
- `previewData`: (Deprecated for draftMode) The preview data set by `setPreviewData`.
- `locale`: The active locale, if you're using internationalization.
- `locales`: All supported locales, if you're using internationalization.
- `defaultLocale`: The default locale, if you're using internationalization.
:::

Here's an example using some of these properties:

```js
import { promises as fs } from 'fs'
import path from 'path'

export default function ContextExample({ files }) {
  return (
    <div>
      <h1>File Reader Example</h1>
      <ul>
        {files.map((file) => (
          <li key={file.filename}>
            <h3>{file.filename}</h3>
            <pre>{file.content}</pre>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps(context) {
  const { preview = false } = context

  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const files = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const content = await fs.readFile(filePath, 'utf8')
      return { filename, content: preview ? content : content.slice(0, 100) + '...' }
    })
  )

  return {
    props: {
      files,
    },
  }
}
```

In this example, `getStaticProps` uses the `preview` flag from the context to determine whether to show full file contents or not.


In this example:

1. The `getStaticProps` function reads the contents of each file in the `posts` directory.
2. It creates an array of `files`, where each item is an object containing the `filename` and `content` of the file.
3. If the page is not in preview mode, we truncate the content to the first 100 characters to avoid sending too much data. You can adjust this as needed.
4. The `files` array is passed as a prop to the `ContextExample` component.
5. In the `ContextExample` component, we map over the `files` array and render both the filename and the content of each file.


This approach allows you to access and display the file contents directly in your component. Remember that this data is fetched at build time, so if you need to update the content, you'll need to rebuild your Next.js application.

Also, keep in mind that reading and passing the full content of all files might not be efficient if you have a large number of files or if the files are very large. In such cases, you might want to consider:

1. Implementing pagination
2. Fetching file contents on-demand (e.g., when a user clicks on a file name)
3. Using `getServerSideProps` instead of `getStaticProps` if you need the latest file contents on each request

