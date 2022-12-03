---
title: Serverless
permalink: /serverless.html
---
# {{ $frontmatter.title }}

**Serverless functions** open a world of possibilities for running **on-demand**, server-side code without having to run a dedicated server. 

netlify serverless functions are 

1. version-controlled, 
2. built, and 
3. deployed 
 
along with the rest of the Netlify site, and Netlify will automatically handles *service discovery* through their built-in API gateway. 

This eliminates overhead and brings the power of Deploy Previews[^1] and rollbacks[^2] to our functions

::: tip API Gateway
An **API gateway** is an API management tool that sits between 
* a client and 
* a collection of backend services. 
 
An API gateway acts as a reverse proxy to accept all application programming interface (API) calls, aggregate the various services required to fulfill them, and return the appropriate result.

![](/images/api-gateway.png)
:::

::: tip Netlify Serverless Functions
With Netlify Functions we can put this code into a netlify/functions folder in our project, and Netlify will deploy it for us and give us a URL which will invoke it.
:::

Functions deployed from Netlify are immutable. This means that 

* an update to a function on your production branch won’t change the version that was deployed in a branch deploy, or in a Deploy Preview

## Reading "Saving data to Supabase and getting it back again"

The article 

[Saving data to Supabase and getting it back again](https://www.netlify.com/blog/2021/06/28/saving-data-to-supabase-and-getting-it-back-again/) by Phil Hawksworth at Netlify Blog June 28, 2021

shows how to use Netlify erverless functions to save content and also to retrieve it using the Supabase database.

## References

* [Saving data to Supabase and getting it back again](https://www.netlify.com/blog/2021/06/28/saving-data-to-supabase-and-getting-it-back-again/) at Netlify Blog June 28, 2021
* [Netlify Serverless Functions](https://docs.netlify.com/functions/overview/?_ga=2.94572636.1599880915.1669995646-1446704997.1668527962)

## Footnotes

[^1]:  Deploy previews allow you to create a preview of frontend builds before they are merged into a production website. You get some preview URL of a deployment and you can see what changed and make sure it looks great.
[^2]: Traditionally, when we need to rollback, we simply fetch the .zip artifact file from a previous build, upload and unzip.  There are reasons why we cannot apply this  rollback strategy to Serverless Framework applications. Serverless Framework artifacts are not **immutable**.