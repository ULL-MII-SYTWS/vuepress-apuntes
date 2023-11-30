---
title: "Prompt Engineering with NextJS"
published: true
date: "2023/11/27 01"
campus: "https://campusdoctoradoyposgrado2324.ull.es/mod/assign/view.php?id=4075&forceview=1"
delivery: "2023/12/22"
layout: Practica
order: 22 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/prompt-engineering.md # /practicas/event-emitters.md
next: #/practicas/jq-exercises.md
permalink: /practicas/nextjs
key: nextjs
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

Follow the tutorial at repo <https://github.com/ULL-prompt-engineering/vercel-sdk-ai-quickstart>. 
It is based on the Vercel AI SDK [Quickstart Guide](https://sdk.vercel.ai/docs/getting-started).

Modify the code so that instead of producing slogans for business behaves like the prompt agent we built in the previous lab "[prompt engineering](/practicas/prompt-engineering)". 

In Next.js, API routes are used to create serverless functions, which are stateless by nature. This means that each invocation of a serverless function is independent, and there's no built-in mechanism to maintain state or persistence between different invocations. However, we can achieve persistence in our Next.js application by using external services or databases. 

For small pieces of data that don't change often, environment variables can be used.
In Next.js, environment variables are preserved across successive executions of serverless functions. Environment variables in Next.js are set at build time and are embedded into the serverless function when it is deployed. This means that they remain consistent and unchanged across all invocations of the serverless function, as long as the deployment remains the same.

## References

- See repo <https://github.com/ULL-prompt-engineering/vercel-sdk-ai-quickstart>
- See the Vercel AI SDK [Quickstart Guide](https://sdk.vercel.ai/docs/getting-started)
- See repo <https://github.com/ULL-prompt-engineering/next-openai-app>
- See [last year's version of this lab](/assets/practicas/nextjs/nextjs-2022)
  
In this lab we will build a web version of the "[prompt engineering](/practicas/prompt-engineering)" app wich we built in the previous lab starting from the repo 
<https://github.com/ULL-prompt-engineering/next-openai-app>
