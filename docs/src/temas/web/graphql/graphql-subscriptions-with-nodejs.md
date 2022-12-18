---
title: GraphQL Subscriptions with Node.js
repo: "https://github.com/crguezl/graphql-subscriptions-with-node-js/main/blob"
---

We’ll use predefined post data stored inside a JSON file [postdata.js](https://github.com/crguezl/graphql-subscriptions-with-node-js/blob/main/postData.js) to perform the following operations:

* getPosts : read all posts
* getPost: read a specific post by ID
* updatePost: update a post
* deletePost: delete a post
* createPost: create a post

Each time a change is made to a post object, an event will be triggered that returns the name of the mutation performed , either update, delete, or create a post.

## Dependencies

```
✗ jq '.dependencies' package.json 
{
  "graphql-yoga": "^1.18.3"
}
```

# {{ $frontmatter.title }}

See the tutorial [GraphQL subscriptions with Node.js and Express](https://blog.logrocket.com/graphql-subscriptions-with-node-js/) at <https://blog.logrocket.com/graphql-subscriptions-nodejs-express>

## The Query Object: queries

### Schema

```graphql
  type Query {
        getPosts: [Post!]!
        getPost(query: String!): [Post]
    }
```   

### Resolvers for the queries

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
    Mutation: { ... },
    Subscription: { ... },
}
```

### Example of query `getPost`

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

### Example of answer to the query `getPost`

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

### createPost

### typeDef for createPost

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

### Resolver for createPost

```js
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

### Sending createPost Mutations

#### Invalid example 

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

#### Valid Example

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

## Full typeDef Code

```graphql 
  type Query {
        getPosts: [Post!]!
        getPost(query: String!): [Post]
    }

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

        updatePost(
          id:ID!
          title:String!
          subtitle:String
          body:String!
          published:Boolean
          author: String!
          upvotes: Int
          downvotes: Int
          commentCount: Int
        ): Post!
        
        deletePost(id: ID!): Post!
        
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
    }

    type Subscription {
        post: SubscriptionPayload
    }
    
    type SubscriptionPayload {
        mutation: String
        data: Post
    }
```

## Full code of resolvers

```js 
const resolvers = {
    Query: {
        // return all posts
        getPosts() {
            return posts;
        },
        // return post by args passed, for now it just check for body and 
        // title for the post
        getPost(parent, args) {
            console.log(args);
            return posts.filter((post) => {
                console.log(post.title, post.id)
                const inBody = post.body.toLowerCase().includes(args.query.toLowerCase())
                const inTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
                console.log(inTitle)
                return inBody || inTitle;
            });
        }
    },

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
        updatePost(parent, args, { pubsub }) {
            const id = parseInt(args.id, 10);
            const postIndex = posts.findIndex((post) => post.id === id);
            if (postIndex !== -1) {
                const post = posts[postIndex];
                const updatedPost = {
                    ...post,
                    ...args
                };
                posts.splice(postIndex, 1, updatedPost);
                pubsub.publish('post', {
                    post: {
                        mutation: 'UPDATED',
                        data: updatedPost
                    }
                });
                return updatedPost;
            }
            throw new Error('Post does not exist!');
        },
        deletePost(parent, args, { pubsub }) {
            const id = parseInt(args.id, 10);
            const isPostExists = posts.findIndex((post) => post.id === id);
            if (isPostExists === -1) {
                throw new Error('Post does not exist!');
            }
            //splice will return the index of the removed items from the array object
            const [post] = posts.splice(isPostExists, 1);
            // return post;
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
            return post;
        },
    },

    Subscription: {
        post: {
            subscribe(parent, args, { pubsub }) {
                return pubsub.asyncIterator('post');
            }
        }
    },
}
```

## Execution 

![](/images/graphql/graphql-mutation.png)


![](/images/graphql/graphql-subscription-notification.png)

## References

* [See folder `subscriptions/hello/ in the repo `crguezl/graphql-yoga-examples`](https://github.com/crguezl/graphql-yoga-examples/blob/main/subscriptions/hello/index.js)
* [Tutorial](https://pusher.com/tutorials/chat-graphql-subscriptions/) *Building live chat app with GraphQL subscriptions*
  * [Repo crguezl/graphql-subscriptions-with-node-js](https://github.com/crguezl/graphql-subscriptions-with-node-js)
* [apollographql/graphql-subscriptions](https://github.com/apollographql/graphql-subscriptions)
* [Realtime GraphQL Subscriptions](https://www.howtographql.com/graphql-js/7-subscriptions/) from GRAPHQL-NODE TUTORIAL. Written by Maira Bello: Build your own GraphQL server

<youtube  id="bn8qsi8jVew"></youtube>