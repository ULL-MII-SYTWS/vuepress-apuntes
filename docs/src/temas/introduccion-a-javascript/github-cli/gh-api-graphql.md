---
sidebar: auto
next: gh.md
prev: gh-api.md
---

# GitHub GraphQL API Examples

**GraphQL** is a query language for web services APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more.

For the examples here you can play with the queries using also _/ˈɡrafək(ə)l/_, a graphical interactive in-browser GraphQL IDE. You can use it in any of these ways:

* [live GraphQL GitHub Explorer](https://docs.github.com/en/graphql/overview/explorer) ([Is an instance of GraphiQL. See the docs](https://docs.github.com/en/graphql/guides/using-the-explorer))
* Or [install the Electron Desktop GraphiQL app](https://github.com/skevy/graphiql-app). 
* [Try also the live demo at GraphQL site](http://graphql.org/swapi-graphql): It uses a Star Wars API. Click on the docs on the upper left corner. 


[![](https://github.com/graphql/graphiql/raw/main/packages/graphiql/resources/graphiql.png)](http://graphql.org/swapi-graphql)

Watch the youtube video [GitHub's GraphQL API](https://www.youtube.com/watch?v=B4rY2rgn1RY) by Kent C. Dodds

<youtube id="B4rY2rgn1RY"></youtube>

More advanced staff is in the video [Advanced patterns for GitHub's GraphQL API](https://youtu.be/i5pIszu9MeM)

<youtube id="i5pIszu9MeM"></youtube>

## Query Example: Number of repos in an Organization 

### Structure of a Query 

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

### Executing the Query

Go to the [live GraphQL GitHub Explorer](https://docs.github.com/en/graphql/overview/explorer), authenticate  
and copy the request.


We can also execute in `gh` this way:


```
gh api graphql \
  --field query=@org-num-repos.gql \
  --jq .data.organization.repositories.totalCount
```

### Analysis of the query

Let us comment the former query 

```GraphQL
query {
  organization(login: "ULL-MII-SYTWS-2122") {
    repositories {
      totalCount
    }
  }
}
```

step by step:

* `query`: The GraphQL **query** keyword
  
Every GraphQL schema has a **[root type](http://spec.graphql.org/June2018/#sec-Root-Operation-Types)** for both **queries** and **mutations**. 

* The **query root** operation type must be provided and must be an [Object type](http://spec.graphql.org/June2018/#sec-Objects).
* The **mutation root** operation type is optional; if it is not provided, the service does not support mutations. If it is provided, it must be an [Object type](http://spec.graphql.org/June2018/#sec-Objects).
* Similarly, the **subscription root** operation type is also optional; if it is not provided, the service does not support subscriptions. If it is provided, it must be an [Object type](http://spec.graphql.org/June2018/#sec-Objects).

The query type defines GraphQL operations that retrieve data from the server.

```GraphQL
organization(login: "ULL-MII-SYTWS-2122") { ... }
```

To begin the query, we want to find a organization object. 

::: tip arguments for queries
The [**schema validation** for organization queries](https://docs.github.com/en/graphql/reference/queries#organization) indicates this query requires a `login` **argument**.

An **argument** is a set of key-value pairs attached to a specific field. 

Some fields **require**  an argument. We will see later that 
**Mutations** require an **input object** as an argument.
:::

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. 

When queries come in, they are **[validated](http://spec.graphql.org/June2018/#sec-Validation) and [executed](http://spec.graphql.org/June2018/#sec-Execution)** against that **schema**.

::: tip GraphQL objects
The query `organization` is an object of type [Organization](https://docs.github.com/en/graphql/reference/objects#organization) that like any GraphQL object

* **Implements** some [interfaces](https://docs.github.com/en/graphql/reference/interfaces).
  *  **GraphQL interfaces** represent a list of named fields and their arguments. 
  *  GraphQL objects can then implement these interfaces which requires that the object type will define all **fields** defined by those interfaces
* Has some **fields**

Among the fields we can see that [Organization](https://docs.github.com/en/graphql/reference/objects#organization) 

* Has a field `repositories` that is an object of type [RepositoryConnection](https://docs.github.com/en/graphql/reference/objects#repositoryconnection) that itself  
* Has a field `totalCount` that is a [scalar](https://docs.github.com/en/graphql/reference/scalars) of type `Int` (integer)
:::

## gh cli: argument conversion

::: danger `-f` versus `-F`
Pass one or more `-f/--raw-field` values in `"key=value"` format to add static **string parameters** to the request payload. 

The `-F/--field` flag has **type conversion** based on the format of the value.

  * Placeholder values `"{owner}"`, `"{repo}"`, and `"{branch}"` get populated with values from the repository of the current directory and 
  * if the value starts with `"@"`, the rest of the value is interpreted as a filename to read the value from. Pass "`-`" to read from standard input.
  * literal values "`true`", "`false`", "`null`", and **integer numbers** get converted to appropriate JSON types;
 
For GraphQL requests, all fields other than `query` and `operationName`[^operationname] are interpreted as GraphQL variables.
:::

```
➜  graphql-learning git:(main) ✗ cat my-repos.bash
gh api graphql --paginate -F number_of_repos=3 --field query=@my-repos.gql
```

### Example: -F versus -f

In this example `$number_of_repos` is a variable that is set to number `3` inside the command using the option `-F number_of_repos=3`

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
➜  graphql-learning git:(main) ✗ gh api graphql \
   --paginate \
   -F number_of_repos=3 \
   --field query=@my-repos.gql
```

and the output:

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

<!-- "explanation": "Could not coerce value \"3\" to Int" -->            

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


### Analysis of the query 

Looking at the composition line by line:

```graphql
query {
```

Because we want to read data from the server, not modify it, `query` is the **root operation**. (If you don't specify an operation, `query` is also the default.)

```graphql
query {
  repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") {
```

To begin the query, we want to find a [repository object](https://docs.github.com/en/free-pro-team@latest/v4/object/repository). 

The `schema` validation for the [query repository](https://docs.github.com/en/graphql/reference/queries#repository) indicates this object requires 

* an `owner` 
* and a `name` argument. 

As we said before a `schema` defines a **GraphQL API's type system**. It describes the complete set of possible data (objects, fields, relationships, everything) that a client can access

```graphql
query {
  repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") {
    issues(last:2, states:OPEN) {
```

A **field** is a unit of data you can retrieve from an object. As the official GraphQL docs say: *The GraphQL query language is basically about selecting fields on objects*.

To account for all issues in the repository, we specify the `issues` field of the repository object. 

Some details about the `issues` field:

### Connections in GraphQL

The docs tell us this object has the type [IssueConnection](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issueconnection).

As usual for connections, the Schema indicates this object requires a field like `last` or `first` to specify the number of results per page as an argument, so we provide `2`.

The docs also tell us this object accepts a `states` argument, which is an `IssueState` enum that accepts `OPEN` or `CLOSED` values. 


![](/images/getissues-graphql-github-explorer.png)

To find only open issues, we give the states key a value of `OPEN`.

```graphql
query {
  repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") {
    issues(last:2, states:OPEN) {
      edges {
        node { ... }
```

**Edges** represent connections between nodes. When you query a **connection**, you traverse its edges to get to its nodes.

We know **issues** is a *connection* because the Doc says it has the `IssueConnection` type. 

**Connections** let us query related objects as part of the same call. With connections, we can use a single GraphQL call where we would have to use multiple calls to a REST API. 

To retrieve data about individual issues, we have to access the node via `edges`.

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

Here we retrieve the `node` at the end of the `edge`. 

The [IssueConnection docs](https://docs.github.com/en/free-pro-team@latest/v4/object/issueconnection) indicate the node at the end of the `IssueConnection` type is an `Issue` object.

Now that we know we're retrieving an `Issue` object, we can look at the [docs for issue](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issue)  and specify the fields we want to return.

Here we specify the `title`, `url`, and `labels` fields of the `Issue` object.

* The `labels` field has the type [LabelConnection](https://docs.github.com/en/free-pro-team@latest/v4/object/labelconnection). 
* As with the `issues` object, because `labels` is a connection, we must travel its `edges` to a connected `node`: the `label` object. 
* At the node, we can specify the `label` object fields we want to return, in this case, `name`.


You can see the code at [crguezl/learning-graphql-with-gh/tree/main/gh-graphql-connection-example](https://github.com/crguezl/learning-graphql-with-gh/tree/main/gh-graphql-connection-example)


<!--
## Descripción de la práctica p6-t1-gh-cli

[Descripción de la práctica gh-cli]({{site.baseurl}}/practicas/p6-t1-gh-cli)
-->

## Pagination

::: tip pageInfo.nextCursor pageInfo.hasNextPage

When in  `gh` we use the `--paginate` option, all pages of results will sequentially be requested until there are no more pages of results. For GraphQL requests, this requires that 

1. the original query accepts an `$endCursor: String` variable and that 
2. it fetches the `pageInfo{ hasNextPage, endCursor }` set of fields from a collection.
:::

Here is an example that produces an array of objects with the `name` and `branch` fields of all the  repositories in the specified organization:

```sh
#!/bin/bash
ORG=$(gh pwd)
if [[ -n $1 ]]; then ORG=$1; fi

gh api graphql --paginate \
    --jq '
    [
       .data
       .organization
       .repositories
       .nodes[] | 
       { branch: .defaultBranchRef.name, name: .name }
    ]
    ' \
    -F org=$ORG \
    -F query=@org-getallrepos.gql
```

Where the `org-getallrepos.gql` file contains:

```graphql
query($org:String!, $endCursor:String) {
  organization(login:$org) {
    repositories(first: 100, 
                 after: $endCursor, 
                 isFork:false, 
                 orderBy: {field:NAME, direction:ASC}) {
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
}
``` 

See [crguezl/learning-graphql-with-gh/org-getallrepos-graphql-pagination](https://github.com/crguezl/learning-graphql-with-gh/tree/main/org-getallrepos-graphql-pagination)

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

<!--
Here is a side-by-side comparison between the structure of SQL equivalent of a mutation, and a GraphQL mutation

![](/images/mutation-vs-sql.png)

-->

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

## Rename Repository

Here is a second example of mutation that renames a repository:


```GraphQL
query getRepoId {
  repository(owner: "ULL-ESIT-DMSI-1920", name: "prueba") {
    id
  }
}

mutation renameRepoName($id: ID!) {
  updateRepository(
    input: {
      name: "prueba-funciona", 
      repositoryId: $id
    }
  ) 
  {
    repository {
      name
    }
  }
}
```

## Discussions

### Get Discussions in the repo crguezl/learning-graphql-with-gh

```GraphQL
➜  discussions-mutation git:(main) ✗ cat get-discussions.bash 
#!/bin/bash 
# Get discussions 
gh api graphql \
  -H 'GraphQL-Features: discussions_api' \
  -F owner=':owner' \
  -F name=':repo' \
  -f query='
query getDiscussions($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    discussions(first: 10) {
      edges {
        node {
          id
          number
          body
        }
      }
    }
  }
}'
```

Execution:

```json
➜  discussions-mutation git:(main) ./get-discussions.bash        
{
  "data": {
    "repository": {
      "discussions": {
        "edges": [
          {
            "node": {
              "id": "D_kwDOGLyMF84ARkhY",
              "number": 3,
              "body": "<!--\r\n    ✏️ Optional: Customize the content below to let your community know what you intend to use Discussions for.\r\n-->\r\n## 👋 Welcome!\r\n  We’re using Discussions as a place to connect with other members of our community. We hope that you:\r\n  * Ask questions you’re wondering about.\r\n  * Share ideas.\r\n  * Engage with other community members.\r\n  * Welcome others and are open-minded. Remember that this is a community we\r\n  build together 💪.\r\n\r\n  To get started, comment below with an introduction of yourself and tell us about what you do with this community.\r\n\r\n<!--\r\n  For the maintainers, here are some tips 💡 for getting started with Discussions. We'll leave these in Markdown comments for now, but feel free to take out the comments for all maintainers to see.\r\n\r\n  📢 **Announce to your community** that Discussions is available! Go ahead and send that tweet, post, or link it from the website to drive traffic here.\r\n\r\n  🔗 If you use issue templates, **link any relevant issue templates** such as questions and community conversations to Discussions. Declutter your issues by driving community content to where they belong in Discussions. If you need help, here's a [link to the documentation](https://docs.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository#configuring-the-template-chooser).\r\n\r\n  ➡️ You can **convert issues to discussions** either individually or bulk by labels. Looking at you, issues labeled “question” or “discussion”.\r\n-->\r\n"
            }
          }
        ]
      }
    }
  }
}
```

### Get Comments in the Discussion

```GraphQL
➜  discussions-mutation git:(main) ✗ cat get-comments.bash 
#!/bin/bash 
# Discussion 3 and comments

```GraphQL
declare -i DISCUSSION_NUMBER=3

if [[ $# != 0 ]]; then
  DISCUSSION_NUMBER=$1
fi
gh api graphql \
-H 'GraphQL-Features: discussions_api' \
-F discussionNumber=${DISCUSSION_NUMBER} \
-F owner=':owner' \
-F name=':repo' \
-f query='query getComments($owner: String!, $name: String!, $discussionNumber: Int!) {
  repository(owner: $owner, name: $name) {
    discussion(number: $discussionNumber) {
      id
      title
      body
      comments(first: 10) {
        totalCount
        edges {
          node {
            id
            body
            replies(first: 5) {
              edges {
                node {
                  body
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}
'
```

Execution:

```json
➜  discussions-mutation git:(main) ✗ ./get-comments.bash         
{
  "data": {
    "repository": {
      "discussion": {
        "id": "D_kwDOGLyMF84ARkhY",
        "title": "Welcome to learning-graphql-with-gh Discussions!",
        "body": "<!--\r\n    ✏️ Optional: Customize the content below to let your community know what you intend to use Discussions for.\r\n-->\r\n## 👋 Welcome!\r\n  We’re using Discussions as a place to connect with other members of our community. We hope that you:\r\n  * Ask questions you’re wondering about.\r\n  * Share ideas.\r\n  * Engage with other community members.\r\n  * Welcome others and are open-minded. Remember that this is a community we\r\n  build together 💪.\r\n\r\n  To get started, comment below with an introduction of yourself and tell us about what you do with this community.\r\n\r\n<!--\r\n  For the maintainers, here are some tips 💡 for getting started with Discussions. We'll leave these in Markdown comments for now, but feel free to take out the comments for all maintainers to see.\r\n\r\n  📢 **Announce to your community** that Discussions is available! Go ahead and send that tweet, post, or link it from the website to drive traffic here.\r\n\r\n  🔗 If you use issue templates, **link any relevant issue templates** such as questions and community conversations to Discussions. Declutter your issues by driving community content to where they belong in Discussions. If you need help, here's a [link to the documentation](https://docs.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository#configuring-the-template-chooser).\r\n\r\n  ➡️ You can **convert issues to discussions** either individually or bulk by labels. Looking at you, issues labeled “question” or “discussion”.\r\n-->\r\n",
        "comments": {
          "totalCount": 1,
          "edges": [
            {
              "node": {
                "id": "DC_kwDOGLyMF84AQN01",
                "body": "Esta es un comentario en la primera discusión.\r\nVamos a usar la API GraphQL para añadir comentarios",
                "replies": {
                  "edges": [
                    {
                      "node": {
                        "body": "Contador de cuerpo: 1",
                        "id": "DC_kwDOGLyMF84AQN4l"
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
}
```

### Mutation: Add Reply to Discussion Comment

```GraphQL
➜  discussions-mutation git:(main) ✗ cat reply-to-discussion-comment.bash 
#!/bin/bash 
BODY="Contador de cuerpo: 3"
discussionId="D_kwDOGLyMF84ARkhY"
replyToId="DC_kwDOGLyMF84AQN01"
if [[ $# != 0 ]]; then
  BODY=$1
fi
gh api graphql \
-H 'GraphQL-Features: discussions_api' \
-f body="Contador de cuerpo: $BODY" \
-F discussionId=$discussionId \
-F replyToId=$replyToId \
-f query='
mutation addComment($body: String!, $discussionId: ID!, $replyToId: ID!){
  addDiscussionComment(input:
    {
      body: $body , 
      discussionId: $discussionId, 
      replyToId: $replyToId 
    }
  )
  {
    comment{
      body
      id
    }
  }
}'
```

Execution:

```json
➜  discussions-mutation git:(main) ✗ ./reply-to-discussion-comment.bash
{
  "data": {
    "addDiscussionComment": {
      "comment": {
        "body": "Contador de cuerpo: Contador de cuerpo: 3",
        "id": "DC_kwDOGLyMF84AQN_k"
      }
    }
  }
}
```

### References for Discussions GraphQL API

* [gist](https://gist.github.com/oleksis/d40a48a343b7e81fe0c6a940f086f43c)
* [GitHub Docs discussions](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#repositorydiscussions)
* [Feedbacks](https://github.com/github/feedback/discussions/43)
* [Discusion API](https://gist.github.com/smashwilson/311e1487ddb40a455fc54d294cc63ad4#addDiscussionComment)

## Footnotes

[^operationname]: The operation name is a meaningful and explicit name for your operation. It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging.