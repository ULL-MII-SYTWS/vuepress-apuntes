---
title: "Web Development with NextJS"
published: true
date: "2023/12/10"
campus: "https://campusdoctoradoyposgrado2324.ull.es/mod/assign/view.php?id=4075&forceview=1"
delivery: "2023/12/22"
layout: Practica
order: 22 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/prompt-engineering.md # /practicas/event-emitters.md
next: /practicas/nextjs # jq-exercises.md
permalink: /practicas/nextjs13
key: nextjs13
removed:
   - "Site deployed at netlify and Vercel"
   - "REST answers to exercises are correct"
   - "Exercise Dynamic Routes reported"
   - "Exercise get images reported"
   - "Exercise prompt engineering agent reported"
   - "Report is correct and complete"
   - "Kanban Board Project reflects the rubric issues"
rubrica:
   - "Code of the lab is correct and works"
   - "The chat bot with tools is working"
   - "The .zip has been delivered on the campus"
---

# {{ $frontmatter.title }}

- [{{ $frontmatter.title }}](#-frontmattertitle-)
  - [Goals](#goals)
  - [Web Development with Next.js](#web-development-with-nextjs)
  - [Exercise: Deploy at Netlify](#exercise-deploy-at-netlify)
  - [Exercise: Deploy the app to Vercel](#exercise-deploy-the-app-to-vercel)
  - [References](#references)

## Goals

This labs intends to introduce to the current version (2023) of NextJS: NextJS 14. For that you have to follow the tutorial:

* [Next.js 13 Crash Course Tutorial #1 - Introduction & New Features](https://youtu.be/PbFH_VE1Iks?si=1EnwQwDvej_cFKcv) "Next.js Master Class" YouTube list by The Net Ninja
  * See repo [iamshaunjp/nextjs-masterclass](https://github.com/iamshaunjp/nextjs-masterclass/)
* [Differences between Next.js 13 and 14](/nextjs/differences-13-14)

For each `lesson-#` in the tutorial:, 

- Create a branch `learn-#` from `lesson-#` and push your code in it.
- Fill a report in the `README.md` of each branch `learn-#` summarizing your experience along the lesson.
- Create a new [orphan branch](/assets/practicas/nextjs13/orphan.md) `learn-next-ai` and use it to follow the tutorial at repo <https://github.com/ULL-prompt-engineering/vercel-sdk-ai-quickstart> which it is based on the Vercel AI SDK [Quickstart Guide](https://sdk.vercel.ai/docs/getting-started). It shows you how to use streaming to build a prompt engineering agent.


## Web Development with Next.js

See section [Web Development with Next.js](/web-development-with-nextjs) in this tutorial.

## Exercise: Deploy at Netlify

Deploy the app at Netlify. 
For the details, see section [Deploying a Next.js app to Netlify](/nextjs/netlify-deployment) in this tutorial.


## Exercise: Deploy the app to Vercel

Deploy the app at Vercel. 
Follow the instructions at the tutorial [Deploying to Vercel](/nextjs/vercel-deployment) in this tutorial.


## References

* [Netlify](https://www.netlify.com/)
* [Next.js](https://nextjs.org/)
  * The official docs of NextJS  are here <https://nextjs.org/docs>
* [React](https://reactjs.org/)
* [Netlify CLI](https://docs.netlify.com/cli/get-started/?_ga=2.210632407.351830897.1670331128-1485033729.1667990322#link-with-an-environment-variable) 
* [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/#app)
* [Deploying a Next.js app to Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel) 
  * [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website)
* A solution deployed at netlify <https://nextjs-oai.netlify.app/>
  * [A repo with a solution](https://github.com/ULL-MII-SYTWS/nextjs-solution/) to the lab ["OpenAI and Next.js"](/practicas/nextjs/)
* Repo [ULL-MII-SYTWS/nextjs-dynamic-routes](https://github.com/ULL-MII-SYTWS/nextjs-dynamic-routes) (Next.js 12 and React 17)
* [NextJS official examples folderx](https://github.com/vercel/next.js/tree/canary/examples/)  
