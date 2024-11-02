## Examples of Nextra Sites

- See the nextra documentation in the [nextra/docs](https://github.com/gh-cli-for-education/nextra/tree/casiano/docs) folder at branch `casiano` at the fork [gh-cli-for-education/nextra](https://github.com/gh-cli-for-education/nextra/) of the original [/shudding/nextra](https://github.com/shuding/nextra) repo. 
- See the [Folder examples](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples) at branch `casiano` at the fork [gh-cli-for-education/nextra](https://github.com/gh-cli-for-education/nextra/) containing:
  - [blog](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/blog)
  - [docs](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/docs)
  - [swr-site](https://github.com/gh-cli-for-education/nextra/tree/casiano/examples/swr-site) 
  - See my comments in the [README.md](https://github.com/gh-cli-for-education/nextra/blob/casiano/README.md#development-1) on how to serve locally those examples.
- The [PL site](https://ull-pl.vercel.app/) deploy from repo [crguezl/pl-nextra](https://github.com/crguezl/pl-nextra/)
- [GraphQL site](https://github.com/graphql/graphql.github.io/tree/source) and its deployment [GraphQL](https://graphql.org/)
- [Nextra ShowCase](https://nextra.site/showcase): A list of open source projects powered by Nextra

## Actual SWR Site 

See also the actual SWR site:

- [vercel/swr-site](https://github.com/vercel/swr-site)

**SWR (`stale-while-revalidate`** is a cache invalidation strategy) is a React Hooks library for remote data fetching. 

To see an example of use, you can go to the [PL site](https://ull-pl.vercel.app/) and have a look at the component [teams.jsx](https://github.com/crguezl/pl-nextra/blob/main/components/teams.jsx) file[^credentials].

`/components/teams.jsx`

```jsx
import styles from './counters.module.css'
import useSWR from 'swr'
import { Link } from 'nextra-theme-docs';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Teams() {
    const { data, error } = useSWR('/api/getteams', fetcher)

    if (error) return <div>Failed to load {error}</div>
    if (!data) return <div>Loading...</div>

    if (data?.teams?.length) return (
        <div>
            <p>{data.teams.length} Teams</p>
            <ul className={styles.uList}>
                {
                   data.teams.map(t => (
                      <li key={t.name}>
                          <Link href={t.url}>{t.name}</Link>
                          <span> - </span>
                          <Link href={t.url+"/repositories"}>Repos</Link>
                      </li>)
                )
                }
            </ul>
        </div>
    )
    return 'Sign in to see your teams';
}
```

That looks like this:

[![images/nextra/swr-pl-teams.png](/images/nextra/swr-pl-teams.png)](https://ull-pl.vercel.app/user)

[^credentials]: Remember to have the credentials updated in the `.env.local` file and the Vercel environment variables of the project or it will crash.

## Tutorial en PL

Un  tutorial del profesor está en:

- <a href="https://ull-pl.vercel.app/nextra-playground" target="_blank">Learning and Playing with Nextra</a>.

::: warning
Mis apuntes de PL han sido hechos con la versión 2.13 de nextra. La versión a 2024-10 de nextra es la 3.1.

En los apuntes de PL (2024-10): 

```
➜  pl2324-apuntes git:(main) ✗ npm ls nextra
pl-nextra@0.0.2 /Users/casianorodriguezleon/campus-virtual/2324/pl2324/pl2324-apuntes
├─┬ nextra-theme-docs@2.13.2
│ └── nextra@2.13.2 deduped
└── nextra@2.13.2
```

En su tarea será algo así:

```
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(main) ✗ npm ls nextra
nextra-docs-template@1.0.0 /Users/casianorodriguezleon/campus-virtual/2425/sytws2425/practicas/nextra/nextra-casiano-rodriguez-leon-alu0100291865
├─┬ nextra-theme-docs@3.1.0
│ └── nextra@3.1.0 deduped
└── nextra@3.1.0
```
:::

Véase el blog de Dimitri Postolov [Nextra 3 – Your Favourite MDX Framework, Now on 🧪 Steroids](https://the-guild.dev/blog/nextra-3) for a list of the changes.

