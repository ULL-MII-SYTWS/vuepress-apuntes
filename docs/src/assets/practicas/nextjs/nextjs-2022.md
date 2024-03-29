---
sidebar: auto
---
# Building a Node.JS OpenAI (3.0) app with NextJS (12.1)

## Introduction 

In this lab we will build a "pet name generator web app" wich will be described in this tutorial.
The OpenAI API [quickstart tutorial](https://beta.openai.com/docs/quickstart?context=node) refers to the current version of the OpenAI API and no longer 
describes this app.  
 
You can see a solution deployed at netlify:  <https://nextjs-oai.netlify.app/>

The code uses [Next.js](https://nextjs.org/) framework version 12 with [React](https://reactjs.org/) version 17 and OpenAI npm module version 3:

```
➜  nextjs-solution git:(main) ✗ jq '.dependencies' package.json
```
```json
{
  "next": "^12.1.6",
  "openai": "^3.0.0",
  "react": "17.0.2",
  "react-dom": "17.0.2"
}
```

[Next.js](https://nextjs.org/learn/foundations/about-nextjs) is a framework on top of React that handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.


* OpenAI API [quickstart tutorial Node.js example](https://github.com/openai/openai-quickstart-node).  
* Or repo [ULL-MII-SYTWS/nextjs-solution](https://github.com/ULL-MII-SYTWS/nextjs-solution/)
 
You can see a solution deployed at netlify:  <https://nextjs-oai.netlify.app/>

The code uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). 

## First Steps

See section [OpenAI First Steps](/openai-first-steps) in this tutorial.

## Setup

See section [Set up and run](/nextjs/setup-and-run) in this tutorial.


## Web Development with Next.js

See section [Web Development with Next.js](/web-development-with-nextjs) in this tutorial.

## Exercise: Deploy at Netlify

Deploy the app at Netlify. 
For the details, see section [Deploying a Next.js app to Netlify](/nextjs/netlify-deployment) in this tutorial.


## Exercise: Deploy the app to Vercel

Deploy the app at Vercel. 
Follow the instructions at the tutorial [Deploying to Vercel](/nextjs/vercel-deployment) in this tutorial.



## Exercise: Get images from OpenAI


Add routes to the app:

- On the first route  `/pet`  leave the current service
- On the second route `/image`add functionality to get an image from OpenAI and display it in the page.
- Update the landing page and navigation links
- Add a 404 page
- Consider the opportunity to solve it using a dynamic route

The youtube video *Build An AI Image Generator With OpenAI & Node.js* can help:

<youtube id="fU4o_BKaUZE"></youtube>

## Exercise: Implement the Prompt Engineering Agent

Implement the prompt engineering agent described in previous lab [prompt engineering](/practicas/prompt-engineering)

## References

* [Netlify](https://www.netlify.com/)
* [Next.js](https://nextjs.org/)
  * [Next.js Foundations](https://nextjs.org/learn/foundations/about-nextjs)
* [React](https://reactjs.org/)
* [Netlify CLI](https://docs.netlify.com/cli/get-started/?_ga=2.210632407.351830897.1670331128-1485033729.1667990322#link-with-an-environment-variable) 
* [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#app)
* [Deploying a Next.js app to Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel) 
  * [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)
* A solution deployed at netlify <https://nextjs-oai.netlify.app/>
  * [A repo with a solution](https://github.com/ULL-MII-SYTWS/nextjs-solution/)
* Here is YouTube video explaining a project similar to the one described in this lab: [Build An AI Image Generator With OpenAI & Node.js](https://youtu.be/fU4o_BKaUZE)
* Repo [ULL-MII-SYTWS/nextjs-dynamic-routes](https://github.com/ULL-MII-SYTWS/nextjs-dynamic-routes)
* [NextJS official examples folderx](https://github.com/vercel/next.js/tree/canary/examples/)  
