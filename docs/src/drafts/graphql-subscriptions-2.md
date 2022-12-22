---
#title: "GraphQL-Subscriptions 2nd part"
title: GraphQL Subscriptions with Node.js and Express
repo: "https://github.com/crguezl/graphql-subscriptions-with-node-js/main/blob"
published: true
date: "2022/12/18 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=35670"
delivery: "2023/01/12"
permalink: /practicas/graphql-subscriptions-2/
key: graphql-subscriptions-2
layout: Practica
order: 23 
sidebar: auto
prev: 
next: 
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## Goals and Introduction

See the tutorial [GraphQL subscriptions with Node.js and Express](https://blog.logrocket.com/graphql-subscriptions-with-node-js/) at <https://blog.logrocket.com/graphql-subscriptions-nodejs-express>

We’ll use predefined post data stored inside a JSON file [postdata.js](https://github.com/crguezl/graphql-subscriptions-with-node-js/blob/main/postData.js) to perform the following operations:

* `getPosts `: read all posts
* `getPost`: read a specific post by ID
* `updatePost`: update a post and triggers an event to channel `post`
* `deletePost`: delete a post and triggers an event to channel `post`
* `createPost`: create a post and triggers an event to channel `post`

In addition to the normal schema definitions for queries and mutations, we have a type called Subscription that is added on the post object via `SubscriptionPayload`, a custom type.

Post objects have the following structure:

```graphql 
    type Post{
        id:ID
        title:String
        subtitle:String
        body:String
        published:Boolean
        author: String
        upvotes: Int
        downvotes: Int
        commentCount: Int
    }
```

Each time a change is made to a post object, an event will be triggered that returns the name of the mutation performed , either update, delete, or create a post.

## App structure

Here is the structure of the app:

```
✗ tree -I node_modules
.
├── README.md   # Write your report here
├── index.js    # Starts the GraphQL server
├── package-lock.json
├── package.json
├── postData.js  # Exports the json. Mimicks the database
├── resolvers.js # Has the logic to resolve for all queries, mutations, and subscriptions 
└── typeDefs.gql # the GraphQL Schema
```

## GraphQL Yoga

We’ll use [graphql-yoga](https://the-guild.dev/graphql/yoga-server). You can follow this [tutorial](https://the-guild.dev/graphql/yoga-server/tutorial/basic) to learn more about graphql-yoga.  

```json
✗ jq '.dependencies' package.json 
{
  "graphql-yoga": "^1.18.3"
}
```

GraphQL Yoga uses **server-sent-events[^serversentevents]** for the subscription protocol. 

**Server-Sent Events (SSE)** is a [server push](https://en.wikipedia.org/wiki/Server_push) technology enabling a client to receive automatic updates from a server via an HTTP connection, and describes how servers can initiate data transmission towards clients once an initial client connection has been established. 

![/images/server-sent-events.png](/images/server-sent-events.png)

**SSE** are commonly used to send message updates or continuous data streams to a browser client and designed to enhance native, cross-browser streaming through a JavaScript API called EventSource[^eventsource], through which a client requests a particular URL in order to receive an event stream. The EventSource API is standardized as part of HTML5. The mime type for SSE is `text/event-stream`.

## Resolvers Structure 

Notice how [resolvers](https://github.com/crguezl/graphql-subscriptions-with-node-js/blob/main/resolvers.js) is an object with three properties `Query`, `Mutation`, and `Subscription` whose values are objects. 


```js 
const resolvers = {
    Query: {
        getPosts() { ... },
        getPost(parent, args) { ... }
    },
    Mutation: {
        createPost(parent, args, { pubsub }) { ...  },
        updatePost(parent, args, { pubsub }) { ... },
        deletePost(parent, args, { pubsub }) { ... },
    },

    Subscription: {
        post: { ... }
    },
}
```

Each entry in the `Query` object corresponds to the function resolver of the corresponding query.

## Queries

We’ll define two queries, `getPost` and `getPosts`. Here is the schema:

```graphql
  type Query {
        getPosts: [Post!]!
        getPost(query: String!): [Post]
    }
```   

and here are the resolvers:

```js 
const resolvers = {
    Query: {
        getPosts() {
          return posts;
        },
        getPost(parent, args) {
                return posts.filter((post) => {
                const inBody = post.body.toLowerCase().includes(args.query.toLowerCase())
                const inTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
                return inBody || inTitle;
            });
        }
    },
    Mutation: {
        createPost(parent, args, { pubsub }) { ... },
        updatePost(parent, args, { pubsub }) { ... },
        deletePost(parent, args, { pubsub }) { ... },
    },

    Subscription: {
        post: { ... }
    },
}
```

### Testing the queries

This is an example of a query to get a post:

```graphql
query {
  getPost(query: "recusandae") {
    id
    title
    body
    author
    published
  }
}
```

The  answer is:

```json 
{
  "data": {
    "getPost": [
      {
        "id": "7",
        "title": "Et sunt in error et recusandae ut animi ut.",
        "body": "magni adipisci voluptatibus",
        "author": "Anabelle Sipes",
        "published": true
      }
    ]
  }
}
```

## Mutations

### Schema

This is the schema for the mutation `createPost` to create a `Post`:

```graphql 
    type Post{
        id:ID
        title:String
        subtitle:String
        body:String
        published:Boolean
        author: String
        upvotes: Int
        downvotes: Int
        commentCount: Int
    }

    type Mutation{
        createPost(
          id:ID!
          title:String
          subtitle:String
          body:String
          published:Boolean
          author: String!
          upvotes: Int
          downvotes: Int
          commentCount: Int
        ): Post!

        updatePost( ... ): Post!
        deletePost(id: ID!): Post!
    }
``` 

### Resolvers

Here is the correspondent resolver for `createPost`:

```js{10-15}
    Mutation: {
        createPost(parent, args, { pubsub }) {
            const id = parseInt(args.id, 10);
            const postIndex = posts.findIndex((post) => post.id === id);
            if (postIndex === -1) {
                posts.push({
                    ...args
                });

                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: { ...args }
                    }
                });

                return { ...args };
            };
            throw new Error('Post with same id already exist!');
        },
        updatePost(parent, args, { pubsub }) { ... },
        deletePost(parent, args, { pubsub }) { ... },
    },
```

Once the post is created, we’ll publish an event with the field `mutation` set to `CREATED` to all subscribers of the `post` channel with the newly created post in the field `data`. 

```js
pubsub.publish('post', {
    post: {
        mutation: 'CREATED',
        data: { ...args }
    }
});
```

Notice how we have got the `pubsub` object from the `context`.

```js 
createPost(parent, args, { pubsub }) { ... }
```

### The pubsub Object

The `pubsub` object was created in the `index.js` file:

```js{6-8}
const { GraphQLServer, PubSub } = require('graphql-yoga');
const pubsub = new PubSub()
const server  = new GraphQLServer({
  typeDefs,
  resolvers,
  context:{
    pubsub
  }
})
```
Observe how is passed inside the context argument of the `GraphQLServer` constructor:

### Testing the mutations

Let us test the `createPost` mutation. We'll send first an Invalid example:

```graphql 
mutation withError{
  createPost(
    id: 3, title: "hello", body: "world", 
    author: "Casiano") {
    id
    title
    body
    author
  }
}
```

the answer is:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Post with same id already exist!",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createPost"
      ]
    }
  ]
}
```

Notice how `data` is  `null` and `errors` is an array of errors.

Here is a second test, containing a valid mutation

```graphql
mutation ok {
  createPost(
    id: 11, title: "hello", body: "world", 
    author: "Casiano") {
    id
    title
    body
    author
  }
}
``` 

The answer is:

```json
{
  "data": {
    "createPost": {
      "id": "11",
      "title": "hello",
      "body": "world",
      "author": "Casiano"
    }
  }
}
```

The code for the other mutations is similar to the one for `createPost`.

## Subscriptions

Here is the schema for the subscription:

```graphql
enum Crud {
  CREATE
  UPDATE
  DELETE
}

type Subscription {
  post: SubscriptionPayload
}

type SubscriptionPayload {
  mutation: Crud
  data: Post
}
```

The objects returned by the subscription will be of type `SubscriptionPayload`. The `SubscriptionPayload` object has two fields: `mutation` and `data`. 

* The `mutation` field will contain the type of mutation that triggered the subscription, in the case of a `createPost` is `CREATED`. 
* The `data` field will contain the data of the newly created post.

The resolver for `post` uses the`pubsub.asyncIterator` method to map the event underlying the source stream to a returned response stream. The `asyncIterator` takes the channel name through which the event across the app will be mapped out:

```js
    Subscription: {
        post: {
            subscribe(parent, args, { pubsub }) {
                return pubsub.asyncIterator('post');
            }
        }
    }
```

Subscription resolvers are wrapped inside an object and need to be provided as the value for a `subscribe` field. You also need to provide another field called `resolve` that actually returns the data from the data emitted by the `AsyncIterator`.




### Testing the subscription 

Here follow two captures of the subscription in action. The first one is the mutation, 

![](/images/graphql/graphql-mutation.png) 

the second one shows the notification received by the subscription:

![](/images/graphql/graphql-subscription-notification.png)

## Exercise

Update the example to use the latest version of GraphQL-yoga (v3). See [Migration from Yoga V1](https://the-guild.dev/graphql/yoga-server/docs/migration/migration-from-yoga-v1)

## References

* [GraphQL subscriptions with Node.js and Express](https://blog.logrocket.com/graphql-subscriptions-with-node-js/)
  * [Repo crguezl/graphql-subscriptions-with-node-js](https://github.com/crguezl/graphql-subscriptions-with-node-js)
  * [Full schema](https://github.com/crguezl/graphql-subscriptions-with-node-js/blob/main/typeDefs.gql)
  * [Full code of resolvers](https://github.com/crguezl/graphql-subscriptions-with-node-js/blob/main/resolvers.js)
* GraphQL Yoga
  * [Graphql-yoga tutorials](https://the-guild.dev/graphql/yoga-server/tutorial/basic)
  * [Graphql-yoga repo](https://github.com/dotansimha/graphql-yoga)
* Other tutorials on GraphQL subscriptions
  * [Tutorial](https://pusher.com/tutorials/chat-graphql-subscriptions/) *Building live chat app with GraphQL subscriptions*
  * [Realtime GraphQL Subscriptions](https://www.howtographql.com/graphql-js/7-subscriptions/) from GRAPHQL-NODE TUTORIAL. Written by Maira Bello: Build your own GraphQL server
  * <youtube  id="bn8qsi8jVew"></youtube>

## FootNotes

[^serversentevents]: See [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

[^eventsource]: The [EventSource interface](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#:~:text=The%20EventSource%20interface%20is%20web,until%20closed%20by%20calling%20EventSource.) 
is **web content's interface to server-sent events**. An EventSource instance opens a persistent connection to an HTTP server, which sends events in text/event-stream format. The connection remains open until closed by calling EventSource.10 oct


