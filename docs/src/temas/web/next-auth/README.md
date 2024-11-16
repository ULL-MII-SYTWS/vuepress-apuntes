---
sidebar: auto
permalink: /next-auth
---

# Next-auth

## Middleware

Middleware allows you to run code before a request is completed. 
Then, based on the incoming request, you can modify the response by 
rewriting, redirecting, modifying the request or response headers, or responding directly.

Use the file `middleware.ts` (or `middleware.js`) in the root of your project to define 
Middleware. 
For example, at the same level as `pages` or `app`, or inside `src` if applicable.

File `/middleware.js`

```js  showLineNumbers copy
export { default } from "next-auth/middleware"

export const config = { matcher: ["/clases", "/labs"] }
```

When we want to secure certain pages, we export a `config` object with a `matcher` property.
Now we will still be able to visit every page, but only `/clases` and `/labs` will require authentication
but I can visit `/topics`.

On platforms like Vercel, Middleware is run at the [Edge][edge]

[edge]: https://nextjs.org/docs/api-reference/edge-runtime

::: tip Edge
[Edge][edge] servers are distributed to multiple locations around the world. Unlike CDNs, which store static content, Edge servers can run small snippets of code. Edge computing supports not only transmitting cached data but other types of computing like live streaming and gaming. 
::: 

- See the section [Middleware](https://next-auth.js.org/configuration/nextjs#middleware) on the next-auth.js docs
- See also <https://next-auth.js.org/configuration/nextjs#basic-usage>
- Midleware in Next.js: <https://nextjs.org/docs/pages/building-your-application/routing/middleware>

## Pages

NextAuth.js automatically creates simple, unbranded authentication pages for handling 
Sign in, Sign out, Email Verification and displaying error messages.

To add a custom login page, you can use the pages option:

```js
pages/api/auth/[...nextauth].js
...
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
...
```

