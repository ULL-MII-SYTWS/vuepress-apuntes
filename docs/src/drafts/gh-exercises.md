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
prev: event-emitters.md
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
section [Pagination](/temas/introduccion-a-javascript/github-cli/gh-api.html#pagination)

## Formatted Issue list

Using  the GH REST API and a Go  template, make a gh alias `repo-issues-list` to list all issues of a repo in a formatted way. 

See section 
[Templates for the output](/temas/introduccion-a-javascript/github-cli/gh-api.html#templates-for-the-output)

## Number of  repos in an organization

Using the GH GraphQl API write a gh alias `org-num-repos` to count the number of repos in an organization. See
section [Example: Number of repos in an Organization](/temas/introduccion-a-javascript/github-cli/gh-api-graphql.html#example-number-of-repos-in-an-organization) 
