---
title: "GitHub Cli Exercises"
published: true
date: "2022/11/25 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=793"
delivery: "2022/11/30"
permalink: /practicas/gh-cli
key: gh-cli
layout: Practica
order: 20 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/event-emitters.md
next: 
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## get-lab-names

Using the GH REST API, make a gh alias `get-lab-names` to get the names of the repos inside an organization sorted by last push

See section [Exercise: Search for repos inside an organization](/temas/introduccion-a-javascript/github-cli/gh-alias.html#exercise-search-for-repos-inside-an-organization)


## Issues of a repo

Using the GH REST API, make a gh alias `repo-issues-get` to get the issues of a repo. See 
section [Example: Issues of a repo](temas/introduccion-a-javascript/github-cli/gh-api.html#example-issues-of-a-repo)

## Create repo

Using the GH REST API, make a gh alias `repo-create` to create a repo. See
section [POST Example: Create a Repo](/temas/introduccion-a-javascript/github-cli/gh-api.html#post-example-create-a-repo)

## List all repos in an organization

Using the GH REST API, make a gh alias `org-repos-list` to list all repos in an organization. See
section [Pagination](/temas/introduccion-a-javascript/github-cli/gh-api.html#pagination) of the [GH REST API](/temas/introduccion-a-javascript/github-cli/gh-api.html) chapter

## Formatted Issue list

Using  the GH REST API and a Go  template, make a gh alias `repo-issues-list` to list all issues of a repo in a formatted way. 

See section 
[Templates for the output](/temas/introduccion-a-javascript/github-cli/gh-api.html#templates-for-the-output)

## Number of  repos in an organization

Using the GH GraphQL API write a [gh extension](/temas/introduccion-a-javascript/github-cli/gh-extension) `org-num-repos` to count the number of repos in an organization. See
section [Example: Number of repos in an Organization](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#example-number-of-repos-in-an-organization) 


## Get the Issues 

Using the GH GraphQL API write a gh alias `repo-issues-get` to get the issues of a repo. See the section [Getting issues](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#example-getting-issues)

## List all repos in an organization with GraphQL

Using the GH GraphQL API, make a [gh extension](/temas/introduccion-a-javascript/github-cli/gh-extension) `org-repos-list` to list all repos in an organization. See
section [Pagination](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#pagination) of the [GH GraphQL API](/temas/introduccion-a-javascript/github-cli/gh-api-graphql) chapter

## Add a Reaction

Using the GH GraphQL API write a gh alias `issue-add-reaction` to 

1. find an issue of a given repo by number and 
2. adds a given reaction to the issue. 

See the section [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

## Rename a repo

Using the GH GraphQL API write a gh alias `repo-rename` to rename a repo. See the sections [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) and the section [Rename Repository](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#rename-repository) of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

## Add a Reply to a Comment in a Discussion

Using the GH GraphQL API write  gh scripts to 

* Get the discussions of some repo
* Get the comments in a discussion
* Add a reply to a comment in a discussion
 
See the sections [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) and the section [Add Reply to Discussion Comment](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#add-reply-to-discussion-comment) of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

## References

* [Repo crguezl/learning-graphql-with-gh](https://github.com/crguezl/learning-graphql-with-gh)
* [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)