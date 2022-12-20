---
title: "GraphQL Simple Server"
published: true
date: "2022/12/01 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=35670"
delivery: "2022/12/21"
#permalink: /practicas/graphql-server
key: graphql-server
layout: Practica
order: 22 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/jq-exercises.md
next: /practicas/graphql-subscriptions.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---
- [{{ $frontmatter.title }}](#-frontmattertitle-)
  - [Requisitos](#requisitos)
  - [Set up](#set-up)
  - [GraphQL Schema](#graphql-schema)
    - [Types](#types)
    - [Type modifiers](#type-modifiers)
    - [null and Error Management](#null-and-error-management)
    - [Interfaces](#interfaces)
    - [Arguments](#arguments)
    - [buildSchema](#buildschema)
  - [Resolvers](#resolvers)
  - [Phases of a GraphQL Query](#phases-of-a-graphql-query)
    - [Example](#example)
    - [Validation](#validation)
    - [Execution](#execution)
    - [Default resolvers](#default-resolvers)
    - [Resolver arguments](#resolver-arguments)
  - [Starting the express-graphql middleware](#starting-the-express-graphql-middleware)
  - [Running and Testing with GraphiQL](#running-and-testing-with-graphiql)
  - [Ejercicios](#ejercicios)
  - [References](#references)
    - [Introduction to GraphQL](#introduction-to-graphql)
    - [Error Management](#error-management)
    - [Express-GraphQL](#express-graphql)
    - [GraphiQL](#graphiql)
    - [Parsing, Validation and Execution](#parsing-validation-and-execution)
    - [Template repo](#template-repo)
  - [FootNotes](#footnotes)


# {{ $frontmatter.title }}

## Requisitos

Usando los módulos npm [express](https://expressjs.com/), [graphql-http](https://github.com/graphql/graphql-http) o bien [express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) y [graphql](https://graphql.org/) complete el código web de la asignación que implementa un pequeño servicio web con una API GraphQL y pruébela usando [GraphiQL](/practicas/graphql-server.html#graphiql).

## Set up

Para hacer esta práctica empezaremos instalando los módulos que necesitamos y luego en `index.js` importamos las correspondientes funciones:

```js
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
```

Puede aprovechar cualquier hoja de cálculo que tenga a mano y la exporta a CSV, para  usarla como datos de entrada para hacer las pruebas en esta práctica.

Después, puede usar el módulo [csvtojson](https://github.com/Keyang/node-csvtojson#command-line-usage) para convertir los datos a un objeto JS.

```js
const csv=require('csvtojson')
const port = process.argv[2] || 4006;
const csvFilePath = process.argv[3] || 'SYTWS-2122.csv'
const data = String(fs.readFileSync(csvFilePath))
```

Para hacer el parsing del fichero CSV podemos llamar a `csv().fromFile(<file>)` o bien puede usar el ejecutable de línea de comandos que provee `$ csvtojson [options] <csv file path>`.

```js
async function main () {
    let classroom = await csv().fromFile(csvFilePath);
    ...
}
```

Esto deja en `classroom` un array con las filas del CSV. En este caso de ejemplo, la información sobre las calificaciones de los estudiantes.

Uno de los primeros pasos a la hora de construir un servicio GraphQL es definir el esquema GraphQL usando el lenguaje SDL.

## GraphQL Schema 

A **GraphQL schema**[^GSL] is at the center of any GraphQL server implementation and describes the functionality available to the clients which connect to it. An Schema is written using the **Schema Definition Language (SDL)**[^SLCS], that defines
the syntax for writing GraphQL Schemas. It is otherwise known as **Interface Definition Language**. It is the lingua franca shared for building GraphQL APIs regardless of the programming language chosen.

Here is an example of a GraphQL Schema written in SDL (file [aluschema.gql](https://github.com/ULL-MII-SYTWS/graphql-server-template/blob/main/aluschema.gql)):

```graphql
  type Student {
      AluXXXX: String!
      Nombre: String!
      markdown: String
  }

  type Query {
      students: [ Student ]
      student(AluXXXX: String!): Student
  }

  type Mutation {
      addStudent(AluXXXX: String!, Nombre: String!): Student
      setMarkdown(AluXXXX: String!, markdown: String!): Student 
  }
```

In addition to queries and mutations, GraphQL supports a third operation type: **[subscriptions](/temas/web/graphql/hello-subscriptions.html)**

Like queries, [subscriptions](/temas/web/graphql/hello-subscriptions.html) enable you to fetch data. Unlike queries, subscriptions are long-lasting operations that can change their result over time. They can maintain an active connection to your GraphQL server (most commonly via [WebSocket](/temas/web/websockets)), enabling the server to push updates to the subscription's result.

### Types 

GraphQL SDL is a typed language. 

Every GraphQL service has a `query` type and may or may not have a `mutation` type. 
These types are the same as a regular [object type](https://graphql.org/learn/schema/#object-types-and-fields), but they are special because they define the **entry point of every GraphQL query**. It's often called the `Root` type or the `Query` type.

Types can be **Scalar** or can be composed as the `Student` type in the former example.

GraphQL ships with some scalar types out of the box; `Int`, `Float`, `String`, `Boolean` and `ID`. 

[Object types](https://graphql.org/learn/schema/#object-types-and-fields), scalars, and [enums](https://graphql.org/learn/schema/#enumeration-types) are the only kinds of types you can define in GraphQL. 

### Type modifiers

But when you use the types in other parts of the schema, or in your query variable declarations, you can apply additional **type modifiers** that affect **validation** of those values. 

* **List** - `[]` - A list is a type modifier that represents an array of a type. Lists can be nested. For example, `[Int]` represents an array of integers, and `[[String]]` represents an array of arrays of strings.
* The **Non-Null** type modifier can also be used when defining arguments for a field. For  example, `myField: [String!]` means that the list itself can be `null`, but it can't have any `null` members. 
  
### null and Error Management

* By default, every type is **nullable** - it's legitimate to return `null` as any of the scalar types. 
* The fields whose types have an exclamation mark, `!`, next to them are **non-null** fields. These are fields that won’t return a `null` value when you query them. 

The convention is that if there's an error in the GraphQL layer while executing a request, the response is still  `200` but the server returns a root field called `errors` (with subfields like `locations` to spot the place), from which the client can extract them, and a root field called `data` that has all the requested fields. Any fields with errors have the value `null`.

![/images/graphql/graphql-null-error-management-1.png](/images/graphql/graphql-null-error-management-1.png)

### Interfaces

[Interfaces](https://graphql.org/learn/schema/#interfaces) are a way to describe a set of fields that a type must include to implement the interface. 

```graphql
  interface Pupil {
      AluXXXX: String!
      Nombre: String!
  }

  type Student implements Pupil {
      AluXXXX: String!
      Nombre: String!
      markdown: String
  }
```

This means that any type that implements `Pupil` needs to have these exact fields, with these arguments and return types.

### Arguments

Every field on a GraphQL object type can have zero or more [arguments](https://graphql.org/learn/schema/#enumeration-types), for example the query for a student:

```graphql
  type Query {
      students: [ Student ]
      student(AluXXXX: String!): Student
  }
```

**All arguments are named**. Unlike languages like JavaScript  where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case, the `student` field has one defined argument, `AluXXXX`.

Arguments can be either required or optional. When an argument is **optional**, we can define a **default value** - For instance if the field `AluXXXX` was declared optional in the query we can write s.t. like:

```graphql
student(AluXXXX: String = 'alu01013090'): Student
``` 

if the `AluXXXX` argument is not passed, it will be set to `alu01013090` by default.

### buildSchema

The function `buildSchema` provided by the `graphql` module has the signature:


```js
function buildSchema(source: string | Source): GraphQLSchema
```

Creates a [GraphQLSchema object](https://graphql.org/graphql-js/type/#graphqlschema) from GraphQL schema language. 
The schema will use default **resolvers**[^RFR]. 

```js
const AluSchema = buildSchema(StringWithMySchemaDefinition)
```

## Resolvers

A **resolver** is a function that connects **schema fields** and **types** to various backends. 
Resolvers provide the instructions for turning a GraphQL operation into data. 

A resolver can retrieve data from or write data to anywhere, including a SQL, No-SQL, or graph database, a [micro-service](/tema2-async/message-queues.html), 
and a REST API. Resolvers can also return strings, ints, null, and other types.

To define our resolvers we create now the object `root` mapping the  schema fields (`students`, `student`, `addStudent`, `setMarkdown`) to their corresponding functions:

```js
  const root = {
    students: () => classroom,
    student: ({ AluXXXX }) => {
      let result = classroom.find(s => {
        return s["AluXXXX"] == AluXXXX
      });
      return result || null;
    },
    /* This console.log proves that parent argument is skipped. See README.md */
    addStudent: (object, args, context, info) => {
      console.log("======== parent is args =========")
      console.log(ins(object))

      console.log("======== args is context ========")
      console.log(ins(args.classroom));
      console.log(`accesing req object from the context: req.baseUrl=${args.req.baseUrl}!`)

      console.log("======== context is info ========")
      console.log(ins(context, 1));

      console.log("======== info is undefined ========")
      console.log(info);

      console.log("============= this is the parent ==============")
      console.log(this)

      const { AluXXXX, Nombre } = object;

      let result = args.classroom.find(s => {
        // console.log(`Processing ${insp(s, {depth:null})}`);
        return s["AluXXXX"] == AluXXXX
      });
      if (!result) {
        let alu = { AluXXXX: AluXXXX, Nombre: Nombre, "markdown": "" }
        console.log(`Not found ${Nombre}! Inserting ${AluXXXX}`)

        classroom.push(alu)
        return alu
      }
      // Update the student found
      result.Nombre = Nombre
      return result;
    },
    setMarkdown: ({ AluXXXX, markdown }) => {
      let result = classroom.findIndex(s => s["AluXXXX"] === AluXXXX)
      console.log(`Updating ${AluXXXX} with ${markdown}`)
      if (result === -1) {
        let message = `Student "${AluXXXX}" not found!`
        console.error(message);
        throw new Error(message) // will be catched by the GraphQL server
      }
      classroom[result].markdown = markdown
      return classroom[result]
    }
  }
```

Observe how `student` sometimes return `null` since it is allowed by the schema we have previously set.

## Phases of a GraphQL Query 

[Every GraphQL query goes through these phases](https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55):

1. Queries are parsed into an abstract syntax tree (or AST). See <https://astexplorer.net/> 
2. Validated: Checks for  query  correctness and check if the fields exist. 
3. Executed: The runtime walks through the AST, 
    1. Descending from the root of the tree, 
    2. Invoking resolvers, 
    3. Collecting up results, and 
    4. Emiting the final JSON

The picture below shows the stages of a GraphQL query:

![](/images/graphql-stages.png)

### Example

Suppose the following query:

<img src="/images/graphql-query.png" height="80%" />

after parsed we will have an Abstract Syntax Tree (AST) like the following:

<img src="/images/graphql-ast.png" />

In this example, the **root** Query type is the entry point to the AST and contains two fields, `user` and `album`. 

1. The `user` and `album` resolvers are usually executed in parallel or in no particular order. 
2. The AST is traversed breadth-first, meaning `user` must be resolved before its children `name` and `email` are visited. 
3. If the user resolver is **async**hronous, the user branch delays until its **resolved**. 
4. Once all leaf nodes, `name`, `email`, `title`, are resolved, execution is complete.

### Validation

Here is another figure illustrating how the GraphQL schema is used for validation of a query:

![](/images/graphql-schema-vs-query.jpeg)

### Execution

Typically, fields are executed in the order they appear in the query, but it’s not safe to assume that. Because **fields can be executed in parallel**, they are assumed to be 
* atomic, 
* idempotent, and 
* side-effect free.

A **resolver is a function that resolves a value for a type or field in a schema**. 

Resolvers can return objects or scalars like Strings, Numbers, Booleans, etc. 

- If an **Object** is returned, execution **continues to the next child field**. 
- If a **scalar** is returned (typically at a leaf node of the AST), execution completes. 
- If **`null`** is returned, execution halts and does not continue.

### Default resolvers

It’s worth noting that a GraphQL server has built-in default resolvers, so you don’t have to specify a resolver function for every field. A default resolver will look in root to find a property with the same name as the field. An implementation likely looks like this:

```js
export default {
    Student: {
        AluXXXX: (root, args, context, info) => root.AluXXXX,
        Nombre: (root, args, context, info) => root.Nombre,
        markdown: (root, args, context, info) => root.markdown

    }
}
```

This is the reason why there was no need to implement the resolvers for these fields.

### Resolver arguments

![](/images/graphql-resolver-arguments.png)

## Starting the express-graphql middleware

Now what remains is to set the express middleware `graphqlHTTP`. The picture below shows the 
way express middleware works:

![express middleware](/images/express-middleware.jpeg)

The express middleware `graphqlHTTP` is provided by the module `express-graphql` and it is used to create the GraphQL HTTP server:

```js
app.use(
    '/graphql',
    graphqlHTTP((request, response, next) => ({
      schema: AluSchema,
      rootValue: root,
      graphiql: {
        defaultQuery: data,
        headerEditorEnabled: true,
      },
      context: { classroom: classroom, req: request, res: response }
    })),
  );
```

It  has the following properties:

* **schema**, our GraphQL schema
* **rootValue**, our resolver functions
* **graphiql**, It can be a boolean stating whether to use [graphiql](https://youtu.be/5BwmvekYCpY), we want that so we pass an object describing the [graphiql options](https://github.com/graphql/express-graphql/blob/9eef4db29799e3f51dbf386ff779fd1c5f4e21fd/src/renderGraphiQL.ts#L10-L49)
* **context**, an object that is passed to all resolvers and can be used to contain per-request state, such as authentication information, dataloaders, etc.

::: danger
`express-graphql` was the first official reference implementation of using GraphQL with HTTP. It has existed since 2015 and was mostly unmaintained in recent years.

The official [GraphQL over HTTP](https://github.com/graphql/graphql-over-http) work group is standardizing the way you transport GraphQL over HTTP and it made great progress bringing up the need for a fresh reference implementation.

Read the [GraphQL over HTTP spec](https://graphql.github.io/graphql-over-http) for detailed implementation information. 

**Update your solutionto use [graphql-http](https://github.com/graphql/graphql-http), which is now the GraphQL official reference implementation of the [GraphQL over HTTP spec](https://graphql.github.io/graphql-over-http)**.

Here is an example of usage of `graphql-http` with express:

```js
import express from 'express'; 
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './previous-step';

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 4000 });
console.log('Listening to port 4000');
```

See [app.all](https://expressjs.com/en/4x/api.html#app.all)

::: 

## Running and Testing with GraphiQL

We can now run the app with 

* `npm start` or `nodemon index.js [port]`. 
* open the browser at  the url `http://localhost:4000/graphql`  to make graphql queries using GraphiQL.
* Move the JSON at the end of the Query panel to the Query Variables panel:

    ```json
    {
        "teacher": "crguezl",
        "nota": "NO APTO",
        "myId": "aluNuevo",
        "id1": "alu0101228587",
        "id2": "Alu0101232812"
    }
    ```
* The query panel contains an example of use of fragments. A **fragment** is basically a reusable piece of query. In GraphQL, you often need to query for the same data fields in different queries.

    ```Graphql
    fragment studentInfo on Student {
            Nombre
            AluXXXX
    }

    query ctrlBarra($id1: String!, $id2: String!) {
        # fragment example
        
        left: student(AluXXXX: $id1) {
            ... studentInfo
        }
        
        right: student(AluXXXX: $id2) {
            ... studentInfo
        }
    }
    ```

## Ejercicios

Reproduzca los ejemplos  [GraphQL Hello Worlds en](https://graphql.org/code/#javascript) <https://graphql.org/code/#javascript> Graphql.js y Apollo Server.

* https://graphql.org/graphql-js/
* https://www.apollographql.com/docs/apollo-server/getting-started

## References

### Introduction to GraphQL

* See inside the repo [crguezl/simple-graphql-express-server-example](https://github.com/crguezl/simple-graphql-express-server-example) the folder `simple-graphql-express-server-example/` with the example used in this description
* [GraphQL Glossary](https://www.apollographql.com/docs/resources/graphql-glossary/)
* [GraphQL Hello World](https://youtu.be/DyvsMKsEsyE). A YouTube list of videos by Ben Awad
  * [How GraphQL Resolvers Work](https://youtu.be/pI5CKxyrbiI)
* [GraphQL fragments explained](https://blog.logrocket.com/graphql-fragments-explained/)
* [GraphQL Resolvers: Best Practices](https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55) by Mark Stuart
* Youtube video [GraphQL Tutorial. Nos montamos una API con Nodejs y Express](https://youtu.be/atRadu-DKCE) 

### Error Management

* [Error Handling in GraphQL](https://dev.to/gethackteam/error-handling-in-graphql-42hp) 2020
* [Nulls in GraphQL: Cheatsheet](https://hasura.io/blog/graphql-nulls-cheatsheet/)

### Express-GraphQL

* [GraphQL HTTP Server Middleware: GitHub repo graphql/express-graphql](https://github.com/graphql/express-graphql)

### GraphiQL

* Queries y GraphiQL con la API de Rick & Morty (Curso express GraphQL)
  * <youtube id="5BwmvekYCpY"></youtube>
* [GraphiQL Shortcuts](https://github.com/graphql/graphiql/issues/670)
* Express-GraphQL: [graphiql options](https://github.com/graphql/express-graphql/blob/9eef4db29799e3f51dbf386ff779fd1c5f4e21fd/src/renderGraphiQL.ts#L10-L49)

### Parsing, Validation and Execution

* Life of a GraphQL Query by Christian Joudrey
  * [Life of a GraphQL Query — Lexing/Parsing](https://medium.com/@cjoudrey/life-of-a-graphql-query-lexing-parsing-ca7c5045fad8)
  * [Life of a GraphQL Query — Validation](https://medium.com/@cjoudrey/life-of-a-graphql-query-validation-18a8fb52f189) 
* [GraphQL Specification](https://spec.graphql.org/draft/)
* [graphql-js](https://github.com/graphql/graphql-js) the JavaScript reference implementation for GraphQL
* [Advanced GraphQL Patterns: Embrace the AST!](https://blog.smartive.ch/advanced-graphql-patterns-embrace-the-ast-4929647c5bd3) Overcoming the Fear of Apollo Server Internals. Nick Redmark
* <https://astexplorer.net/>


### Template repo

* <https://github.com/ULL-MII-SYTWS/graphql-server-template>

## FootNotes

[^GSL]: For more detail on the GraphQL schema language, see the [schema language docs](https://graphql.org/learn/schema/) 
[^SLCS]: <a href="https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6#.9oztv0a7n" target="_blank" rel="nofollow noopener noreferrer">Schema language cheat sheet</a>
[^RFR]: <a href="https://graphql.org/learn/execution/#root-fields-resolvers" target="_blank">Root fields & resolvers</a>
