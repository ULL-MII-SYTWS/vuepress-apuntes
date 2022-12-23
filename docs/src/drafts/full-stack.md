---
title: Full Stack GraphQL Web App with Vue
published: true
date: "2022/12/21 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=35670"
delivery: "2023/01/16"
permalink: /practicas/full-stack/
key: full-stack
layout: Practica
order: 25
sidebar: auto
prev: 
next: 
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## Goal

Read the blogs:

* [Build a GraphQL API with Node](https://blog.jscrambler.com/build-a-graphql-api-with-node/) By Ahmed Bouchefra
* [Building a CRUD App with Vue and GraphQL](https://blog.jscrambler.com/building-a-crud-app-with-vue-and-graphql/) By Ahmed Bouchefra

reproduce the steps and improve the example web app  

This assignment requires  two repos, one with the client and the other with the server.


* [Server Repo](https://github.com/crguezl/server-graphql-hello)
* [Client Repo](https://github.com/crguezl/client-graphql-vue-hello/tree/main)

In the branch `solution` of each of those repos you will find the solution to this lab.

## Prerequisites

You will need for this lab:

-   Knowledge of Vue.

## Enabling CORS in the Server

Since we are sending requests locally between two different ports which
are considered as two separate domains we'll need to enable
[Cross-Origin Resource Sharing](https://blog.jscrambler.com/understanding-cors-cross-origin-resource-sharing/)
(CORS) in the server.

First, clone the code from the [GitHub repository](https://github.com/JscramblerBlog/node-express-graphql-api):

```
git clone https://github.com/JscramblerBlog/node-express-graphql-api.git
```

Next, navigate to your project and install the dependencies and the
`cors` module:

```
cd node-express-graphql-api
npm install
npm install cors --save
```

After that, open the `index.js` file and import the `cors` module:

```
    const cors = require('cors');
```

Then, add the `cors` middleware to the Express app:

```
    const  app  =  express();
    app.use(cors())
```

Finally, start the server:

```
node index.js
```

Your GraphQL server will be available from the `http://localhost:4000/`
address.

## Installing the Apollo Client

[Apollo](https://www.apollographql.com/) is a set of utilities to help
you use GraphQL in your apps. It\'s well known for its
[client](https://www.apollographql.com/client) and its
[server](https://www.apollographql.com/server).

Open a new terminal, navigate to your project's folder and run the
following command to install the Apollo client in your Vue project:

```
npm install --save vue-apollo graphql apollo-boost
```

Apollo Boost is a zero-config way to start using Apollo Client. It
includes some common defaults, such as the recommended `InMemoryCache`
and `HttpLink`, which come configured for you with the recommended
settings. It\'s suitable for starting to develop fast.

In the `src/main.js` file, add the following code to create an instance
of the Apollo client and connect it to our GraphQL server running at
`http://localhost:4000/graphql`:

```js
    import ApolloClient from "apollo-boost"
    import VueApollo from "vue-apollo"
    
    const apolloClient = new ApolloClient({
      uri: "http://localhost:4000/graphql"
    })
    
    Vue.use(VueApollo)
    const apolloProvider = new VueApollo({
      defaultClient: apolloClient,
    })
```

We import Apollo Client from the `apollo-boost` package and `VueApollo`
from the `vue-apollo` package. Next, we create an instance of the Apollo
Client and we pass in the URL of our GraphQL endpoint.

Then, we use the `VueApollo` plugin to integrate Apollo with our Vue
application.

Finally, we create the Apollo Provider which holds the instance of the
Apollo Client that will be available to all Vue components.

All we have to do now is adding the Apollo Provider to the Vue instance
using the `apolloProvider` option:

```js
    new Vue({
      render: h => h(App),
      apolloProvider,
    }).$mount('#app')
```

That's it. We are now ready to use the Apollo client in our Vue app.

See the
[docs](https://vue-apollo.netlify.com/guide/installation.html#manual-installation)
for more information.

## Consuming the GraphQL API 

After adding `vue-apollo` to our app, all our components can use Apollo
through the `apollo` option.

First, open the `src/App.vue` component and add the `data()` function to
the exported object with the following variables:

```js
    <script>
    export default {
      name: 'app',
      data(){
        return {
          id: null,
          firstName: '',
          lastName: '',
          email: ''}
      },
```

We define four component variables, which are `id`, `firstName`,
`lastName`, and `email`. These will be bound to the HTML form for
creating a new contact.

**Sending a GraphQL Query for Reading Data**

Next, import `gql` from the `graphql-tag` package and add the `apollo`
object to the component with the query that we'll be making to read the
contacts from the GraphQL API:

```js
    <script>
    import gql from 'graphql-tag'
    
    export default {
      name: 'app',
      /* [...] */
      apollo: {
        contacts: gql`query {
          contacts {
            id,
            firstName,
            lastName,
            email
          }
        }`,
      },
```

`gql` is a JavaScript template literal tag that parses GraphQL query
strings into the standard GraphQL AST. Find more information from [the
official repository](https://github.com/apollographql/graphql-tag).

In the `apollo` object, we added a `contacts` attribute that will hold
the results of the `contacts` query. Later, we'll use it to display the
contacts in the template.

**Sending Mutation Queries for Creating, Updating and Deleting Data**

Next, add the `createContact()`, `updateContact()` and `deleteContact()`
methods as follows:

```js
      methods: {
        createContact(firstName, lastName, email){
          console.log(`Create contact: ${email}`)
          this.$apollo.mutate({
              mutation: gql`mutation createContact($firstName: String!, $lastName: String!, $email: String!){
                createContact(firstName: $firstName, lastName: $lastName, email: $email) {
                  id,
                  firstName,
                  lastName,
                  email}
              }`,
              variables:{
                firstName: firstName,
                lastName: lastName,
                email: email
              }
            }
          )
          location.reload();
        },
        updateContact(id, firstName, lastName, email){
          console.log(`Update contact: # ${id}`)
          this.$apollo.mutate({
              mutation: gql`mutation updateContact($id: ID!, $firstName: String!, $lastName: String!, $email: String!){
                updateContact(id: $id, firstName: $firstName, lastName: $lastName, email: $email)
              `,
              variables:{
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email
              }
            }
          )
          location.reload();
        },
        deleteContact(id){
          console.log(`Delete contact: # ${id}`)
          this.$apollo.mutate({
              mutation: gql`mutation deleteContact($id: ID!){
                deleteContact(id: $id)
              }`,
              variables:{
                id: id,
              }
            }
          )
          location.reload();
        },    
      }
```

In the three methods, we use the `this.$apollo.mutate()` method to send
mutations to the GraphQL server and we call the `location.reload()`
method to reload the page.

See the
[docs](https://vue-apollo.netlify.com/guide/components/mutation.html)
for more information about sending mutations.

Next, add the `selectContact()` and `clearForm()` methods in the
`methods` object:

```
        selectContact(contact){
          this.id = contact.id;
          this.firstName = contact.firstName;
          this.lastName = contact.lastName;
          this.email = contact.email;
        },
        clearForm(){
          this.id = null;
          this.firstName = '';
          this.lastName = '';
          this.email = '';
        }
```

These two methods will be used to select a contact from the table into
the form and clear the form.

## Adding the Template

Let's now add a table and form for displaying, creating, updating and
deleting contacts. Let's start with the HTML table:

```html
    <template>
      <div id="app">
      <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th>First Name</th>
         <th>Last Name</th>
         <th>Email</th>
         <th>Actions</th>
       </tr>
    
       <tr v-for='contact in contacts'>
         <td>{{ contact.firstName }}</td>
         <td>{{ contact.lastName }}</td>
         <td>{{ contact.email }}</td>
         <td>
          <input type="button" @click="selectContact(contact)" value="Select">
          <input type="button" @click="deleteContact(contact.id)" value="Delete">
         </td> 
       </tr>
     </table>
```

We use the `v-for` directive to iterate over the `contacts` property of
the Apollo object which holds the contacts fetched from the server. We
also add two buttons for selecting and deleting the corresponding
contact.

Next, let's add the form below the table:

```html
    </br>
        <form>
          <label>First Name</label>
          <input type="text" name="firstName" v-model="firstName">
          </br>
    
          <label>Last Name</label>
          <input type="text" name="lastName" v-model="lastName">
          </br>
    
          <label>Email</label>
          <input type="email" name="email" v-model="email">
          </br>
          
          <input v-if="!id" type="button" @click="createContact(firstName, lastName, email)" value="Add">
          <input v-if="id" type="button" @click="updateContact(id, firstName, lastName, email)" value="Update">
          <input type="button" @click="clearForm()" value="Clear">
          
        </form>
    
    </div>
    </template>
```

We created a form with three inputs that are bound to the `firstName`,
`lastName` and `email` variables declared in the component. We also
added three buttons for creating a new contact, updating a selected
contact and clearing the form.


## Optional Extensions

### Deploy in Heroku

* [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)

### Add authentication

* See [Handling authentication in your GraphQL-powered Vue app](https://blog.logrocket.com/handling-authentication-in-your-graphql-powered-vue-app/) by [Anjolaoluwa Adebayo-Oyetoro](https://blog.logrocket.com/author/anjolaoluwaadebayooyetoro/)


## References

* [Build a GraphQL API with Node](https://blog.jscrambler.com/build-a-graphql-api-with-node/) By Ahmed Bouchefra
* [Building a CRUD App with Vue and GraphQL](https://blog.jscrambler.com/building-a-crud-app-with-vue-and-graphql/) By Ahmed Bouchefra

* [Server Repo](https://github.com/crguezl/server-graphql-hello)
* [Client Repo](https://github.com/crguezl/client-graphql-vue-hello/tree/main)
