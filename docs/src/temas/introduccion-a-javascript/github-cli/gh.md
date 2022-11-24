---
title: GitHub Command Line Interface
permalink: /temas/introduccion-a-javascript/github-cli/
---

# {{ $frontmatter.title }}

## What is 

[gh](https://cli.github.com/manual/) pretends to facilitate the access to GitHub from the command line. It brings pull requests, issues, and other GitHub concepts to the terminal next to where you are already working with git and your code.

## Version 

```
➜  dmsi2223apuntes git:(master) ✗ gh --version
 gh --version
gh version 2.20.2 (2022-11-15)
https://github.com/cli/cli/releases/tag/v2.20.2
```

## Help 

* Output of the command [gh help reference](/temas/introduccion-a-javascript/github-cli/help)


## Installation

To install it, see  the [installation instructions](https://github.com/cli/cli#installation).

Check the [GitHub CLI Manual](https://cli.github.com/manual/) for more details.


## Ways to extend gh-cli

There are several ways you can extend/customize `gh`:

*   Create shorthands using [gh alias set](gh-alias)
*   Make custom API queries using the [gh REST api](gh-api)
*   Make custom API queries using [gh GraphQL api](gh-api-graphql)
*   Use [environment variables](https://cli.github.com//manual/gh_help_environment)
*   Using and writing [gh extensions](gh-extension)

## Running Manually GitHub Workflows with gh

* [Running Manually GitHub Workflows with gh](gh-workflows)

## The --json flag

* [The --json flag](gh-json-option)
  
## References

* [Repo crguezl/learning-graphql-with-gh](https://github.com/crguezl/learning-graphql-with-gh)
* [gh manual](https://cli.github.com/manual/)
* [GitHub REST API](https://docs.github.com/en/rest)
* [Getting started with the REST API](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api)
* [Scripting with GitHub CLI by Mislav Marohnić](https://github.blog/2021-03-11-scripting-with-github-cli/)
* Blog: [GitHub CLI is Now Available: Here’s Why You Should Be Excited by 
Kasun Rajapakse](https://blog.bitsrc.io/github-cli-is-now-available-heres-why-you-should-be-excited-91d8bdd81a51)
* [An Introduction to GraphQL via the GitHub API](https://www.cloudbees.com/blog/an-introduction-to-graphql-via-the-github-api)  by Derek Haynes
* [GitHub GraphQL Playground](https://docs.github.com/en/graphql/overview/explorer)
