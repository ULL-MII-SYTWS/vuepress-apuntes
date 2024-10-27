---
prev: /practicas/nextra.md
next: mdx.md
---
# Nextra: Comented reading of "Get Started tutorial"
These are my comments on the [Get Started Tutorial of Nextra for the docs theme](https://nextra.site/docs/docs-theme/start).
Read the original tutorial for a complete guide.

> Nextra Docs Theme is a theme that includes almost everything you need to build a
> modern documentation website. It includes a top navigation bar, a search bar, a
> pages sidebar, a TOC sidebar, and other built-in components.

> This website itself is built with the Nextra Docs Theme.

## Quick Start from Template

### Deploy to Vercel

You can start by creating your own Nextra site and deploying to Vercel by
clicking the link:

[![](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fshuding%2Fnextra-docs-template&showOptionalTeamCreation=false)

Here is the actual code [for the button](https://github.com/shuding/nextra/blob/main/docs/pages/docs/docs-theme/start.mdx#quick-start-from-template) above:

```markdown
You can start by creating your own Nextra site and deploying to Vercel by
clicking the link:

[![](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fshuding%2Fnextra-docs-template&showOptionalTeamCreation=false)
```

It is a request to Vercel with path `/new/clone`
and two query parameters: `s` and `showOptionalTeamCreation`.

- `s=https%3A%2F%2Fgithub.com%2Fshuding%2Fnextra-docs-template`: This query parameter specifies the source repository to clone, URL-encoded.
- `showOptionalTeamCreation=false`: This query parameter likely controls whether the optional team creation step is shown during the deployment process.

> Vercel will fork the [Nextra Docs template](https://github.com/shuding/nextra-docs-template) and
> deploy the site for you. Once done, every commit in the repository will be
> deployed automatically.


This worked smoothly. I was able to deploy the site to Vercel with a single click.

### Fork the Template

> You can also manually fork the [template repository](https://github.com/shuding/nextra-docs-template).

I forked the template but there were errors when running `npm run dev`. Seems to be out of sync
with the current version of Nextra. Currently (October 2024) nextra-docs-template's files correspond to nextra@v2.

```sh
➜  nextra-docs-template git:(main) node --version
v20.5.0
➜  nextra-docs-template git:(main) npm run dev
> nextra-docs-template@0.0.1 dev
> next dev
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /Users/casianorodriguezleon/campus-virtual/2223/
```

See [issue 85](https://github.com/shuding/nextra-docs-template/issues/85) for more details.


This is due to the fact that the `package.json` file of the template uses the latest version of Nextra:

```js
➜  nextra-docs-template git:(main) jq '.dependencies' package.json 
{
  "next": "^13.0.6",
  "nextra": "latest",
  "nextra-theme-docs": "latest",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```
If we replace the `"latest"`  with older enough versions of `nextra` and `nextra-theme-docs`:


```js
➜  nextra-docs-template git:(main) jq '.dependencies' package.json
{
  "next": "^13.0.6",
  "nextra": "^2.13.2",
  "nextra-theme-docs": "^2.13.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

we can run the site with no problems:

```sh
➜  nextra-docs-template git:(main) ✗ npm i
added 407 packages, and audited 408 packages in 26s
➜  nextra-docs-template git:(main) ✗ npm run dev
> nextra-docs-template@0.0.1 dev
> next dev
 ⚠ Port 3000 is in use, trying 3001 instead.
 ⚠ Port 3001 is in use, trying 3002 instead.
/bin/sh: pnpm: command not found
  - Local:        http://localhost:3002
 ✓ Ready in 4.2s
```

## Start as New Project


### Install

To create a Nextra Docs site manually, you have to install **Next.js**,
**React**, **Nextra**, and **Nextra Docs Theme**. In your project directory, run
the following command to install the dependencies:

```sh 
npm i next react react-dom nextra nextra-theme-docs
```

::: tip
  If you already have Next.js installed in your project, you only need to
  install `nextra` and `nextra-theme-docs` as the add-ons.
:::

Add the following scripts in `package.json`:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

You can either start the server with, for example if you use npm, `npm run dev`,
which will run in development mode or `npm run build && npm run start` for
production mode.

::: warning
>  If you're not familiar with Next.js, note that development mode is
>  significantly slower since Next.js compiles every page you navigate to.

Below I visited several pages `/`, `/another`, `/advanced` ...  

See the seconds it took to compile the pages:

```sh 
$ git:(main) ✗ npm run dev
> nextra-docs-template@1.0.0 dev
> next
 ⚠ Port 3000 is in use, trying 3001 instead.
   automatically enabled Fast Refresh for 2 custom loaders
  ▲ Next.js 13.5.7
  - Local:        http://localhost:3001

 ✓ Ready in 2.5s
 ○ Compiling /another ...
 ✓ Compiled / in 17.4s (3228 modules)
 ✓ Compiled /advanced in 1676ms (3232 modules)
 ```

while for the  `build` you spent quite some time (58.57s) but you compile the pages only once:

```sh
$ git:(main) ✗ time npm run build

> nextra-docs-template@1.0.0 build
> next build

 ✓ Linting and checking validity of types    
 ✓ Creating an optimized production build    
 ✓ Compiled successfully
 ✓ Collecting page data    
 ✓ Generating static pages (7/7) 
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (pages)                              Size     First Load JS
┌ ○ / (557 ms)                             921 B           158 kB
├   /_app                                  0 B             153 kB
├ ● /_meta (426 ms)                        243 B           153 kB
├ ○ /404                                   182 B           153 kB
├ ○ /advanced (567 ms)                     632 B           158 kB
├ ○ /advanced/satori (568 ms)              683 B           158 kB
└ ○ /another (556 ms)                      1.16 kB         159 kB
    └ css/a0786626dbb3c2b6.css             103 B
+ First Load JS shared by all              164 kB
  ├ chunks/framework-fae63b21a27d6472.js   45.3 kB
  ├ chunks/main-62fd3c3c50364411.js        37.9 kB
  ├ chunks/pages/_app-2d201a800532b826.js  67.9 kB
  ├ chunks/webpack-c91f5c1fd288e648.js     1.84 kB
  └ css/6e6c3cf0db55a30a.css               11.1 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

npm run build  58,57s user 8,77s system 193% cpu 34,798 total
```

But the `start` is quite fast and there is no recompile of the pages.

And now you can `start` the server:

```sh
$ git:(main) ✗ npm run start
> nextra-docs-template@1.0.0 start
> next start
  ▲ Next.js 13.5.7
  - Local:        http://localhost:3000
 ✓ Ready in 817ms
```
:::

::: danger Finding a Port in Use and Killing the Process
If you find a port is in use, you can find the process with `lsof -i :3000` and then kill it with `kill -9 PID`:

```sh
$ git:(main) ✗ npm run start
 ⨯ Failed to start server
Error: listen EADDRINUSE: address already in use :::3000
$ git:(main) ✗ lsof -i :3000
COMMAND   PID                 USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    20891 casianorodriguezleon   20u  IPv6 0xf56f570bd023d5de      0t0  TCP *:hbci (LISTEN)
$ git:(main) ✗ kill -9 20891
$ git:(main) ✗ lsof -i :3000
```

`lsof` (Lista de archivos abiertos, en español) es una herramienta de monitorización Unix 
que se utiliza para mostrar todos los archivos que están abiertos por algún proceso, 
incluyendo los sockets de red abiertos, tuberías, etc. La opción  `-i` lista los sockets abiertos.

An Internet address is specified in the form (Items in square brackets are optional.):


            [46][protocol][@hostname|hostaddr][:service|port]

where:
- **46** specifies the IP version, IPv4 or IPv6 that applies to the following address. '6' may be be specified only if the UNIX dialect supports IPv6.  If neither '4' nor '6' is specified, the following address applies to all IP versions.
- **protocol** is a protocol name - TCP, UDP
- **hostname** is an Internet host name.  Unless a specific IP version is specified, open network files associated with host names of all versions will be selected.
- **hostaddr** is a numeric Internet IPv4 address in dot form; or an IPv6 numeric address in colon form, enclosed in brackets, if the UNIX dialect supports IPv6.  When an IP version is selected, only its numeric addresses may be specified.
- **service** is an /etc/services name - e.g., smtp - or a list of them.
- **port** is a port number, or a list of them.

Example:
  
```sh
➜  docs git:(main) ✗ lsof -i @localhost:3000-3004                    
COMMAND     PID                 USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google     1393 casianorodriguezleon   54u  IPv6 0x1574da25a717e5c5      0t0  TCP localhost:61701->localhost:exlm-agent (ESTABLISHED)
Google     1393 casianorodriguezleon   87u  IPv6 0xbfcd493dfd046e84      0t0  TCP localhost:61238->localhost:hbci (ESTABLISHED)
node      11268 casianorodriguezleon   24u  IPv6 0xa9d1776311b89c55      0t0  TCP localhost:hbci->localhost:61238 (ESTABLISHED)
node      65745 casianorodriguezleon   43u  IPv6  0x853056edac00b72      0t0  TCP localhost:exlm-agent->localhost:61701 (ESTABLISHED)
```
::: 

### Add Next.js Config

> Create the following `next.config.js` file in your project’s root directory:

```js 
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

module.exports = withNextra()

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
```

> With the above configuration, Nextra can handle Markdown files in your Next.js
> project, with the specified theme. Other Nextra configurations can be found in
[Guide](https://nextra.site/docs/guide).

Véanse los ejemplos:

- [/swr-site/next.config.js](https://github.com/shuding/nextra/blob/main/examples/swr-site/next.config.js)
- [/pl-nextra/next.config.js](https://github.com/crguezl/pl-nextra/blob/main/next.config.js#L1-L22)
  
### Create Docs Theme Config

Lastly, create the corresponding `theme.config.jsx` file in your project’s root
directory. This will be used to configure the Nextra Docs theme:

```jsx 
export default {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: 'https://github.com/shuding/nextra'
  }
  // ... other theme options
}
```

Full theme configurations can be found
[here](https://nextra.site/docs/docs-theme/theme-configuration).

### Ready to Go!

Now, you can create your first MDX page as `pages/index.mdx`:

```md
# Welcome to Nextra

Hello, world!
```

And run the `next` or `next dev` command specified in `package.json`to start
developing the project! 🎉



Next, check out 

1. The [MDX section](mdx)
2. the [Page Configuration section](https://nextra.site/docs/docs-theme/page-configuration) in the Nextra docs 
to learn about organizing the documentation structure and configuring the website theme:

