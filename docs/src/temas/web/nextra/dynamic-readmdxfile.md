# Dynamically read and process a MDX File

## pages/dynamic-post-building.mdx

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/edit/guide/pages/dynamic-post-building.mdx>

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat pages/dynamic-post-building.mdx`

```jsx
import { promises as fs } from 'fs'
import path from 'path'

import { RemoteContent } from 'nextra/components'
import { buildDynamicMDX } from 'nextra/remote'
import ShowFrontmatter from '@/components/showFrontmatter'
import { arrayToMarkdownList } from '@/src/utils'

import Cat from '@/components/dcat'

export async function getServerSideProps() {
  const filename = "2024-12-10-leccion.mdx"
  const randomURL = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=5' // if you move the fetcher function outside of the getStaticProps, 
  const fetcher = () => fetch(randomURL).then(res => res.json())  // you will get an error because fetcher is not defined
  const res = arrayToMarkdownList(await fetcher()) // More fetched content

  const postsDirectory = path.join(process.cwd(), 'posts')
  const filePath = path.join(postsDirectory, filename)

  let DPage = null;
  try {
    DPage = await fs.readFile(filePath, 'utf8')
    DPage = DPage.replace(/¡¡res!!/g, res) // Do all substitutions tha you want!
  } catch (error) {
    DPage = "# Error:\n\n```\n'error'\n```\n".replace(/error/, error)
  }

  const props = await buildDynamicMDX(DPage)
  props.__nextra_dynamic_opts.frontMatter = {a: '4', b: '5'} 
  return { props }
}

<RemoteContent components={{ Cat, ShowFrontmatter }} />
```

## posts/2024-12-10-leccion.mdx 

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/edit/guide/posts/2024-12-10-leccion.mdx>

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat posts/2024-12-10-leccion.mdx`

````markdown
# Lesson 2024/12/10

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

## Dynamic frontmatter

<ShowFrontmatter />

## A cat fetched at building time

<Cat />

## My own template with some random numbers fetched at building time

¡¡res!!

## Code example

```jsx
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

## References

- [How to render a component and have its source code syntax-highlighted in a Pre block? #2167](https://github.com/shuding/nextra/discussions/2167)
````

## components/showFrontmatter.jsx

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/edit/guide/components/showFrontmatter.jsx>


` ➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat components/showFrontmatter.jsx` 

```jsx
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

## components/dcat.jsx


See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/edit/guide/components/dcat.jsx>

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat components/dcat.jsx `

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

## src/utils.js

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/src/utils.js>

```js
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat src/utils.js
export const replaceQuotes = s => s.replace(/(\\")|(")/g, function(m, p1, p2) { return p1? '"' : "`" })
export const arrayToMarkdownList = res => res.map(n => `- ${n}`).join("\n")
```