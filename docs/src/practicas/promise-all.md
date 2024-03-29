---
title: "Promise_all"
published: true
date: "2023/09/27 03"
campus: "https://campusdoctoradoyposgrado2324.ull.es/mod/assign/view.php?id=4065"
delivery: "2023/10/11"
key: promise-all
layout: Practica
order: 10
sidebar: false
prev: promise-readfile.md
next: promise-allsettled.md
rubrica:
  - "código correcto"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

Given an array of promises, `Promise.all` returns a promise that waits for all of the promises in the array to finish. 
It then succeeds, yielding an array of result values. 
If a promise in the array fails, the promise returned by all fails too, with the failure reason from the failing promise.

Implement something like this yourself as a regular function called `Promise_all`. Do not use `async ` or `await`in your solution.

Remember that after a promise has succeeded or failed, 
it can’t succeed or fail again, and further calls to the functions that resolve it are ignored. 
This can simplify the way you handle failure of your promise.


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Promise.all</title>
</head>

<body>
    <h1>Open the Developer tools</h1>
    <script>
        function Promise_all(promises) {
           // Fill the code
        }

        // Test code.
        Promise_all([]).then(array => {
            console.log('This should be []:', array);
        });

        function soon(val) {
            return new Promise(resolve => {
                setTimeout(() => resolve(val), Math.random() * 500);
            });
        }

        Promise_all([soon(1), soon(2), soon(3)]).then(array => {
            console.log('This should be [1, 2, 3]:', array);
        });

        Promise_all([soon(5), soon(2), soon("a")]).then(array => {
            console.log('This should be [5, 2, "a"]:', array);
        });

        Promise_all([soon(1), Promise.reject('X'), soon(3)])
            .then(array => {
                console.log('We should not get here');
            })
            .catch(error => {
                if (error === 'X') {
                    console.log('Rejection correctly managed!')
                } else
                    console.log('Unexpected failure:', error);
            });

        Promise_all([
            soon(1),
            new Promise(() => { throw (new Error('Muerto!')) }),
            soon(3)
        ])
            .then(array => {
                console.log('We should not get here');
            })
            .catch(error => {
                if (/Muerto!/.test(error.message))
                    console.log('Exception correctly managed!:');
            });        
    </script>
</body>
</html>
  ```
  
## Hints

The function passed to the `Promise` constructor will have to call `then` on each of the promises in the given array. 
When one of them succeeds, two things need to happen.

1. The resulting value needs to be stored **in the correct position** of a result array, and 
2. we must **check whether this was the last pending promise** and finish our own promise if it was.

The latter can be done with a `counter` that is initialized to the `length` of the input array and from which we subtract 1 every time a promise succeeds. 
When it reaches 0, we are done. 

Make sure you take into account the situation where the input array is empty (and thus no promise will ever resolve).

Handling failure requires some thought but turns out to be extremely simple: Just pass the **reject** function of the wrapping promise to each of the promises in the array as a catch handler or as a second argument to them so that a failure in one of them triggers the rejection of the whole wrapper promise.

