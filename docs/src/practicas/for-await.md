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
next: event-emitters.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

## Goal: Async Generators and for await

Read the chapter [Async iteration and generators](https://javascript.info/async-iterators-generators) of JavaScript.info reproducing the examples and exercises.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the `next` value).
   * The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
   * Note the `await` word.

## Exercise: Write the `fetchCommits` async generator

Create a folder `async-iteration-and-generators`. Use this folder for your solutions to the exercises in the chapter  [Async iteration and generators](https://javascript.info/async-iterators-generators) of the JavaScript.info book. 

Add  inside it  a file
[paginated-data.js](https://github.com/ULL-MII-SYTWS/for-await-solution/blob/main/async-iteration-and-generators/paginated-data.js) client program:

```js
import _ from 'lodash';

import { fetchCommits } from './fetch-commits.js';

(async () => {

    let someRepos = ['torvalds/linux',
        'ULL-MII-SYTWS-2324/ULL-MII-SYTWS-2324.github.io',
        'javascript-tutorial/en.javascript.info',
        'ULL-MII-SYTWS-2324/generators-marcos-barrios-lorenzo-alu0101056944']
    let count = 0;

    let repoName = _.sample(someRepos);
    console.log(`repoName = ${repoName}`);

    for await (const commit of fetchCommits(repoName)) {

        if (!commit.author) console.log(commit.commit.author.name);
        else console.log(commit?.author?.login || "no login known");

        if (++count == 100) { // let's stop at 100 commits
            break;
        }
    }

})();
```

Write the `fetchCommits` async generator that yields the commits. Put it in the module `async-iteration-and-generators/fetch-commits.js`.

You can find a solution and more details about the exercise in the section [Real-life example: paginated data](https://javascript.info/async-iterators-generators#real-life-example-paginated-data) of the chapter.

### The Link header

The following script gets the commits of a repo using the GitHub API. It only shows the headers: 


```bash
➜  async-iteration-and-generators git:(main) cat get-commits.sh 
#!/bin/bash
# GitHub CLI api
# https://cli.github.com/manual/gh_api
OWNER=torvalds
REPO=linux
if [ -z "$1" ]; then
  echo "No owner provided, using defaults owner: ${OWNER} repo: ${REPO}"
else
  OWNER=$1
  if [ -z "$2" ]; then
    echo "No repo provided, using default: linux"
  else
    REPO=$2
  fi
fi
# Option --verbose Includes full HTTP request and response in the output
# Option --silent does not print the response body
gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/${OWNER}/${REPO}/commits \
  --include --silent
```
The excution of the script gives the following output:

```bash
➜  async-iteration-and-generators git:(main) ./get-commits.sh 
No owner provided, using defaults owner: torvalds repo: linux
HTTP/2.0 200 OK
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset
Cache-Control: private, max-age=60, s-maxage=60
Content-Security-Policy: default-src 'none'
Content-Type: application/json; charset=utf-8
Date: Wed, 08 Nov 2023 11:08:41 GMT
Etag: W/"cf1b48d1ef7459a0ee74ff2e86a4205b5d1c16945f763566fcc45a48b6d33720"
Last-Modified: Wed, 08 Nov 2023 01:16:23 GMT
Link: <https://api.github.com/repositories/2325298/commits?page=2>; rel="next", <https://api.github.com/repositories/2325298/commits?page=41087>; rel="last"
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
Server: GitHub.com
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
Vary: Accept, Authorization, Cookie, X-GitHub-OTP, Accept-Encoding, Accept, X-Requested-With
X-Accepted-Oauth-Scopes: 
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-Github-Api-Version-Selected: 2022-11-28
X-Github-Media-Type: github.v3; format=json
X-Github-Request-Id: 3B33:6EFB:13ED65F5:142E2662:654B6C38
X-Oauth-Scopes: admin:enterprise, admin:gpg_key, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, codespace, delete:packages, delete_repo, gist, notifications, project, repo, user, workflow, write:discussion, write:packages
X-Ratelimit-Limit: 5000
X-Ratelimit-Remaining: 4993
X-Ratelimit-Reset: 1699444433
X-Ratelimit-Resource: core
X-Ratelimit-Used: 7
X-Xss-Protection: 0
```

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

* This a repo with the source for a npm package [crguezl/frstcmfrstsvd](https://github.com/crguezl/frstcmfrstsvd). Don't look at it unless you are blocked. The repo [ULL-MII-SYTWS/for-await-solution](https://github.com/ULL-MII-SYTWS/for-await-solution/tree/main/async-iteration-and-generators) is a private repo with the solution to this lab.
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