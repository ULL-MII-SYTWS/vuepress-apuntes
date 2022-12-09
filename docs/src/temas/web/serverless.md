---
title: Introduction to Serverless
---
# {{ $frontmatter.title }}

## Serverless Functions

A serverless function is essentially a piece of business logic (it can be a module) that is going to run in the backend and has these properties: 

1. Is **stateless** (does not maintain data) and 
2. Is **ephemeral** (is used and destroyed), as it potentially only lasts for seconds, and
3. Is designed to be **triggered by an API call** that happens in the front end. Examples are: 
   * placing an e-commerce order, 
   * uploading a text file and 
   * signing up for a newsletter, etc.


To create a serverless function, a developer has to write the function code and deploy it to an environment like Netlify or Vercel.

::: tip Serverless function workflow

A typical serverless function process would look like this:

1. The developer:
   1.   **Writes a function**: writes a function that fulfills a specific purpose in the application code, such as a form mailer.
   2.   **Defines an event**: defines an event that will trigger the cloud-native service provider to execute the function. An HTTP request is a common example.
2. During running time:
   1. **Event Triggers**: An **user** triggers the event with the click of a button or some similar action.
   2. **Deploying and execution of the function**: Netlify starts a new instance of the function if one isn’t already running.
   3. **Response**: The result is passed to the client
  
![](/images/how-do-serverless-functions-work.png)

:::

**Serverless functions** open a world of possibilities for running **on-demand**, server-side code without having to run a dedicated server. 

::: tip With Netlify Functions we can 
1. put code into a `netlify/functions` folder (i.e `netlify/functions/hello-world.js`) in our project, and 
2. Netlify will deploy it for us and 
3. give us a URL (`/.netlify/functions/hello-world`) which will invoke it.
::: 

Functions deployed from Netlify are **immutable**[^2]. This means that 

* an update to a function on your production branch won’t change the version that was deployed in a branch deploy, or in a Deploy Preview

Netlify serverless functions are 

1. version-controlled, 
2. built, and 
3. deployed 
 
along with the rest of the Netlify site, and Netlify will automatically handles **service discovery** through their built-in **API gateway**. 

This eliminates overhead and brings the power of Deploy Previews[^1] and rollbacks[^2] to our functions

### References

* [What Are Serverless Functions?](https://www.splunk.com/en_us/data-insider/what-are-serverless-functions.html) 2021


## What is an API Gateway

::: tip API Gateway
An **API gateway** is an API management tool that sits between 
* a client and 
* a collection of backend services. 
 
An API gateway acts as a reverse proxy to accept all application programming interface (API) calls, aggregate the various services required to fulfill them, and return the appropriate result.

![](/images/api-gateway.png)
:::

## What is a Service Discovery

::: tip Service Discovery
Services typically need to call one another.
In a traditional distributed system deployment, services run at fixed, well known locations (hosts and ports) and so can easily call one another using HTTP/REST or HTTP/GraphQL or some RPC mechanism **but** on a modern microservice application like the Netlify one, each serverless function  runs in virtualized/containerized environment and so the number of instances of a service and their locations changes dynamically and that is why an additional service discovery must be provided. 

[![](/images/discovery-problem.jpg)](https://microservices.io/patterns/client-side-discovery.html)
:::

## Watching the course Up and Running with Serverless Functions with Ben Hong

Here is the course:

* [Up and Running with Serverless Functions with Ben Hong](https://explorers.netlify.com/learn/up-and-running-with-serverless-functions)
* See also repo [ULL-MII-SYTWS/netlify-serverless-functions-intro-solution#edit-netlifyfunctionshello-worldjs](https://github.com/ULL-MII-SYTWS/netlify-serverless-functions-intro-solution#edit-netlifyfunctionshello-worldjs)


## Anya Kubov Tutorial on Netlify Serverless Functions

Watch  *Create your first Netlify Serverless Function!* by Anya Kubów

* Create your first Netlify Serverless Function! by Anya Kubów. 2 Mar 2021 
  
  <youtube id="n_KASTN0gUE"></youtube>


Watch also *How to use a Serverless Database with Serverless Functions (simple!)* by Anya Kubów

* How to use a Serverless Database with Serverless Functions (simple!) by Anya Kubów.  24 Mar 2021 
  
  <youtube id="4JK1XmqLqnw"></youtube> 

## Reading "Saving data to Supabase and getting it back again"

Read the article [Saving data to Supabase and getting it back again](https://www.netlify.com/blog/2021/06/28/saving-data-to-supabase-and-getting-it-back-again/) by Phil Hawksworth at Netlify Blog June 28, 2021

shows how to use Netlify serverless functions to save content and also to retrieve it using the Supabase database.

## References

* [Up and Running with Serverless Functions with Ben Hong](https://explorers.netlify.com/learn/up-and-running-with-serverless-functions)
* [What Are Serverless Functions?](https://www.splunk.com/en_us/data-insider/what-are-serverless-functions.html) 2021
* [Saving data to Supabase and getting it back again](https://www.netlify.com/blog/2021/06/28/saving-data-to-supabase-and-getting-it-back-again/) at Netlify Blog June 28, 2021
* [Netlify Serverless Functions](https://docs.netlify.com/functions/overview/?_ga=2.94572636.1599880915.1669995646-1446704997.1668527962)
* Repo example of [Ecommerce Store with Netlify Functions, Nuxt, Vue and Stripe](https://github.com/sdras/ecommerce-netlify)
  * Stripe: [Guías de inicio rápido sobre entornos de desarrollo](https://stripe.com/docs/development/quickstart?lang=node)
  * [Stripe Pricing And Fees (2022 Guide)](https://www.forbes.com/advisor/business/services/stripe-pricing-fees/)

## Footnotes

[^1]:  **Deploy previews** allow you to create a preview of frontend builds before they are merged into a production website. You get some preview URL of a deployment and you can see what changed and make sure it looks great.
[^2]: In traditional web apps, when we need to **rollback**, we simply fetch the .zip artifact file from a previous build, upload and unzip.  There are reasons why we cannot apply this  rollback strategy to Serverless Framework applications. Serverless Framework artifacts are not **immutable**.
