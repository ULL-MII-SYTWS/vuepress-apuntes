---
permalink: /temas/web/nextra/swr
---
# Stale While Revalidate (SWR)

SWR, which stands for Stale-While-Revalidate, works by 

1. First returning the data from the cache (stale), 
2. Then sending the **fetch** request (revalidate), and 
3. Finally coming with the up-to-date data.

Here is a simple example of how to use SWR in a Nextra project:

```js
import useSWR from 'swr'
import Image from 'next/image'

const catURL=  "https://api.thecatapi.com/v1/images/search?size=full"

const key = catURL; 
const fetcher = () => fetch(catURL).then((res) => res.json())
const options = { revalidateOnFocus: false }

export default function Cat() {
  const { data, isLoading, error } = useSWR(key, fetcher, options);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return <img src={data[0].url} width={data[0].width} height={data[0].height}/>
}
```

The `key` param in `useSWR(key, fetcher, options)`  it actually is a **key**. 
It is a unique string that represents the data that is being fetched. If the key changes, the data will be refetched.

Here is a way to use the `Cat` component in a MDX file in Nextra:

````markdown
## SWR

import DCat from '../components/dcat'

<DCat />

````
