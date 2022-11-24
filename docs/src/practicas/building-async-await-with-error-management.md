---
title: "Adding Error Management to our own Async-Await"
published: true
date: "2022/11/09 03"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=790"
delivery: "2022/11/30"
key: building-async-await
layout: Practica
order: 16
sidebar: auto
prev: generators.md
next: for-await.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

Add error management to your own home made Async-Await implementation you did in the previous lab 
so that a program like this:

```js
import { awaitFor, waiter } from './async-await.mjs';

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

function doTaskErr(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("Ay!!!!!!!!", 100))
    })
}

function* fails(arg) {
    try {
        console.log("Error handling example");
        const res1 = awaitFor(yield doTask1(arg));
        console.log(res1);
        const res2 = awaitFor(yield  doTaskErr(res1));
        console.log(res2);
        const res3 = awaitFor(yield  doTask3(res2));
        console.log(res3);
        return res3;
    } catch (err) {
        console.log(`Inside catch: ${err}`);
    }
}

function* main() {
    yield waiter(fails, 3)();
    console.log(`Executed since the error was catched`);
}

waiter(main)();
``` 

should produce an output like this:

```
➜  async-await-equal-generators-plus-promises git:(trycatch) node solution.mjs
Error handling example
3
Inside catch: Error: Ay!!!!!!!!
Executed since the error was catched
```

## See

* [Async-Await ≈ Generators + Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2) at [https://hackernoon.com/](https://hackernoon.com/)  Cha on July 26th 2017
<!-- * [Solution](solutions/async-await-is-generators-and-promises) to this problem -->
* [Repo ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises](https://github.com/ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises) (private)
