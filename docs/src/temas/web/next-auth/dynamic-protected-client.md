## Building a Protected Dynamic mdx page with Nextra at Client Side Rendering Time 

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat pages/clientSideProtectedExampleDynamicPage.mdx`

```jsx
import Styles from "@/components/UserRepos.module.css"
import { buildDynamicMDX } from 'nextra/remote'
import { arrayToMarkdownList } from '@/src/utils'
import AuthenticatedContent from '@/components/authenticatedContent'
import ShowFrontmatter from '@/components/showFrontmatter'
import DPage from '@/src/dynamicPage'

import Cat from '@/components/dcat';

export async function getServerSideProps() {
  try {
    const randomURL = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=5' // if you move the fetcher function outside of the getStaticProps, 
    const fetcher = () => fetch(randomURL).then(res => res.json())  // you will get an error because fetcher is not defined
    const res = arrayToMarkdownList(await fetcher()) // More fetched content

    const props = await buildDynamicMDX(DPage(res))
    props.__nextra_dynamic_opts.frontMatter = {a: '4', b: '5'} 
    return { props }
  }
  catch (error) {
    console.error('Error fetching data:', error)
    return { props: { error: 'Failed to load data' } }
  }
}

# NextAuth.js Client Side Example

If data on a page is fetched using calls to secure API routes - i.e. routes which use 
`getSession()` or `getToken()` to access the session - you can use the `useSession` 
React Hook to secure pages.

See https://next-auth.js.org/tutorials/securing-pages-and-api-routes#client-side

---

<AuthenticatedContent dependencies={{Cat, ShowFrontmatter}}/>
```

### components/authenticatedContent.js

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat components/authenticatedContent.jsx`

```js
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { RemoteContent } from 'nextra/components'
import Styles from "@/components/UserRepos.module.css"


export default function AuthenticatedContent({error, dependencies}) {
  const { data: session, status } = useSession()

  if (error) {
    return <div>Error: {error}</div>
  }

  if (status === "loading") {
    return <h2 className={Styles.h2}>Loading...</h2>
  }

  if (status === "unauthenticated") {
    return  (<div>
      <h2 className={Styles.h2}>Access Denied to the private content</h2>
      <button onClick={() => signIn("github")} className={Styles.button}>Sign in</button>
    </div>)
  }

  return (
    <>
      <h2 className={Styles.h2}>Protected Content</h2>
      <p className={Styles.p}>Your email is: {session.user.email}. You can view this page because you are signed in.</p>
      <button onClick={() => signOut()} className={Styles.button}>Sign out</button>

      <RemoteContent components={dependencies} />
    </>
  )
}
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

## A \\"cat\\"

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
export const replaceQuotes = s => s.replace(/(\\")|(")/g, function(m, p1, p2) { return p1? '"' : "`" })
export const arrayToMarkdownList = res => res.map(n => `- ${n}`).join("\n") 
```