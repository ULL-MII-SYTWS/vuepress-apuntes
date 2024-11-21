# Organizing Next.js Middleware

## Express Middleware Pattern

This picture summarizes the middleware pattern in Express:

![express middleware](/images/express-middleware.jpeg)

Express provides a modular way to organize middleware.

## Next.js Middleware

In Next.js, middleware is typically managed through a single `middleware.ts` (or `middleware.js`) file at the root of your project. This file is responsible for handling all middleware operations. However, you can organize your middleware logic in a modular way within this file. Let's break down how you can manage different middlewares and control their execution order:

1. Single Middleware File:
Next.js uses a single `middleware.ts` file at the root of your project. This is where all your middleware logic resides.
2. Organizing Multiple Middlewares:
While you have a single file, **you can create separate functions for different middleware operations and compose them together**.
3. Controlling Execution Order:
The order in which you call your middleware functions within the main middleware function determines their execution order.


Here's an example of how you might structure your `middleware.ts` file to handle multiple middleware functions:

`file middleware.ts`

```typescript {27-32}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware for authentication
function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Middleware for logging
function loggingMiddleware(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)
}

// Middleware for CORS
function corsMiddleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// Main middleware function
export function middleware(request: NextRequest) {
  // Execute middlewares in order
  loggingMiddleware(request)
  const authResult = authMiddleware(request)
  if (authResult) return authResult
  return corsMiddleware(request)
}

// Configure which routes use the middleware
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
```

In this example:

1. We define separate functions for different middleware operations: `authMiddleware`, `loggingMiddleware`, and `corsMiddleware`.
2. The main `middleware` function composes these individual middlewares together.
3. The order in which these functions are called in the `middleware` function determines their execution order.
4. We use the `config` export to specify which routes should use this middleware.


This approach allows you to:

- Keep your middleware logic modular and organized
- Easily control the order of middleware execution
- Selectively apply middleware to specific routes


Remember that the `middleware` function should return a `NextResponse` object or `undefined`. If it returns `undefined`, Next.js will continue the request-response cycle normally.

## Organizing Middleware using a Middleware Chain

If you need more complex middleware management, you might consider creating a middleware chain:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type MiddlewareFunction = (
  request: NextRequest,
  next: () => Promise<NextResponse | undefined>
) => Promise<NextResponse | undefined>

const createMiddlewareChain = (...middlewares: MiddlewareFunction[]) => {
  return async (request: NextRequest): Promise<NextResponse | undefined> => {
    const executeMiddleware = async (index: number): Promise<NextResponse | undefined> => {
      if (index < middlewares.length) {
        return await middlewares[index](request, () => executeMiddleware(index + 1))
      }
      return NextResponse.next()
    }
    return executeMiddleware(0)
  }
}

const authMiddleware: MiddlewareFunction = async (request, next) => {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return next()
}

const loggingMiddleware: MiddlewareFunction = async (request, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)
  return next()
}

const corsMiddleware: MiddlewareFunction = async (request, next) => {
  const response = await next()
  if (response) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  return response
}

const middlewareChain = createMiddlewareChain(
  loggingMiddleware,
  authMiddleware,
  corsMiddleware
)

export function middleware(request: NextRequest) {
  return middlewareChain(request)
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
```

This approach provides even more flexibility in managing your middleware, allowing you to easily add, remove, or reorder middleware functions as needed.

## Conclusion

While Next.js uses a single `middleware.ts` file, you have the flexibility to organize your middleware logic in a modular and maintainable way within this file. **The developer is indeed in charge of the organization and execution order of different middleware services, but with careful structuring, you can create a clean and efficient middleware system**.