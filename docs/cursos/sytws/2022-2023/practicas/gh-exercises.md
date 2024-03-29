---
title: "GitHub Cli Exercises"
published: true
date: "2023/11/04 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=793"
delivery: "2022/12/30"
permalink: /practicas/gh-cli
key: gh-cli
layout: Practica
order: 20 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/event-emitters.md
next: #/practicas/jq-exercises.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## get-lab-names

Using the GH REST API, make a gh alias `get-lab-names` to get the names of the repos inside an organization sorted by last push

See 

1. Section [GH REST API](/temas/introduccion-a-javascript/github-cli/gh-api.html)
2. Section [Exercise: Search for repos inside an organization](/temas/introduccion-a-javascript/github-cli/gh-alias.html#exercise-search-for-repos-inside-an-organization) inside the section [gh Alias](/temas/introduccion-a-javascript/github-cli/gh-alias.html)


## Issues of a repo

Using the GH REST API, make a gh alias `repo-issues-get` to get the issues of a repo. 
See  

* sections [Example: Issues of a repo](/temas/introduccion-a-javascript/github-cli/gh-api.html#example-issues-of-a-repo) and 
* section [Templates for the output](/temas/introduccion-a-javascript/github-cli/gh-api.html#templates-for-the-output)

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

## Number of  repos in an organization using GraphQL

Using the GH GraphQL API write a [gh extension](/temas/introduccion-a-javascript/github-cli/gh-extension) `org-num-repos` to count the number of repos in an organization. See
section [Example: Number of repos in an Organization](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#example-number-of-repos-in-an-organization) 


## Get the Issues 

Using the GH GraphQL API write a gh alias `repo-issues-get` to get the issues of a repo. See the section [Getting issues](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#example-getting-issues)

A solution is in folder [learning-graphql-with-gh/gh-graphql-connection-example](https://github.com/crguezl/learning-graphql-with-gh/tree/main/gh-graphql-connection-example)

## List all repos in an organization with GraphQL

Using the GH GraphQL API, make a [gh extension](/temas/introduccion-a-javascript/github-cli/gh-extension) `org-repos-list` to list all repos in an organization. See
section [Pagination](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#pagination) of the [GH GraphQL API](/temas/introduccion-a-javascript/github-cli/gh-api-graphql) chapter

See a solution at folder [learning-graphql-with-gh/org-getallrepos-graphql-pagination](https://github.com/crguezl/learning-graphql-with-gh/tree/main/org-getallrepos-graphql-pagination)

## Add a Reaction

Using the GH GraphQL API write a gh alias `issue-add-reaction` to 

1. find an issue of a given repo by number and 
2. adds a given reaction to the issue. 

See the section [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

A solution is at folder [/learning-graphql-with-gh/addreactiontoissue](https://github.com/crguezl/learning-graphql-with-gh/tree/main/addreactiontoissue)

## Rename a repo

Using the GH GraphQL API write a gh alias `repo-rename` to rename a repo. 

See the sections [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) and the section [Rename Repository](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#rename-repository) of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

See folder [learning-graphql-with-gh/repo-rename-mutation](https://github.com/crguezl/learning-graphql-with-gh/tree/main/repo-rename-mutation) for a solution

## Add a Reply to a Comment in a Discussion

Using the GH GraphQL API write  gh scripts to 

* Get the discussions of some repo
* Get the comments in a discussion
* Add a reply to a comment in a discussion
 
See the sections 

* [Mutation](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#mutation) and the section 
* [Add Reply to Discussion Comment](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#add-reply-to-discussion-comment) 

of the [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)

See also [learning-graphql-with-gh/discussions-mutation](https://github.com/crguezl/learning-graphql-with-gh/tree/main/discussions-mutation) for a solution to the exercise

## References

* [Repo crguezl/learning-graphql-with-gh](https://github.com/crguezl/learning-graphql-with-gh)
* [GraphQL Examples chapter](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#graphql-examples)