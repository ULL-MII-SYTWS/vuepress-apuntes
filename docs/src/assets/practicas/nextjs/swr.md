---
permalink: /temas/web/nextra/swr
sidebar: auto
---
# Stale While Revalidate (SWR)

**SWR (Stale-While-Revalidate)** is a data-fetching strategy used in web programming that optimizes user experience by serving stale (cached) data instantly while updating it in the background. This approach is popular in frameworks like Next.js to handle data fetching for React components, helping to achieve faster and more responsive applications.

## SWR in Web Programming

In a general web context, **SWR** is a caching and revalidation strategy where:
- **Stale** data (cached) is served immediately upon request, reducing load times and providing instant feedback to the user.
- **While revalidating**, a background fetch is triggered to update the cached data if it's outdated or missing. Once updated, the cache refreshes, and the latest data is available for future requests.

:::tip Key Points
The SWR pattern is common in situations where data does not change frequently or where the initial data doesn't need to be real-time accurate, such as dashboards, profiles, and product listings.
::: 

## SWR in Next.js with the `swr` Library

In Next.js, [SWR](https://swr.vercel.app/) is implemented [via the `swr` library](https://swr.vercel.app/), developed by Vercel (the creators of Next.js). The `swr` library provides an easy way to manage data fetching with React hooks, using the SWR caching strategy under the hood. Here’s how it works in Next.js:

### Installation

```bash
npm install swr
```

### Usage Example

The `useSWR` hook is used to fetch data, handle caching, and revalidation. Here’s an example:

```javascript
import useSWR from 'swr';

// Define a fetcher function to handle data fetching
const fetcher = (url) => fetch(url).then((res) => res.json());

function UserProfile() {
  // Pass the API endpoint and fetcher function to useSWR
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Hello, {data.name}</div>;
}
```

In this example:
- `useSWR` takes the URL and a `fetcher` function to handle the request.
- It returns the `data`, `error`, and `loading` states for easy handling.
- **SWR pattern** ensures that the data is served instantly from the cache while re-fetching in the background to keep it fresh.

### Benefits of SWR in Next.js
- **Automatic Caching**: Caches the result of each request and uses it for subsequent renders.
- **Real-time Updates**: Background revalidation keeps data up-to-date without blocking UI.
- **Error Handling and Loading States**: Handles error and loading states by default, simplifying code.

### When to Use SWR in Next.js

SWR is best used in client-side data fetching scenarios, such as:
- When displaying user profiles, comments, or posts where data changes infrequently.
- For cases where instant feedback is beneficial, even if the data isn't perfectly current.

For Next.js, SWR is a valuable tool for building responsive, fast, and user-friendly applications by optimizing how data is fetched and updated in real-time.

## SWR in Nextra

Here is a simple example of how to use SWR in a Nextra project:

First, in a file `components/dcat.jsx` in our Nextra project we write this component:

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

The API of `useSWR` is: 

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options)
``` 

The `key` param in `useSWR(key, fetcher, options)`  it actually is a **key**. 
It is a unique string that represents the data that is being fetched. If the key changes, the data will be refetched.

The `fetcher` function is a function that fetches the data. 
It should return a promise that resolves to the data, that is why we use 
`fetch(catURL).then((res) => res.json())`. 

[The `options` object is an optional object](https://swr.vercel.app/docs/api#options) that can be used to configure the behavior of the SWR hook.
Here we set `revalidateOnFocus` to `false` to avoid revalidating the data when the window regains focus.

The **return Values** are:

- `data`: data for the given key resolved by fetcher (or `undefined` if not loaded)
- `error`: error thrown by fetcher (or `undefined`)
- `isLoading`: if there's an ongoing request and no "loaded data". Fallback data and previous data are not considered "loaded data"
- `isValidating`: if there's a request or revalidation loading
- `mutate(data?, options?)`: function to mutate the cached data ([details](https://swr.vercel.app/docs/mutation))

More information can be found [here](https://swr.vercel.app/docs/advanced/understanding).

Once we have defined the `DCat` component, we can use it in a Nextra MDX file:

````markdown
## SWR

import DCat from '../components/dcat'

<DCat />

````
