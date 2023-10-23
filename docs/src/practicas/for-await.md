---
title: "Async Generators and for await"
published: true
date: "2023/10/23 01"
campus: "https://campusdoctoradoyposgrado2324.ull.es/mod/assign/view.php?id=4072"
delivery: "2023/11/08"
key: for-await
layout: Practica
order: 17
sidebar: auto
prev: building-async-await.md
next: #event-emitters.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

## Goal: Async Generators and for await

Read the chapter [Async iteration and generators](https://javascript.info/async-iterators-generators) of JavaScript.info reproducing the examples and exercises.

## Exercise: for-await-of in a first come first served order

If you use for-await-of on an array of promises, you iterate over it in the specified order, doesn't matter if the next promise in the given array is resolved before the previous one:

```javascript
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async function () {
    const arr = [
        sleep(2000).then(() => 'a'),
        'x',
        sleep(1000).then(() => 'b'),
        'y',
        sleep(3000).then(() => 'c'),
        'z',
    ];

    for await (const item of arr) {
        console.log(item);
    }
}());
```

Output:

```
➜  firstcomefirstserved git:(main) node examples/for-await-simple.js 
a
x
b
y
c
z
```

But sometimes you want to process the results as soon as the promises yield them. 

Write a Node.JS module `frstcmfrstsvd` that exports an async generator that can be used with for-await-of and provides the results in a first come first served order:

```javascript

import firstComeFirstServed from 'frstcmfrstsvd';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    'x',
    sleep(1000).then(() => 'b'),
    'y',
    sleep(3000).then(() => 'c'),
    'z',
];

console.log(firstComeFirstServed);

(async () => {
    for await (let item of firstComeFirstServed(arr)) {
        console.log("item = ",item);
    }
})()
```

Output:

```
➜  firstcomefirstserved git:(main) node examples/hello-frstcmfrstsvd.mjs 
[AsyncGeneratorFunction: frstcmfrstsvd]
item =  { value: 'x', index: 1, status: 'fulfilled' }
item =  { value: 'y', index: 3, status: 'fulfilled' }
item =  { value: 'z', index: 5, status: 'fulfilled' }
item =  { value: 'b', index: 2, status: 'fulfilled' }
item =  { value: 'a', index: 0, status: 'fulfilled' }
item =  { value: 'c', index: 4, status: 'fulfilled' }
```

## Error Management Example

Here is an example of how has to behave when there are rejections:

```js

import frstcmfrstsvd from 'frstcmfrstsvd';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => 
   new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    'x',
    sleep(1000).then(() => 'b'),
    'y',
    sleep(3000).then(() => { throw `Ohhh:\n` }),
    'z',
];

(async () => {
    try {
        for await (let item of frstcmfrstsvd(arr)) {
            console.log("item = ",item);
        }
    } catch(e) {
       console.log('Catched!:\n', e);
    }

})()
```

Gives as output:

```
➜  firstcomefirstserved git:(main) ✗ node examples/reject-frstcmfrstsvd.mjs 
item =  { value: 'x', index: 1, status: 'fulfilled' }
item =  { value: 'y', index: 3, status: 'fulfilled' }
item =  { value: 'z', index: 5, status: 'fulfilled' }
item =  { value: 'b', index: 2, status: 'fulfilled' }
item =  { value: 'a', index: 0, status: 'fulfilled' }
item =  { reason: 'Ohhh:\n', index: 4, status: 'rejected' }
```

## Compare the Performance of your solution with the performance of  allSettled

 Write  a program to compare the performance of your solution with the performance of [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled). 

You can find the full code in the npm package [frstcmfrstsvd](https://www.npmjs.com/package/frstcmfrstsvd).

At first view, performance of [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) seems to be a bit better:

 ```
> node examples/performance-reject-frstcmfrstsvd.mjs
frstcmfrstsvd: 323.104ms
allsettled: 317.319ms
> node examples/performance-reject-frstcmfrstsvd.mjs
frstcmfrstsvd: 327.142ms
allsettled: 315.415ms
> node examples/performance-reject-frstcmfrstsvd.mjs
frstcmfrstsvd: 322.753ms
allsettled: 318.955ms
> node examples/performance-reject-frstcmfrstsvd.mjs
frstcmfrstsvd: 325.562ms
allsettled: 317.375ms
> node examples/performance-reject-frstcmfrstsvd.mjs
frstcmfrstsvd: 322.25ms
allsettled: 318.09ms
```

See file [examples/performance-reject-frstcmfrstsvd.mjs](https://github.com/crguezl/frstcmfrstsvd/blob/HEAD/examples/performance-reject-frstcmfrstsvd.mjs)


## See

* Here is a [solution](https://github.com/crguezl/frstcmfrstsvd). Don't look at it unless you are blocked
* [Stackoverflow question: Performance of Promise.all and for-await-of](https://stackoverflow.com/questions/51916636/performance-of-promise-all-and-for-await-of)
* [ULL-MII-SYTWS-2022/learning-async-iteration-and-generators](https://github.com/ULL-MII-SYTWS-2022/learning-async-iteration-and-generators) (Private repo)
  * campus-virtual/2021/learning/asyncjs-learning/learning-async-iteration-and-generators
* Chapter [Async iteration and generators](https://javascript.info/async-iterators-generators)
* Chapter [Iterables](https://javascript.info/iterable)
* Chapter [Generators](https://javascript.info/generators) of JavaScript.info

### ES6 Modules in Node.JS

* See the Node.js doc [Modules: Packages](https://nodejs.org/api/packages.html#packages_determining_module_system) for more details on the use of ECMA 6 Modules in Node.js.
* [How Can I use en es6 Import in Node.JS](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js#:~:text=You%20can%20also%20use%20npm,import%20in%20your%20JavaScript%20files.
) Stackoverflow