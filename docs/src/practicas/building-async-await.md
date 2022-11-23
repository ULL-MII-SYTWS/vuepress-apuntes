---
title: "Building our own Async-Await using Generators and Promises"
published: true
date: "2022/11/09 02"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=790"
delivery: "2022/11/30"
key: building-async-await
layout: Practica
order: 15
sidebar: auto
prev: generators.md
next: for-await.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

## Goal: Async-Await ≈ Generators + Promises

Imagine we are given a piece of code like the one below that uses async functions, 


```js
function doTask1(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 100)
    })
}

function doTask2(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+2), 100)
    })
}

function doTask3(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+3), 100)
    })
}

async function init(arg) {
    const res1 = await doTask1(arg);
    console.log(res1);
    
    const res2 = await doTask2(res1);
    console.log(res2);

    const res3 = await doTask3(res2);
    console.log(res3);

    return res3;
}

init(3);
```

It performs three asynchronous tasks, one after the other where each task depends on the completion of the previous task. Finally, it returns the result of the last task.

::: danger Goal
* How can we rewrite this code  using **only** promises and generator functions?
* and we don't want ot make a chain of `promise.then`!
* How can we reinvent/rebuild our own **async** and **await**?
::: 

## Remember Generators

::: tip Remember:

* When a generator function is called, its body is not executed right away. 
* Instead it returns an iterator object which adheres to the iterator protocol i.e. it has a `next` method.
* The only way to execute the body of the generator is by calling the `next` method on its iterator-object. 
* Every time the `next` method is called, its body is executed until the next `yield` expression. 
* The result of `next()` is always an object with two properties:
  - `value`: the yielded value.
  - `done`: `true` if the function code has finished, otherwise `false`
* This `next` method also accepts an `argument`. 
* Calling it with an `argument` 
  - Makes the `argument`the value of the current yield expression and 
  - Resumes the execution till the next `yield` expression
:::

## First Idea: Generators can yield Promises

By now you would be wondering, how do the generator functions help to achieve our goal? 

We need to model an asynchronous flow where we have to wait for certain tasks to finish before proceeding ahead. How can we do that?

Well, the most important insight here is that the **generator-functions can yield promises too**.

* A generator function can yield a promise (for example an async task), and 
* its iterator can be controlled to halt for this promise to resolve (or reject), and then 
* recursively proceed with the resolved (or rejected) value to ask for the next iteration. 

## Rewriting the Async Function as a Generator

This pattern of weaving a an iterator with yielded promises allows us to model our requirement like this:

<a id="generator"></a>

```js
function doTask1(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 100)
    })
}

function doTask2(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+2), 100)
    })
}

function doTask3(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg+3), 100)
    })
}

function* init(arg) {
    const res1 = yield doTask1(arg);
    console.log(res1);
    
    const res2 = yield doTask2(res1);
    console.log(res2);

    const res3 = yield doTask3(res2);
    console.log(res3);

    return res3;
}
```

Notice how this generator function resembles our async function! 

If you change `yield` for `await` is the same code!

The `init` can be called this way:

```js 
// no async no await
g.next().value.then(
  res1 => g.next(res1).value.then(
      res2 => g.next(res2).value.then(
          res3 => Promise.resolve(g.next(res3).value).then(
              returnValue => console.log(`returnValue ${returnValue}`)
          )
      )
  )
)
```

That produces an output like:

``` 
✗ node no-async-await-1.js
3
5
8
Final result: {"value":8,"done":true}
```

Unfortunately, this current solution is not free of `.then`chains.

We need something better.

::: tip Idea
The problem resembles the `asyncserialize` function we wrote in a previous lab where we found a solution
making use of recursivity and detecting when all the tasks were done.
:::

## Write the Function Controlling the Execution of the Generator

Now we need a controlled way to execute `init`. 

We need to write a function `waiter` that can control the iterator of this generator function to "*wait for the fulfillment of the promise yielded on each iteration*". It has to:

1. Halt every time a promise is yielded and 
2. Proceeds once the promise resolves (or rejects). 

::: tip Precise Goal
Write a function `waiter(generator, arg)` that

```js
/**
 * Builds the generator object for genFun and returns the waiting function
 * @param { generator } genFun - the generator function
 * @param { any } arg     - the argument to pass to the generator function
 * @returns { function }  - a function that executes the generator waiting for each yielded promise
 */
function waiter(genFun, arg) 
```

1. creates a `generator`  by calling `genFun(arg)` and 
2. returns an auxiliary  function  `waitAndrun` (Something like we did in the auxiliary callback in the asyncserialize lab)
3. The returned auxiliary function `waitAndRun` has to
   - Get the current promise via `.next` and
   - Wait for that promise to be fulfilled and
   - call recursively itself unless the iterator is exhausted
 
It will be used like this:

```js
const doIt = waiter(init, 3);
doIt();
```
or shorter:

```js
waiter(init, 3)();
```
:::

So that, when we run it with the [generator above](#generator), we obtain:

```
➜  async-await-equal-generators-plus-promises git:(main) ✗ node solution.js 
3
5
8
```

It sounds complicated, but takes only a few lines to implement.

Heres is a [solution](/practicas/building-async-await/solution)

## See

* [Async-Await ≈ Generators + Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2) at [https://hackernoon.com/](https://hackernoon.com/)  Cha on July 26th 2017
<!-- * [Solution](solutions/async-await-is-generators-and-promises) to this problem -->
* [Repo ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises](https://github.com/ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises) (private)
