## Building Dynamic mdx with Nextra

The following example shows how to build dynamic content with Nextra using the `buildDynamicMDX` function, the `RemoteContent` component and 
a `getStaticProps` function.


`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat pages/dynamic-mdx.mdx`

```js
import Cat from '@/components/dcat'
import { RemoteContent } from 'nextra/components'
import { buildDynamicMDX } from 'nextra/remote'


export async function getStaticProps() {
  const randomURL = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=5'
  const fetcher = () => fetch(randomURL).then(res => res.json())

  const title = `# buildDynamicMDX and RemoteContent`
  const section1 = `## Example of dynamic MDX\nWe write a \`getStaticProps\` function to fetch the content of the \`mdx\` files and then we use \`RemoteContent\` and \`buildDynamicMDX\` to build the \`mdx\` content.` // Some fetched content
  const res = (await fetcher()).join('\n- ')
  const section2 = `## A cat\n\n  <Cat />\n\n## Random numbers\n\n- ${res}`   // More fetched content

  const props = await buildDynamicMDX(`
${title}

${section1}

${section2}
  `)
  props.__nextra_dynamic_opts.frontMatter.test= '4'
  return { props }
}

<RemoteContent components={{ Cat }} />
```

Notice that we are using the dynamic cat component (`useSWR`).
The image of the cat changes with each reload even if we are using `next start` but the random numbers do not.

### RemoteContent

The `RemoteContent` component is used to render the dynamic content. 

```jsx
<RemoteContent components={{ Cat }} />
```

The `components` prop is used to pass the components that will be used in the dynamic content.

### buildDynamicMDX

The `buildDynamicMDX` function is used to build the dynamic content. It calls the markdown compiler
and returns the compiled content and the frontMatter.

```js
export async function buildDynamicMDX(content: string, compileMdxOptions) {
  const { result, frontMatter, title } = await compileMdx(content, compileMdxOptions)

  return {
    __nextra_dynamic_mdx: result,
    __nextra_dynamic_opts: { frontMatter, title }
  }
}
```

See also [An Example of Remote Docs Fetched from GitHub](https://the-guild.dev/blog/nextra-3#remote-docs-support) inside the blog 
*Nextra 3 – Your Favourite MDX Framework, Now on 🧪 Steroids*


## getStaticProps

When visiting this page, the `getStaticProps` function
fetches the cat image at build time and returns the props to the page.

Even if we are using `next start`, the image of the cat does not change with each reload.


`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(allrepos) cat pages/get-static-props.mdx`

```jsx
import { useData } from 'nextra/hooks'

export async function getStaticProps() {
  // Hacer una solicitud de datos en tiempo de compilación
  const catURL=  "https://api.thecatapi.com/v1/images/search?size=full"
  const res = await fetch(catURL);
  const cats = await res.json();

  return {
    props: { // We add an `ssg` field to the page props, which will be provided to the Nextra `useData` hook.
      ssg: {
        cats: cats
      }
    },
    // The page will be considered as stale and regenerated every 60 seconds.
    revalidate: 60
  };
}

export function Cats() {
  const { cats } = useData()
  return (
    <div>
      <ul>
        {cats.map(cat => (
          <li key={cat.id}><img src={cat.url} width={cat.width} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

````md
## Cats

<Cats />

````
