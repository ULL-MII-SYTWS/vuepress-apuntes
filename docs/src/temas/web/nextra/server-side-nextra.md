---
sidebar: auto
---
# Can I make server side programming in Nextra?

You can perform server-side programming in Nextra, since it’s built on top of Next.js. This means Nextra inherits all of Next.js’s core features, including 

- **server-side rendering (SSR)**, 
- **API routes**, and 
- **server-side data fetching** methods (like `getServerSideProps`).


## How Server-Side Programming Works in Nextra

1. **API Routes**: You can define API routes in a Nextra project just like in a regular Next.js project. Place your API files inside the `pages/api` directory to create serverless functions or API endpoints. These endpoints can handle server-side logic, database operations, authentication, and more.

2. **Server-Side Rendering (SSR)**: Nextra supports SSR via `getServerSideProps` in custom pages. However, since Nextra is generally used for static documentation sites or blogs, SSR might be less common, as static generation is usually preferred for speed and simplicity. Still, for pages that require dynamic data fetching on the server, you can add `getServerSideProps` to retrieve data at request time.

3. **Data Fetching with Static Site Generation (SSG)**: Since Nextra is optimized for static content, we can use **SSG** with `getStaticProps`, where data is fetched at build time. See the example at [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/pages/get-static-props.mdx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/pages/get-static-props.mdx) at branch `all-repos`. This can be useful for loading content or configuration data that doesn’t change often. But if you need fresh data on each request, SSR can be implemented as well. 

See  also  [Dynamic MDX with Nextra](/temas/web/nextra/dynamicmdx.html) for an example of dynamic MDX content with Nextra.


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

## An API endpoint handler: pages/api/github-repos/\[username\].js

The square brackets `[ ]` in the file name [pages/api/github-repos/\[username\].js](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/pages/api/github-repos/%5Busername%5D.js)ndicate a dynamic segment.
The file is located in the `pages/api` directory, which is where API route files to be, defining an API endpoint
so that a request like `GET /api/github-repos/johndoe` will be handled by this file and the `username` parameter will be `johndoe`.


The function  `handler(req, res)` fetches all public repositories from the REST GitHub API for a 
given `username`, one page at a time. 



```js {26,28}
export default async function handler(req, res) {
  const { username } = req.query

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' })
  }

  // Exercise: Receive the page number and fetch one page repos at a time
  // and modify the <AskUser /> to have buttons next, prev, etc.
  try {
    let allRepos = []
    let page = 1
    let hasNextPage = true

    while (hasNextPage) {
      // const response = await fetch(`https://api.github.com/users/${username}/repos`)
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`)

      if (!response.ok) {
        throw new Error('Failed to fetch repos')
      }

      const repos = await response.json()
      allRepos = [...allRepos, ...repos]

      const linkHeader = response.headers.get('Link')

      hasNextPage = linkHeader ? linkHeader.includes('rel="next"') : false
      page++
    }

    res.status(200).json(allRepos)
  } catch (error) {
    console.error('Error fetching repos:', error)
    res.status(500).json({ error: 'Failed to fetch repos '+error.message })
  }
}
```

response.headers.get('Link')` retrieves the Link header from the `response`, which contains pagination information.

`hasNextPage = linkHeader ? linkHeader.includes('rel="next"') : false` checks if the Link header contains a `rel="next"` link, indicating that there are more pages to fetch. 

See the GitHub Docs chapter [Using pagination in the REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers).

The while loop fetches all the pages of repositories for the given `username` and concatenates them into the `allRepos` array.
It can be substituted by a  generator using a `for await ... of` loop like is described in my comment at the StackOverflow question [for await of VS Promise.all](https://stackoverflow.com/questions/59694309/for-await-of-vs-promise-all/65448956#65448956)

Another exercise is to modify this example to receive the page number and fetch one page repos at a time. 
In such case you have also to modify the `<AskUser />` to have buttons `next`, `prev`, etc.

## The `userRepos.mdx` page

This quite a simple `mdx` page that imports the component to ask the user for a GitHub username and then fetches the user's public repositories using the API endpoint handler described above.

```jsx
import AskUser from '@/components/ask-user'

