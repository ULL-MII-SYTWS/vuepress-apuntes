---
title: "Async Await"
published: true
date: "2023/10/31 04"
campus: "https://campusdoctoradoyposgrado2324.ull.es/mod/assign/view.php?id=4068"
delivery: "2023/10/18"
key: async-await
layout: Practica
order: 13
sidebar: auto
prev: callback-2-promise.md
next: #generators.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


Read chapters [Microtasks](https://javascript.info/microtask-queue), [Async/Await](https://javascript.info/async-await) and [Event Loop](https://javascript.info/event-loop) (and specially section [Macrotasks and Microtasks](https://javascript.info/event-loop#macrotasks-and-microtasks)) of the <https://javascript.info> book and make a report using the GitHub Classroom assigned repo. Solve the exercises.

## Exercise 1: MicroTask and MacroTask Queues

Answer this question before running the program.

What is the output of this program?

```js
setTimeout(function () { //C1
    console.log('macrotask 1');
}, 0);

Promise.resolve().then(function () { // P1
    console.log('microtask 1');
    setTimeout(function () {  // C2
        console.log('macrotask 2');
        Promise.resolve().then( // P3
            () => console.log('Nested microtask 3')
        )
    }, 0);
}).then(function () { // P2
    console.log('microtask 2');
});
```

Explain the changes in the stack, the running environment, the macrotask queue and the microtask queue. Make pictures of the way the callbacks and handlers go and leave the queues. Take screenshots of them and upload them to the assignment repo

* Code at: `campus-virtual/2021/sytws2021/apuntes/tema2-async/event-loop/exercises/promises/microtask-queue/promise-job-queue-2.js`

## Exercise 2: MicroTask and MacroTask Queues

The following example is taken from a stackoverflow question

* [setTimeout / Promise.resolve: Macrotask vs Microtask](https://stackoverflow.com/questions/51793906/settimeout-promise-resolve-macrotask-vs-microtask)

Don't look at the debate yet.
Also, try to answer this question before running the code.

What is the output of this program?

```js
// See https://stackoverflow.com/questions/51793906/settimeout-promise-resolve-macrotask-vs-microtask
for (let i = 0; i < 2; i++) {
	setTimeout(() => { // M1
		console.log("Timeout ", i);
		Promise.resolve().then(() => { // P1
			console.log("Promise 1 ", i);
		}).then(() => { // P2
			console.log("Promise 2 ", i);
		});
	})
}
```

Explain the changes in the stack, the running environment, the macrotask queue and the microtask queue. Make pictures of the way the callbacks and handlers go and leave the queues. Take screenshots of them and upload them to the assignment repo

<!-- * Solution at: `tema2-async/event-loop/exercises/promises/async-await/stackoverflow-promise-resolve-and-queues.js` -->

## Exercise 3: Rewrite a `fetch` using async/await instead of promises

Rewrite this example code from the Javascript.info book, section [Bigger example: fetch](https://javascript.info/promise-chaining#bigger-example-fetch) using `async/await` instead of `.then/catch`:

```js
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('no-such-user.json').catch(console.log); // Error: 404
```

<!-- Solution at `campus-virtual/2021/sytws2021/apuntes/tema2-async/event-loop/exercises/promises/async-await/solution-2-rewrite-loadjson-using-async-await.html` -->

## Exercise 4: Rewrite "rethrow" with async/await

Below you can find another exercise from the book javascript.info [Rewrite "rethrow" with async/await](https://javascript.info/task/rewrite-async-2)). 

The code keep asking for a GitHub user until a valid login is given. 

Rewrite it using `async/await` instead of `.then/catch` and get rid of the recursion in favour of a loop in `demoGithubUser`: with `async/await`.

```js 
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

* See Section [Custom errors, extending Error](https://javascript.info/custom-errors). It is worth to read the [full chapter Error Handling](https://javascript.info/error-handling)
* See [The Error Class at MDN: The constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#constructor)

## Exercise 5: Call async from non-async

Here is another exercise from the [JavaScript.Info book](https://javascript.info/async-await#call-async-from-non-async). As the book says, it is a task that solves a quite common for developers new to async/await.

**We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?**

Give at least two solutions.

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

<!-- Solution at `tema2-async/event-loop/exercises/promises/async-await/solution-call-async-from-nonasync.html` -->

## Exercise 6: ## Exercise: Rendering

Explain the differences in behavior between the two progress bar programs: 

- counting-progress-bar-macro.html
- counting-progress-bar.html

```
 async-await-solution git:(main) ✗ cat queue-microtask/counting-progress-bar-macro.html 
 ```
 ```html
<div id="progress"></div>

<script>
  // If we split the heavy task into pieces using setTimeout, 
  // then changes are painted out in-between them.
  let chunkSize = 1e5; // 1e5;
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % chunkSize != 0);

    if (i < 1e7) { // call recursively if incomplete
      setTimeout(count);
    }

  }

  count();
</script>
```
and 

```
➜  async-await-solution git:(main) ✗ cat queue-microtask/counting-progress-bar.html      
``` 
```html
<!doctype html>
<body>
<div id="progress"></div>

<script>
  /* 
  Here’s an example with “counting progress bar”, but queueMicrotask is used instead of setTimeout. 
  You can see that it renders at the very end. 
  */
  let i = 0;

  function count() {
    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);
    //console.log(i);
    if (i < 1e6) {
      queueMicrotask(count);
    }
  }

  count();
</script>
</body>
```

Why is it so?


## Exercise 7: The GitHub REST API

The GitHub API doc for the end-point to get the public info for an user is here [GitHub API REST Docs: Get a User](https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-a-user). Here are several examples of how to get the info:

```
gh api /users/crguezl --jq '.name'
```

or with `curl`

```
✗ curl \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/users/crguezl | jq '.name'
```

or using the `@octokit/core`module:

```
cat the-github-api/octokit--example.js 
```
```js
const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

async function getUsername (name) {
  return await octokit.request('GET /users/{username}', {
    username: name
  })
}

getUsername('crguezl').then(r => console.log('NAME: ', r.data.name))

async function getRepos (name) {
  return await octokit.graphql(
    `query ($login: String!) {
      organization(login: $login) {
        repositories(privacy: PRIVATE, first: 100) {
          totalCount
        }
      }
    }`,
    { login: name }
  )
}

getRepos('ULL-MII-SYTWS-2223').then(r =>
  console.log('REPOS: ', r.organization.repositories.totalCount)
```

Reproduzca los requests de ejemplo hechos en esta sección.

<!-- * Solution at `/campus-virtual/2021/sytws2021/apuntes/tema2-async/event-loop/exercises/promises/async-await/solution-more-complex-example.html` -->


## See

* [JavaScript.Info book: Bigger example: fetch](https://javascript.info/promise-chaining#bigger-example-fetch)
* [Custom errors, extending Error](https://javascript.info/custom-errors)
* For the solutions:
  * `campus-virtual/2021/sytws2021/apuntes/tema2-async/event-loop/exercises/promises/microtask-queue`
  * `campus-virtual/2021/sytws2021/apuntes/tema2-async/event-loop/exercises/promises/async-await`

