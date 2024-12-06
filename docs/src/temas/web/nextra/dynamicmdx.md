## Building Dynamic mdx with Nextra at Building Time

The following example shows how to build dynamic content with Nextra using the `buildDynamicMDX` function, the `RemoteContent` component and 
a `getStaticProps` function.


`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat pages/dynamic-mdx.mdx`

```js
import Cat from '@/components/dcat'
import { RemoteContent } from 'nextra/components'
import { buildDynamicMDX } from 'nextra/remote'
import TestValue from '@/components/test-value'

export async function getStaticProps() {
  const randomURL = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=5' // if you move the fetcher function outside of the getStaticProps, 
  const fetcher = () => fetch(randomURL).then(res => res.json())  // you will get an error because fetcher is not defined

  const title = `# buildDynamicMDX and RemoteContent`
  const section1 = `## Example of dynamic MDX\nWe write a \`getStaticProps\` function to fetch the content of the \`mdx\` files and then we use \`RemoteContent\` and \`buildDynamicMDX\` to build the \`mdx\` content.` // Some fetched content
  const res = (await fetcher()).join('\n- ')
  const section2 = `## A cat\n\n  <Cat />\n\n## Random numbers\n\n- ${res}`   // More fetched content

  const props = await buildDynamicMDX(`
${title}

${section1}

${section2}

## Frontmatter Test Value
The value of the test variable is: <TestValue />
  `)
  props.__nextra_dynamic_opts.frontMatter.test= '4'
  return { props }
}

<RemoteContent components={{ Cat, TestValue }} />
```

Notice that we are using the dynamic cat component (`useSWR`).
The image of the cat changes with each reload even if we are using `next start` but the random numbers do not.

When you use `useSWR` inside a component in Next.js, that component becomes a Client Component. 
`useSWR` is a React hook, and hooks can only be used in Client Components .


### test-value.jsx

This is the code of the `test-value.jsx` component:

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat components/test-value.jsx`

```jsx 
import { useConfig } from 'nextra-theme-docs'

export default function TestValue() {
  const { frontMatter } = useConfig()
  return <span>{frontMatter.test}</span>
}
```

### dcat.jsx

It is a client component that fetches a cat image from the cat API.

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat components/dcat.jsx`

```jsx
import useSWR from 'swr'
import Image from 'next/image'

const catURL=  "https://api.thecatapi.com/v1/images/search?size=full"

const key = catURL; // The key param represents the URL, in the case of REST APIs, to which the request is to be made. The reason for the key name is because it actually is a key. It is a unique string that represents the data that is being fetched. If the key changes, the data will be refetched.
const fetcher = () => fetch(catURL).then((res) => res.json())
const options = { revalidateOnFocus: false }

export default function DCat() {
  const { data, isLoading, error } = useSWR(key, fetcher, options);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return <Image src={data[0].url} width={data[0].width} height={data[0].height}/>
}
```

### The page

Here is how it looks the page:

![/images/nextra/dynamicmdx.png](/images/nextra/dynamicmdx.png)

### RemoteContent

The `RemoteContent` component is used to render the dynamic content. 

```jsx
<RemoteContent components={{ Cat }} />
```

The `components` prop is used to pass the components that will be used in the dynamic content.

### buildDynamicMDX

The `buildDynamicMDX` function is used to build the dynamic content. It calls the markdown compiler
and returns the compiled content and the frontMatter.

```js
export async function buildDynamicMDX(content: string, compileMdxOptions) {
  const { result, frontMatter, title } = await compileMdx(content, compileMdxOptions)

  return {
    __nextra_dynamic_mdx: result,
    __nextra_dynamic_opts: { frontMatter, title }
  }
}
```

See also [An Example of Remote Docs Fetched from GitHub](https://the-guild.dev/blog/nextra-3#remote-docs-support) inside the blog 
*Nextra 3 – Your Favourite MDX Framework, Now on 🧪 Steroids*


### getStaticProps

When visiting this page, the `getStaticProps` function
fetches the cat image at build time and returns the props to the page.

When we are using `next start`, the image of the cat does not change with each reload.


`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat pages/get-static-props.mdx`

```jsx
import { useData } from 'nextra/hooks'