<AskUser />
```

## The `ask-user.jsx` code

```jsx  {16,27,40}
import { 
  useState, 
  useRef, // The `useRef` hook allows to create a mutable reference that persists across component re-renders without causing the component to re-render when its value changes
  useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/Home.module.css'

export default function AskUser() {
  const [username, setUsername] = useState('')
  const router = useRouter()
  const inputRef = useRef(null)

  // For when the page is called directly with something like
  // http://localhost:3000/userRepos?username=rmz01
  // This is useful in scenarios where the page can be accessed directly with a query parameter or after a form submission.
  router.query.username && router.push(`/user/${router.query.username}`)

  useEffect(() => {
    if (inputRef.current) { // inputRef.current refers to the DOM element that inputRef is attached to.
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault() // prevent the page to reload
    if (username) {
      router.push(`/user/${username}`)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={styles.input}
          ref={inputRef}
        />
        <button type="submit" className={styles.button}>
          View Repos
        </button>
      </form>
    </div>
  )
}
```

The line  27 `router.push(/user/${username})`  uses the `router.push` method to  navigate to the  URL  `/user/${username}`. This request will be handled by the dynamic page file `pages/user/[username].jsx`.

## The dynamic page file `pages/user/[username].jsx`

This file is a dynamic page file that fetches the user's public repositories using the API endpoint handler described above.

```jsx {6,23-29,42,45}
// Issue Server-side Rendering (SSR) support #181 
// https://github.com/shuding/nextra/issues/181#issuecomment-1399318974
import Link from 'next/link'
import styles from '@/components/UserRepos.module.css'

export const getServerSideProps = async (context) => {
  const username = context.params?.username
  console.error(username)

  try {
    const URL = `http://localhost:3000/api/github-repos/${username}`;
    console.error(`**** ${new Date()} URL = ${URL} *******`)
    const res = await fetch(URL)

    if (!res.ok) {
      console.error('**** Failed to fetch repos')
      throw new Error('Failed to fetch repos')
    }

    const repos = await res.json()
    console.error(JSON.stringify(repos[0], null, 2))

    return {
      props: {
        repos,
        username,
        reason: false
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)
    return {
      props: {
        repos: [],
        username,
        reason: error.message
      },
    }
  }
}

export default function UserRepos(P) {
  const str2 = JSON.stringify(P, null, 2);
  console.error(`********** ${str2} ************`);
  const { repos, username, reason } = P;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{username}'s Repositories</h1>
      {(<>
        <ol className={styles.nlist}>
          {repos.map((repo) => (
            <li key={repo.id} className={styles.listItem}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {repo.name}
              </a>
            </li>
          ))}
        </ol>
        <p>{reason && (`Something went wrong: "${reason}"`)}</p>
      </>
      )}
      <Link href="/userRepos" className={styles.backLink}>
        Back to GitHub Repository Viewer
      </Link>
    </div>
  )
}
```

In line 6 we declare `getServerSideProps`  which receives the `context`. In Next.js the term **context** typically refers to an object that provides information about the request and environment in which a function is running. It is commonly used in data fetching methods like `getStaticProps`, `getServerSideProps`, and API route handlers.  In `getServerSideProps` rovides parameters like `params`, `req`, `res`, `query`, and `resolvedUrl`.

The `getServerSideProps` function fetches the user's public repositories from the GitHub API using the `username` parameter from the URL. It returns the fetched repositories as `props` to the `UserRepos` component. These properties are passed as `props` to the page component, (lines 42 and 45) allowing it to render dynamic content based on the fetched data and provided values (lines 47-65).

## Limitations
While Nextra allows for server-side programming, it’s optimized for static content. As a result:
- Using too much server-side logic might go against Nextra’s goal of providing fast, statically generated content.
- Some out-of-the-box features like Nextra’s Markdown-powered documentation setup might not benefit from SSR, as they are intended to be pre-rendered at build time.

## When to Use Server-Side Programming in Nextra
- **Authenticated content**: For example, to check user authentication status and render content conditionally.
- **Dynamic content**: When data needs to be fetched fresh on each request (e.g., real-time data, personalized content).
- **APIs**: To create backend functionality without needing a separate server.

In general, Nextra’s server-side capabilities make it more flexible, but it’s best suited for projects where most pages remain static.