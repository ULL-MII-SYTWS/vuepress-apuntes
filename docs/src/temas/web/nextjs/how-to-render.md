
# When to Use Static Generation v.s. Server-side Rendering

See section [When to Use Static Generation v.s. Server-side Rendering](https://nextjs.org/learn/basics/data-fetching/two-forms) of the Next.js tutorial:

1. You should ask yourself: "Can I pre-render this page ahead of a user's request?" 
   * If the answer is yes, then you should choose Static Generation.
   * If you cannot pre-render a page ahead of user's requests and the page content changes on every request, use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. 
   * Use client-side JavaScript to populate frequently updated data (for instance: the view changes often in terms of the user and the internet connection is slow).

![](/images/static-site-generation.png)

![](/images/server-side-rendering-2.png)

![](/images/client-side-rendering.png)