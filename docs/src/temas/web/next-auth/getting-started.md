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


### Initial Steps

I started fron the nextra assignment for the fake student <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865>. 

Made  a new branch `guide` from commit 
[526ce78](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/commit/526ce781323598534d5fe9e455cd1f201a4b61e6) 
when I was on `main`: <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/tree/guide>

Added the API route `pages/api/auth/[...nextauth].js` as explained at <https://next-auth.js.org/getting-started/example#add-api-route>. See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/pages/api/auth/%5B...nextauth%5D.js>

::: danger Bug  
I forced  the script `"dev": "next -p 3000",` to listen in port 3000 in the `package.json`,  since I have found a bug in next-auth GitHub provider. The `sigin` page seems to have hardcoded the port to 3000 `http://localhost:3000/api/auth/signin/github`: <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/package.json#L6-L10>
::: 

## Add API route

When reading the section [Add API route](Add API route) for Nextra I've got errors that were fixed 
by changing the calls to `GithubProvider` and `NextAuth`  by adding `.default`:

File `pages/api/auth/[...nextauth].js`

```js  {7,29} 
import NextAuth from "next-auth" // https://next-auth.js.org/getting-started/example#add-api-route
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ]
}

export default NextAuth.default(authOptions)
```



## SessionProvider component in `pages/_app.jsx`

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

## login-btn component

Added the `login-btn` component as explained at 
<https://next-auth.js.org/getting-started/example#frontend---add-react-hook>

```jsx
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status: status } = useSession()
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

## useSession() NextAuth React Hook

The [useSession()](https://next-auth.js.org/getting-started/client#usesession) React Hook in the NextAuth.js **client** is the easiest way to check if someone is signed in.

`useSession()` returns an object containing two values: `data` and `status`:

**data**: This can be three values: `Session` / `undefined` / `null`.
- when the session hasn't been fetched yet, `data` will be `undefined`
- in case it failed to retrieve the session, `data` will be `null`
- in case of success, `data` will be a `Session` object.

**status**: Is a enum mapping to three possible session states: `"loading" | "authenticated" | "unauthenticated"`

To wrap all the pages, make sure that `<SessionProvider>` is added to `pages/_app.js`.


See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/components/login-btn.jsx>

## signIn() method

Using the client side [signIn()](https://next-auth.js.org/getting-started/client#signin) method ensures the user ends back on the page they started on after completing a sign in flow. 
It will also handle CSRF Tokens for you automatically when signing in with email.

By default, when calling the `signIn()` method with no arguments, you will be redirected to the NextAuth.js sign-in page. If you want to skip that and get redirected to your provider's page immediately, call the signIn() method with the provider's id.

For example to sign in with GitHub:

```jsx
import { signIn } from "next-auth/react"

export default () => (
  <button onClick={() => signIn("github")}>Sign in with GitHub</button>
)
```

The `signIn()` method receives a second argument, an object with options. 
The most common options are [callbackUrl](https://next-auth.js.org/getting-started/client#specifying-a-callbackurl) 
and [redirect](https://next-auth.js.org/getting-started/client#using-the-redirect-false-option).

The **callbackUrl** specifies to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.

Examples:

```js
signIn(undefined, { callbackUrl: '/foo' }) // A relative url starting with a slash
signIn('google', { callbackUrl: 'http://localhost:3000/bar' }) // Or an absolute URL at the same host name,
signIn('email', { email, callbackUrl: 'http://localhost:3000/foo' })
signIn('credentials', { redirect: false, password: 'password' })   // Disable the redirect and handle the error on the same page.
signIn('email', { redirect: false, email: 'bill@fillmurray.com' }) // In such case signIn will return a Promise,
```

If `redirect` is set to `false`, the `signIn` method will return a Promise that resolves to 
an object with the following properties:

```js
{
  error: string | undefined // Error message if there was an error
  status: number // HTTP status code
  ok: boolean // `true` if the request was successful, `false` otherwise
  url: string | null // The URL the user should be redirected to or null `null` if there was an error
}
```