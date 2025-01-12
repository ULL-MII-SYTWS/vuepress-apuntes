---
permalink: next-auth-getting-started
---
# Reading "Getting Started with NextAuth.js" 

These are my comments when reading the [Getting Started](https://next-auth.js.org/getting-started/example) guide of NextAuth.js
for a [Nextra lab](/practicas/nextra.html). November 2024.

## Repo https://github.com/nextauthjs/next-auth-example/ 

In the section [New Project](https://next-auth.js.org/getting-started/example#new-project) the guide suggests to clone the repo 
<https://github.com/nextauthjs/next-auth-example> whose live demo is at <https://next-auth-example.vercel.app/> and learn from it, so I cloned it.

This tutorial was written when the last commit was <https://github.com/nextauthjs/next-auth-example/commit/10f10f1a46a1e230b6524252a1a65001f1a58757> on Oct 21, 2024. Things may have changed since then.

If you go to the 
[package.json](https://github.com/nextauthjs/next-auth-example/blob/main/package.json#L33-L34), in the `main` branch,
you can see that the version of  `next-auth` is  `beta` and 
`next` is `latest`. The example used the `app` folder instead of `pages`.
The version of `next` installed at this time (November 2024) was `15.03`.

I noticed the next-auth has no public documentation for the `beta` version. 

There are 5 branches. [The others 4 are `stale`](https://github.com/nextauthjs/next-auth-example/branches/stale). 2  `test/*` branches, one `feat/*` branch and one `apple-sign-in ` branch using `next` 12. All of them can be used to learn.

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

```js  {7,15} 
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

::: tip 
For an explanation of how Next.js API routes work see <https://ull-pl.vercel.app/nextra-playground/authorization/next-auth-tutorial#creating-the-server-config> at my PL Notes.

Behind the scenes, this code creates all the relevant OAuth API routes 
within `/api/auth/*` so that auth API requests can be handled by NextAuth.js. 
In this way, NextAuth.js stays in charge of the whole application's request/response flow. 
See <https://ull-pl.vercel.app/nextra-playground/authorization/next-auth-tutorial#routes>
:::

![OAuth explained](https://ull-pl.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foauth.e8a62d80.png&w=640&q=75)

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

`File components/login-btn.jsx`

```jsx {1,4,5,8}
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

The component is used in the page `pages/auth/login.mdx`:

```js
➜  nextra-solution git:(guide) cat pages/auth/login.mdx 
import LoginBtn from '@/components/login-btn'

<LoginBtn />
```

## useSession() NextAuth React Hook

::: tip 

The [useSession()](https://next-auth.js.org/getting-started/client#usesession) React Hook in the NextAuth.js **client** is the easiest way to check if someone is signed in.

`useSession()` returns an object containing two values: `data` and `status`:

**data**: This can be three values: `Session` / `undefined` / `null`.
- when the session hasn't been fetched yet, `data` will be `undefined`
- in case it failed to retrieve the session, `data` will be `null`
- in case of success, `data` will be a `Session` object.

**status**: Is a enum mapping to three possible session states: `"loading" | "authenticated" | "unauthenticated"`

To wrap all the pages, make sure that `<SessionProvider>` is added to `pages/_app.js`.
:::

See <https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/guide/components/login-btn.jsx>

## signIn() method

::: tip
Using the client side [signIn()](https://next-auth.js.org/getting-started/client#signin) method ensures the user ends back on the page they started on after completing a sign in flow. 
**It will also handle CSRF Tokens for you automatically when signing in with email**.

By default, when calling the `signIn()` method with no arguments, you will be redirected to the NextAuth.js sign-in page. 
:::

If you want to skip that and get redirected to your provider's page immediately, call the signIn() method with the provider's id.

For example to sign in with GitHub:

```jsx {4}
import { signIn } from "next-auth/react"

export default () => (
  <button onClick={() => signIn("github")}>Sign in with GitHub</button>
)
```

The `signIn()` method receives a second argument, an object with options. 
The most common options are [callbackUrl](https://next-auth.js.org/getting-started/client#specifying-a-callbackurl) 
and [redirect](https://next-auth.js.org/getting-started/client#using-the-redirect-false-option).

### Specifying a `callbackUrl`

The **callbackUrl** specifies to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.

Examples:

```js
signIn(undefined, { callbackUrl: '/foo' }) // A relative url starting with a slash
signIn('google', { callbackUrl: 'http://localhost:3000/bar' }) // Or an absolute URL at the same host name,
signIn('email', { email, callbackUrl: 'http://localhost:3000/foo' })
signIn('credentials', { redirect: false, password: 'password' })   // Disable the redirect and handle the error on the same page.
signIn('email', { redirect: false, email: 'bill@fillmurray.com' }) // In such case signIn will return a Promise,
```

### Using the `redirect: false` option

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

## [Protecting an API Route](https://next-auth.js.org/getting-started/example#backend---api-route)

::: tip 

**getServerSession**

To protect an API Route, you can use the [getServerSession()](https://next-auth.js.org/configuration/nextjs#unstable_getserversession) method.
::: 

### pages/api/restricted.js

Here is the `pages/api/restricted.js` API route.

`➜  nextra-solution git:(guide) cat pages/api/restricted.js `

```js {1,5}
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}
```

### pages/auth/restricted.mdx

Here is the `pages/auth/restricted.mdx` page:

````md  {1}
import Restricted from '@/components/restricted'

<Restricted />

## Public content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Nullam in dui mauris. Vivamus hendrerit arcu sed 
````

### components/restricted.jsx

And here is the **client** `components/restricted.jsx` component.

`➜  nextra-solution git:(guide) cat components/restricted.jsx`

```jsx {7,9}
"use client"

import { useSession, signOut } from "next-auth/react" // https://next-auth.js.org/getting-started/client#usesession
import styles from './counters.module.css'

export default function User() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    console.error("***********Session***********")
    console.error(session)
      return (<div> 
        <br />
        <hr />
        <br />
        <h2>I want to share with you some secrets ... </h2>
        <br />
        This is the user information:
        <ul>
          <li> 
            <img src={session.user.image} alt={session.user.name} width="32" height="32" />
          </li>
          <li><span>Email: {session.user.email}</span></li>
          <li>Name: {session.user.name}</li>
        </ul>     
    </div>)
  }

  return <a href="/api/auth/signin" className={ styles.button}>Sign in</a>
}
```

That when authenticated, looks like this:

![/images/nextra/api-restricted.png](/images/nextra/api-restricted.png)


## NEXTAUTH_SECRET

This environment variable is used to encrypt the NextAuth.js JWT, and to hash [email verification tokens](https://authjs.dev/guides/creating-a-database-adapter?_gl=1*2bm1l*_gcl_au*Mjc4NTU3NDkzLjE3MzExNjEyMTEuNDQwOTc4NDgxLjE3MzMzOTI2ODcuMTczMzM5MjY4Ng..#verification-tokens).
This environment . This is the default value for the secret option in NextAuth and Middleware. 
Alternatively, you can also set `AUTH_SECRET`, which is an alias.

::: tip

The **Auth.js** cli

```bash
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) ✗ npx auth --help
Usage: auth [options] [command]

The CLI tool by Auth.js to supercharge your authentication workflows.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  ask [options]               Ask about docs, API, or auth concepts.
  init [options] [framework]  Initialize a project.
  secret [options]            Generate a random string and add it to the .env file.
  add [provider]              Register a new authentication provider
  help [command]              display help for command
```
:::

Here is an example of how to generate a secret:

```bash
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) ✗ npx auth secret --raw 
Zg6aLaJzvOLaLq+WF1kdOntYf887LU/oU8+GxQnakto=
```

Here is an example of `.env.local` file:

```bash
# When deploying to production, set the NEXTAUTH_URL environment variable to the canonical URL of your site.
NEXTAUTH_SECRET=your secret
GITHUB_ID=your id
GITHUB_SECRET=your gh secret
GITHUB_TOKEN=your gh token
```


## Middleware

The most simple usage is when you want to require authentication for your entire site. You can add a `middleware.js` file 
in the root of your project.

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat -n middleware.js`

```js 
/* 
See https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher
*/
import AuthMiddleware from "next-auth/middleware"

export const middleware = AuthMiddleware.default // To get the function. Only for nextra

export const config = { 
  matcher: ["/protected/:path*"],
}
```

Notice the `.default` at the end of the import at line 6. 

If a user is not logged in, the default behavior is to redirect them to the sign-in page.

You must set the same secret in the middleware that the one you used in the file `pages/api/auth/[...nextauth].js`
when calling `NextAuth.default(authOptions)`
The easiest way is to set the `NEXTAUTH_SECRET` environment variable. 
It will be picked up by both the `NextAuth` config, as well as the `middleware.js` config.

### pages/protected/secret.mdx

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat pages/protected/secret.mdx`

````jsx {6}
import User from '@/components/user'

import LoginBtn from '@/components/login-btn'

# Middleware Protected Secrets

- This page is protected by the middleware!
- Only authorized users can see this

<User />

<LoginBtn />
````

When you visit the page and are authenticated, you will see the page:

![/images/nextra/next-auth-middleware-protected-page.png](/images/nextra/next-auth-middleware-protected-page.png)

## [Deploying to production](https://next-auth.js.org/getting-started/example#deploying-to-production)

When deploying your site set the NEXTAUTH_URL environment variable to the canonical URL of the website.

```bash
NEXTAUTH_URL=https://example.com
```

That looks like this in Vercel:

[![/images/nextra/vercel-project-environment-variables-1.png](/images/nextra/vercel-project-environment-variables-1.png)](https://vercel.com/crguezls-projects/ull-pl-6ph6/settings/environment-variables)

![/images/nextra/vercel-project-environment-variables-2.png](/images/nextra/vercel-project-environment-variables-2.png)

<!-- Warning included material -->

!!!include(temas/web/next-auth/dynamic-protected-client.md)!!!

## [Extensibility](https://next-auth.js.org/getting-started/example#extensibility)

NextAuth.js allows you to hook into various parts of the authentication flow via their 
[built-in callbacks](https://next-auth.js.org/configuration/callbacks).

For example, to pass a value from the sign-in to the frontend, client-side, you can use a combination of the [session](https://next-auth.js.org/configuration/callbacks) and 
[jwt](https://next-auth.js.org/configuration/callbacks#jwt-callback) callback like so:

`File pages/api/auth/[...nextauth].js`

```js
...
callbacks: {
  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
}
...
```

Now whenever you call `getSession` or `useSession`, the data object which is returned will include the `accessToken` value.

`components/accessToken.jsx`

```jsx
import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data } = useSession()
  const { accessToken } = data
  return <div>Access Token: {accessToken}</div>
}
```