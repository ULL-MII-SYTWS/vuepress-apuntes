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
prev: building-async-await.md
next: for-await.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

Add error management to the home-made Async-Await implementation you did in the [previous lab](/practicas/building-async-await.html)
so that a program like this:

```js
import { awaitFor, catched, waiter } from './async-await.mjs';

function doTask1(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 100)
    })
}

function doTask2(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg + 2), 100)
    })
}

function doTask3(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg + 3), 100)
    })
}

function doTaskErr(arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("Ay!!!!!!!!", 100))
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

function* fails(arg) {
    try {
        console.log("Error handling example");

        const res1 = awaitFor(yield doTask1(arg));
        console.log(res1);

        const res2 = awaitFor(yield doTaskErr(res1));
        console.log(res2);

        const res3 = awaitFor(yield doTask3(res2));
        console.log(res3);

        return res3;
    } catch (err) {
        console.log(`Inside "fails" catch: ${err}`);
        catched(err);    
    }
}

function* main() {
    try {
        const res = awaitFor(yield waiter(init, 3)());
        console.log(`res=${res}`);
        awaitFor(yield waiter(fails, 3)());
        console.log(`Executed since the error was catched`);
    } catch (err) {
        console.log(`Inside "main" catch: ${err}`);
    }
}

waiter(main)();

/* // Alternatively:
const doIt = waiter(init, 3);
doIt().then( () => {
    const doErr = waiter(fails, 3);
    doErr();
});
*/
```

should produce an output like this:

```
➜  async-await-equal-generators-plus-promises git:(trycatch) ✗ node solution.mjs
3
5
8
res=8
Error handling example
3
Inside catch: Error: Ay!!!!!!!!
Executed since the error was catched
```

## Delivery

Use the  repository created for the [previous lab](/practicas/building-async-await.html).
Create a branch called `trycatch` and develop your solution to this lab in it. 

## See

* [Async-Await ≈ Generators + Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2) at [https://hackernoon.com/](https://hackernoon.com/)  Cha on July 26th 2017
<!-- * [Solution](solutions/async-await-is-generators-and-promises) to this problem -->
* [Repo ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises](https://github.com/ULL-MII-SYTWS-2021/async-await-equal-generators-plus-promises) (private)
