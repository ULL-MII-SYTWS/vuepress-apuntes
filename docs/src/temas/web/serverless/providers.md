* [Hello World on Netlify Functions, Cloudflare Workers, & Vercel Functions](https://dev.to/katiekodes/hello-world-on-netlify-functions-cloudflare-workers-vercel-functions-c94)

## Cloudflare Workers

* **Filename:** n/a
* **Access URL pattern:** `https://hello-world.example.workers.dev/` or `https://hello-world.example.workers.dev/?name=Katie`
* **Setting up the base URL name `example` in Cloudflare:** Web-based user interface
* **Setting up the base URL name `hello-world` in Cloudflare:** Web-based user interface
* **Deployment to Cloudflare:** Edit code in the web-based user interface

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const name = new URL(request.url).searchParams.get('name') || "World";
  return new Response(`Hello, ${name}`, {status: 200})
}
```