export async function getStaticProps() {
  // Hacer una solicitud de datos en tiempo de compilación
  const catURL=  "https://api.thecatapi.com/v1/images/search?size=full"
  const res = await fetch(catURL);
  const cats = await res.json();

  return {
    props: { // We add an `ssg` field to the page props, which will be provided to the Nextra `useData` hook.
      ssg: {
        cats: cats
      }
    },
    // The page will be considered as stale and regenerated every 60 seconds.
    revalidate: 60
  };
}

export function Cats() {
  const { cats } = useData()
  return (
    <div>
      <ul>
        {cats.map(cat => (
          <li key={cat.id}><img src={cat.url} width={cat.width} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

````md
## Cats

<Cats />

````

## Building Dynamic mdx with Nextra at Server Side Rendering Time

To be written

## Building a Protected Dynamic mdx page with Nextra at Client Side Rendering Time 

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat pages/clientSideProtectedExampleDynamicPage.mdx`

```jsx
import { useSession, getSession } from "next-auth/react"
import Styles from "@/components/UserRepos.module.css"
import { RemoteContent } from 'nextra/components'
import { buildDynamicMDX } from 'nextra/remote'
import { arrayToMarkdownList } from '@/src/utils'
import ShowFrontmatter from '@/components/showFrontmatter'
import DPage from '@/src/dynamicPage'

import Cat from '@/components/dcat';

export async function getServerSideProps() {
  const randomURL = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=5' // if you move the fetcher function outside of the getStaticProps, 
  const fetcher = () => fetch(randomURL).then(res => res.json())  // you will get an error because fetcher is not defined
  const res = arrayToMarkdownList(await fetcher()) // More fetched content

  const props = await buildDynamicMDX(DPage(res))
  props.__nextra_dynamic_opts.frontMatter = {a: '4', b: '5'} 
  return { props }
}

export function AuthenticatedContent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <h2 className={Styles.h2}>Loading...</h2>
  }

  if (status === "unauthenticated") {
    return  (<div>
      <h2 className={Styles.h2}>Access Denied to the private content</h2>
      <a href="/api/auth/signin/github" className={ Styles.button}>Sign in to see the private content</a>

      <RemoteContent components={{ Cat, ShowFrontmatter }} />
    </div>)
  }

  return (
    <>
      <h2 className={Styles.h2}>Protected Content</h2>
      <p className={Styles.p}>Your email is: {session.user.email}. You can view this page because you are signed in.</p>
      <a href="/api/auth/signout" className={ Styles.button}>Sign out</a>
    </>
  )
}

# NextAuth.js Client Side Example

If data on a page is fetched using calls to secure API routes - i.e. routes which use 
`getSession()` or `getToken()` to access the session - you can use the `useSession` 
React Hook to secure pages.

See https://next-auth.js.org/tutorials/securing-pages-and-api-routes#client-side

---

<AuthenticatedContent />
```

### src/dynamicPage.js

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat src/dynamicPage.js`

```js
/* a function that is a template for a mdx page */
import { replaceQuotes } from '@/src/utils'

export default res => replaceQuotes(`
# buildDynamicMDX and RemoteContent

## Code example

Here is some code:

"""js copy
let a=4
""" 

## A cat

<Cat />

## Random numbers

${res}  

## Frontmatter Value

<ShowFrontmatter />
`)
```

### src/showFrontmatter.js

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat components/showFrontmatter.jsx`

```js
import { useConfig } from 'nextra-theme-docs'
import styles from '@/components/UserRepos.module.css'

export default function ShowFrontmatter() {
  const { frontMatter } = useConfig()
  return (
    <ul className={styles.list}>
      {
        Object.keys(frontMatter).map(
          k => (<li key={k} className={styles.listItem}>The frontmatter value of "{k}" is "{frontMatter[k]}" </li>)
        )
      }
    </ul>)
}
```

### src/utils.js

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat src/utils.js`

```js 
export const replaceQuotes = s => s.replace(/"/g,"`");
export const arrayToMarkdownList = res => res.map(n => `- ${n}`).join("\n")
```