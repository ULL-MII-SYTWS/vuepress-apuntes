---
title: "Hello Subscriptions"
---

# {{ $frontmatter.title }}

GraphQL subscriptions enable you to subscribe to events under a source stream and receive notifications in real time via a response stream when a selected event executes. 

![](/images/graphql/graphql-scheme.png)

Once a GraphQL subscription is executed, a persistent function is created on the server that maps an underlying source stream to a returned response stream.

GraphQL subscriptions differ from queries in the way the data is delivered to the client. 

Queries immediately returns a single response, while subscriptions return a result every time data is published on a topic the client has subscribed.

![](/images/graphql/subscription_flow.png)

## Example: Hello Subscriptions

Below are the contents of the file [index.js](https://github.com/crguezl/graphql-yoga-examples/tree/main/subscriptions/hello-name/index.js) at repo `crguezl/graphql-yoga-examples` in the folder `/subscriptions/hello-name`. 

```js
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { inspect } from 'util'

const ins = x => inspect(x, { depth: null})

const typeDefs = `
  type Query {
    hello(name: String!): String!
  }

  type Counter {
    name: String!
    count: Int!
    countStr: String
  }

  type Subscription {
    counter: Counter!
  }
`
const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      console.log(`Current parent: ${parent} args=${ins(args)}, context keys=${Object.keys(context)}`)
      const {pubsub, countMap}  = context
      const name = args.name;
      let c = countMap.get(name) || 0;
      countMap.set(name, ++c)
      // console.log(`countMap[${name}]= ${countMap.get(name)}`);
      pubsub.publish("greetings", { counter: { name: name, count: countMap.get(name) }})
      return `Hello ${name}`
    },
  },
  Counter: {
    countStr: (parent, args, context) => `parent: ${ins(parent)} args=${ins(args)}, context keys=${Object.keys(context)} countMap=${ins(context.countMap)}`,
  },
  Subscription: {
    counter: {
      subscribe: (parent, args, { pubsub, countMap }) => {
        return pubsub.asyncIterator("greetings")
      },
    }
  },
}

const countMap = new Map();
const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub, countMap } })

server.start(() => console.log('Server is running on localhost:4000'))
```

## Running the example

We can run it with `node index.js` and see the output in the console:

```bash
➜  hello-name git:(main) ✗ node index.js 
Server is running on localhost:4000
```

and then when we can open a couple of tabs on  `localhost:4000` and subscribe in one and make queries on the other. On the queries tab we make queries:

![](/images/graphql/graphql-query-for-subscription.png)

Once you are subscribed in the subscription tab, you can see the results :

![images/graphql-hello-subscriptions.png](/images/graphql-hello-subscriptions.png)

## Explaining the code

A client can makes graphql queries to greet a specific person. 

```graphQL
  type Query {
    hello(name: String!): String!
  }
```

Each time a query is made, the server publishes a message to the channel `greetings` with the name of the person greeted and the number of times she has been greeted:

```js
const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      const {pubsub, countMap}  = context
      const name = args.name;
      let c = countMap.get(name) || 0;
      countMap.set(name, ++c)
      pubsub.publish("greetings", { counter: { name: name, count: countMap.get(name) }})
      return `Hello ${name}`
    },
  },
  /* ... */
}
```

clients subscribed to the channel `greetings` will receive the message and will be able to see the number of times the person has been greeted.


On the main code we start by creating the Map and the PubSub instances:

```js
const countMap = new Map();
const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub, countMap } })

server.start(() => console.log('Server is running on localhost:4000'))
```

The line `const pubsub = new PubSub()` creates
a simple **PubSub** instance - it is a simple *pubsub* implementation, based on `EventEmitter`. 

Alternative `EventEmitter` implementations can be passed by an options object to the `PubSub` constructor.

[PubSub](https://www.apollographql.com/docs/graphql-subscriptions/setup/) is a class that exposes a simple `publish` and `subscribe` API. As you can see at the line:

```js
pubsub.publish(channel, { counter: { count: count++ } })
```

[PubSub](https://www.apollographql.com/docs/graphql-subscriptions/setup/) sits between your application's logic and the GraphQL subscriptions engine - it receives a *publish* command from your app logic and pushes it to your GraphQL execution engine.

graphql-subscriptions exposes a default PubSub class you can use for a simple usage of data publication.

The PubSub implementation also includes a mechanism that **converts a specific PubSub event into a stream of AsyncIterator**, which you can use with *graphql subscriptions resolver*.

Notice how we pass the `pubsub` and `countMap` instances to the `context` of the GraphQLServer:

```js
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub, countMap } })
```

## References

* [See folder `subscriptions/hello/ in the repo `crguezl/graphql-yoga-examples`](https://github.com/crguezl/graphql-yoga-examples/blob/main/subscriptions/hello/index.js)
* [apollographql documentation: subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)