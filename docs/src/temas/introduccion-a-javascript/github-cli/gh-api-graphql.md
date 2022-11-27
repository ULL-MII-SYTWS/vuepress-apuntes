---
sidebar: auto
next: gh.md
prev: gh-api.md
---

# GraphQL Examples

**GraphQL** is a query language for web services APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more.

For the examples here you can play with the queries using also _/ˈɡrafək(ə)l/_, a graphical interactive in-browser GraphQL IDE. You can use it in any of these ways:

* [live GraphQL GitHub Explorer](https://docs.github.com/en/graphql/overview/explorer) ([Is an instance of GraphiQL. See the docs](https://docs.github.com/en/graphql/guides/using-the-explorer))
* Or [install the Electron Desktop GraphiQL app](https://github.com/skevy/graphiql-app). 
* [Try also the live demo at GraphQL site](http://graphql.org/swapi-graphql): It uses a Star Wars API. Click on the docs on the upper left corner. 


[![](https://github.com/graphql/graphiql/raw/main/packages/graphiql/resources/graphiql.png)](http://graphql.org/swapi-graphql)

Watch the youtube video [GitHub's GraphQL API](https://www.youtube.com/watch?v=B4rY2rgn1RY) by Kent C. Dodds

<youtube id="B4rY2rgn1RY"></youtube>

## Example: Number of repos in an Organization 

**GraphQL queries return only the data you specify** and no more ... 

To form a query, you must specify [fields within fields (also known as nested subfields)](https://docs.github.com/en/graphql/guides/introduction-to-graphql#field) until you return only [scalars](https://docs.github.com/en/graphql/reference/scalars).

Queries are structured like this:

```graphql
query {
  JSON-OBJECT-TO-RETURN
}
```

Here is an example. These are the contents of the file `org-num-repos.gql`:

```GraphQL
query {
  organization(login: "ULL-MII-SYTWS-2122") {
    repositories {
      totalCount
    }
  }
}
```

Go to the [live GraphQL GitHub Explorer](https://docs.github.com/en/graphql/overview/explorer), authenticate  
and copy the request.


That we can execute in `gh` this way:


```
gh api graphql --paginate --field query=@org-num-repos.gql --jq .data.organization.repositories.totalCount
```


## Getting my repos

Remember: pass one or more `-f/--raw-field` values in `"key=value"` format to add static string
parameters to the request payload. 

The `-F/--field` flag has type conversion based on the format of the value.
For instance placeholder values `"{owner}"`, `"{repo}"`, and `"{branch}"` get populated with values
from the repository of the current directory and if the value starts with `"@"`, the rest of the value is interpreted as a filename to read the value from.

```
➜  graphql-learning git:(main) ✗ gh config set pager cat
➜  graphql-learning git:(main) ✗ cat my-repos.bash
gh api graphql --paginate -F number_of_repos=3 --field query=@my-repos.gql
```

In this example `$number_of_repos` is a variable that is set to `3` inside the command using the option `-F number_of_repos=3`

```GraphQL
➜  graphql-learning git:(main) ✗ cat my-repos.gql 

query($number_of_repos:Int!){
  viewer {
    name
     repositories(last: $number_of_repos) {
       nodes {
         name
       }
     }
   }
}
```

Here is the output of an execution:      

```
➜  graphql-learning git:(main) ✗ gh api graphql --paginate -F number_of_repos=3 --field query=@my-repos.gql
```

```GraphQL
{
  "data": {
    "viewer": {
      "name": "Casiano Rodriguez-Leon",
      "repositories": {
        "nodes": [
          {
            "name": "asyncmap-crguezl"
          },
          {
            "name": "gh-clone-org"
          },
          {
            "name": "learning-graphql-with-gh"
          }
        ]
      }
    }
  }
}
```

### Exercise: -F versus -f

What is the output if we use `-f number_of_repos=3` instead of `-F number_of_repos=3` in the former request?

```
 gh api graphql --paginate -f number_of_repos=3 --field query=@my-repos.gql
```

<!-- "explanation": "Could not coerce value \"3\" to Int" -->            

In `gh`, the `--field` flag behaves like `--raw-field` with magic type conversion based on the format of the value:

* literal values "`true`", "`false`", "`null`", and **integer numbers** get converted to appropriate JSON types;
* placeholder values "`:owner`", "`:repo`", and "`:branch`" get populated with values from the repository of the current directory;
* if the value starts with "`@`", the rest of the value is interpreted as a filename to read the value from. 
  * Pass "`-`" to read from standard input.

For GraphQL requests, all fields other than "query" and "operationName" are interpreted as GraphQL variables.

## Example: Getting issues

Follows an example of query using GraphQL (see [The Example query in GitHub Docs](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-query)).

We can set the GraphQL query in a separated file:

```
➜  bin git:(master) cat gh-api-example.graphql
```
```graphql
query {
  repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") {
    issues(last:2, states:OPEN) {
      edges {
        node {
          title
          url
          labels(first:5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
```

To learn more, see the tutorial [Forming calls with GraphQL
](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql).


Looking at the composition line by line:

```
query {
```

Because we want to read data from the server, not modify it, `query` is the **root operation**. (If you don't specify an operation, `query` is also the default.)

```
repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") 
```

To begin the query, we want to find a [repository object](https://docs.github.com/en/free-pro-team@latest/v4/object/repository). 

The `schema` validation indicates this object requires 
* an `owner` 
* and a `name` argument. 

A `schema` defines a **GraphQL API's type system**. It describes the complete set of possible data (objects, fields, relationships, everything) that a client can access

```
issues(last:2, states:OPEN) {
```

A **field** is a unit of data you can retrieve from an object. As the official GraphQL docs say: *The GraphQL query language is basically about selecting fields on objects*.

To account for all issues in the repository, we call the `issues` object. 

Some details about the `issues` object:

The docs tell us this object has the type [IssueConnection](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issueconnection).

Schema validation indicates this object requires a `last` or `first` number of results as an argument, so we provide `2`.

The docs also tell us this object accepts a `states` argument, which is an `IssueState` enum that accepts `OPEN` or `CLOSED` values. 

To find only open issues, we give the states key a value of `OPEN`.

```
edges {
```

**Edges** represent connections between nodes. When you query a **connection**, you traverse its edges to get to its nodes.

We know **issues** is a *connection** because the Doc says it has the `IssueConnection` type. 

**Connections** let us query related objects as part of the same call. With connections, we can use a single GraphQL call where we would have to use multiple calls to a REST API. 

To retrieve data about individual issues, we have to access the node via edges.

```
node {
```

Here we retrieve the node at the end of the edge. 
The [IssueConnection docs](https://docs.github.com/en/free-pro-team@latest/v4/object/issueconnection) indicate the node at the end of the `IssueConnection` type is an `Issue` object.

Now that we know we're retrieving an `Issue` object, we can look at the [docs for issue](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issue)  and specify the fields we want to return:

```graphql
title
url
labels(first:5) {
  edges {
    node {
      name
    }
  }
}
```

Here we specify the `title`, `url`, and `labels` fields of the `Issue` object.

The `labels` field has the type [LabelConnection](https://docs.github.com/en/free-pro-team@latest/v4/object/labelconnection). As with the `issues` object, because `labels` is a connection, we must travel its `edges` to a connected `node`: the `label` object. At the node, we can specify the `label` object fields we want to return, in this case, `name`.


Execution:

```json
➜  gh api graphql --paginate -F query=@gh-api-example.graphql | jq .
{
  "data": {
    "repository": {
      "issues": {
        "edges": [
          {
            "node": {
              "title": "Revisión",
              "url": "https://github.com/ULL-MII-SYTWS-2021/p01-t1-iaas-alu0101040882/issues/2",
              "labels": {
                "edges": [
                  {
                    "node": {
                      "name": "enhancement"
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

<!--
## Descripción de la práctica p6-t1-gh-cli

[Descripción de la práctica gh-cli]({{site.baseurl}}/practicas/p6-t1-gh-cli)
-->

## Pagination

In `--paginate` mode, all pages of results will sequentially be requested until there are no more pages of results. 

For GraphQL requests, this requires that 

1. the original query accepts an `$endCursor: String` variable and that 
2. it fetches the `pageInfo{ hasNextPage, endCursor }` set of fields from a collection.

Here is an example:

```graphql
➜  apuntes git:(main) ✗ gh api graphql --paginate \
    --jq '.data.organization.repositories.nodes[] | .defaultBranchRef.name + "\t" + .name' \
    -F org=ULL-MII-SYTWS-2223 \
    -f query='
query($org:String!, $endCursor:String) {
  organization(login:$org) {
    repositories(first: 100, after: $endCursor, isFork:false, orderBy: {field:NAME, direction:ASC}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        defaultBranchRef {
          name
        }
      }
    }
  }
}'
```

Which outputs something like:

```
main	.github
main	async-await-ale_hernandez_liberon-alu0101225562
...
```

## Mutation 

The mutation type defines GraphQL operations **that change data on the server**. 

It is analogous to performing HTTP verbs such as `POST`, `PATCH`, and `DELETE`.

To form a mutation, you must specify three things:

1. *Mutation name*. The type of modification you want to perform.
2. *Input object*. The data you want to send to the server, composed of *input fields*. Pass it as an argument to the mutation name.
3. *Payload object*. The data you want to return from the server, composed of *return fields*. Pass it as the body of the mutation name.

Mutations are structured like this:

```graphql
mutation {
  MUTATION-NAME(
    input: {
      MUTATION-NAME-INPUT!
    }) 
    {
    MUTATION-NAME-PAYLOAD
    }
  }
}
```

The input object in this example is `MutationNameInput`, 
and the payload object is `MutationNamePayload`.

Here is a side-by-side comparison between the structure of SQL equivalent of a mutation, and a GraphQL mutation

![](/images/mutation-vs-sql.png)

For instance, the following example shows a mutation to add an emoji reaction to the issue.

```graphql
mutation AddReactionToIssue {
  addReaction(
    input: 
    { 
      subjectId:"I_kwDOGLyMF84838wt",
      content:ROCKET
    }
  ) 
  {
      reaction {
        content
      }
      subject {
        id
      }
  }
}
```

See the reference docs for [addReaction mutation](https://docs.github.com/en/graphql/reference/mutations#addreaction), whose description is: *Adds a reaction to a subject*.

The docs for the mutation list three input fields:

1. `clientMutationId (String)`
2. `subjectId (ID!)`
3. `content (ReactionContent!)`

A required content makes sense: 

* we want to add a reaction, so we'll need to specify which emoji to use.
* the `subjectId` is the only way to identify which issue in which repository to react to.

Mutations often require information that you can only find out by performing a query first.
In this  example `AddReactionToIssue`, we have to find the issue `id`:

``` 
➜  graphql-learning git:(main) cat findissueid.gql
```
```graphql 
query FindIssueID {
  repository(owner:"crguezl", name:"learning-graphql-with-gh") {
    issue(number:2) {
      id
    }
  }
}
```

which we can get with:

```graphql
✗ gh api graphql --paginate -F num=1 --field query=@findissueid.gql
{
  "data": {
    "repository": {
      "issue": {
        "id": "I_kwDOGLyMF84837de"
      }
    }
  }
}
```

How do we know which value to use for the `content`? 

The [addReaction](https://docs.github.com/en/graphql/reference/mutations#addreaction) docs tell us 
the `content` field has the type [ReactionContent](https://docs.github.com/en/graphql/reference/enums#reactioncontent), 
which is an [enum](https://docs.github.com/en/graphql/reference/enums) because only certain emoji reactions are supported on GitHub issues. 


The rest of the call is composed of the payload object. 

This is where we specify the data we want the server to return after we've performed the mutation. 

These lines come from the [addReaction](https://docs.github.com/en/graphql/reference/mutations#addreaction) docs, 
which three possible return fields:

1. `clientMutationId (String)`
2. `reaction (Reaction!)`
3. `subject (Reactable!)`

In this example, we return the two required fields (`reaction` and `subject`), both of which have required subfields 
(respectively, `content` and `id`).

Now we can add a reaction to the issue:

```graphql
➜  graphql-learning git:(main) cat addreactiontoissue.gql 
mutation AddReactionToIssue {
  addReaction(input:{subjectId:"I_kwDOGLyMF84838wt",content:ROCKET}) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}
```

using the command:

```
gh api graphql --paginate --field query=@addreactiontoissue.gql 
``` 
