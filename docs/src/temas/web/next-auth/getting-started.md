---
permalink: next-auth-getting-started
---
# Reading "Getting Started with NextAuth.js" 

These are my comments when reading the [Getting Started](https://next-auth.js.org/getting-started/example) guide of NextAuth.js
for a [Nextra lab](/practicas/nextra.html).

## Repo https://github.com/nextauthjs/next-auth-example/ 

In [New Project](https://next-auth.js.org/getting-started/example#new-project) the guide suggests to clone the repo 
<https://next-auth-example.vercel.app/> and learn from it, so I cloned it.

In the `main` branch the version of  `next-auth` is  `beta` and 
`next` is `latest`. The example used the `app` folder instead of `pages`.
The version of `next` installed at this time (November 2024) was:

I noticed the next-auth has no public documentation for the `beta` version. 

There are 5 branches. The others 4 are `stale`. 2  `test/*` branches, one `feat/*` branch and one `apple-sign-in ` branch using `next` 12. All of them can be used to learn.

::: danger Conclusion
Discarded the idea of using it as the main learning resource.
:::

So, I follow with the section **[Existing Project](https://next-auth.js.org/getting-started/example#existing-project)** path.

## Issues when following the guide

### Initial Steps

I started fron the nextra assignment for the fake student <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865>. 

Made  a new branch `guide` from commit `526ce78` when I was on `main`: <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/tree/guide>

Added the API route `pages/api/auth/[...nextauth].js` as explained at <https://next-auth.js.org/getting-started/example#add-api-route>. See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/pages/api/auth/%5B...nextauth%5D.js>

::: danger Bug  
I forced  the script `"dev": "next -p 3000",` to listen in port 3000 in the `package.json`,  since I have found a bug in next-auth GitHub provider. The `sigin` page seems to have hardcoded the port to 3000 `http://localhost:3000/api/auth/signin/github`: <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/package.json#L6-L10>
::: 

### SessionProvider component in `pages/_app.jsx`

I also changed the main file `pages/_app.jsx` to use the `SessionProvider` as explained at 
<https://next-auth.js.org/getting-started/example#configure-shared-session-state>

File `pages/_app.jsx`:

```jsx {6,10,13,15}
/* Old code
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
*/
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/pages/_app.jsx>

Added the `login-btn` component as explained at https://next-auth.js.org/getting-started/example#frontend---add-react-hook