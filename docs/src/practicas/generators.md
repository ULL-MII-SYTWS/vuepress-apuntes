---
title: "Generators and Iterables"
published: true
date: "2022/11/09 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=789"
delivery: "2022/11/20"
key: generators
layout: Practica
order: 14
sidebar: auto
prev: async-await.md
next: building-async-await.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## Description

### Iterables

**Iterable objects** are a generalization of arrays. That’s a concept that allows us to make any object usable in a `for..of` loop.

-  Iterables must implement a **method** named `Symbol.iterator`
-  The object result of the call  `[Symbol.iterator]()` is called an **iterator**
-  An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`
-  The `Symbol.iterator` method is called automatically by `for..of`

See the example [hello-symbol-iterator.js](https://github.com/ULL-MII-SYTWS-2021/learning-generators/blob/main/00-symbol-iterator/hello-symbol-iterator.js) in the repo 
[ULL-MII-SYTWS-2021/learning-generators](https://github.com/ULL-MII-SYTWS-2021/learning-generators). (What will be the output?)


Read the chapter [Iterables](https://javascript.info/iterable) of JavaScript.info reproducing the examples and exercises.

Read the  section [Name Collisions](https://thecodebarbarian.com/a-practical-guide-to-symbols-in-javascript.html#name-collisions) of the article **A Practical Guide to Symbols in JavaScript** for an explanation of why is `Symbol.iterator` a symbol rather than a string.

### Generators

**Generators**  are created by generator functions `function* f(…) {…}`.

* Inside generators (only) there exists a `yield` operator.
* The outer code and the generator may exchange results via `next/yield` calls.

See the examples
* [01-generator-functions/hello-generators.js](https://github.com/ULL-MII-SYTWS-2021/learning-generators/blob/main/01-generator-functions/hello-generators.js).
(What will be the output?)
* [02-generators-are-iterable](https://github.com/ULL-MII-SYTWS-2021/learning-generators/tree/main/02-generators-are-iterable)

Read the chapter [Generators](https://javascript.info/generators) of JavaScript.info reproducing the examples and exercises. 

### Delivery

Read both chapters and delivery a report like the one in [ULL-MII-SYTWS-2021/learning-generators](https://github.com/ULL-MII-SYTWS-2021/learning-generators)
<!-- (See folder campus-virtual/2021/learning/asyncjs-learning/learning-generators).--> 

## Exercise *Groups* in the book EloquentJS Chapter 6

1. Write an iterable class called `Group` that works like the [Set JS  class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Here is a template for the class `Group` (Exercise [Groups](https://eloquentjavascript.net/06_object.html#groups) in the book EloquentJS Chapter 6):

    ```js
    class Group {
        constructor() {
            // ... your code 
        }
        add(elt) {
            // ... your code
        }
        delete(elt) {
            // ... your code 
        }
        has(elt) {
            // ... your code
        }
        static from(iterable) {
            // Takes an iterable object as argument and
            // creates a group that contains all the values
            // produced by iterating over it.
        }
        *[Symbol.iterator] () {
            // ... Your code
        }
    }

    export { Group };
    ```
2.  Make the `Group` class from the previous exercise iterable. (Exercise **Iterable groups**  [Groups in EloquentJS Chapter 6](https://eloquentjavascript.net/06_object.html#group_iterator))
3. Write the solution as an ES6 module so that can be imported with this syntax:

    ```js
    #!/usr/bin/env node 
    import { Group } from './eloquent-js-6-2-group-with-generators.js';

    let group = Group.from([10, 20]);
    console.log(group.has(10));
    // → true
    console.log(group.has(30));
    // → false
    group.add(10);
    group.delete(10);
    console.log(group.has(10));
    // → false

    for (let value of Group.from(['a', 'b', 'c'])) {
      console.log(value);
    }
    // → a
    // → b
    // → c
    ```

    See the Node.js doc [Modules: Packages](https://nodejs.org/api/packages.html#packages_determining_module_system) for more details on the use of ECMA 6 Modules in Node.js.

4. Simplify the solution to making the `Group` class iterable using a generator instead of a plain iterator as suggested in [Chapter 11 of the book Eloquent JS](https://eloquentjavascript.net/11_async.html#h_o+cFzGGhnz)

    > Writing iterators is often much easier when you use generator functions. The iterator for the Group class  can be written with this generator:

    ```js
    Group.prototype[Symbol.iterator] = function*() {
        for (let i = 0; i < this.members.length; i++) {
            yield this.members[i];
        }
    };
    ```

You can see a solution at folder [learning-generators/03-using-generators-for-iterables](https://github.com/ULL-MII-SYTWS-2021/learning-generators/tree/main/03-using-generators-for-iterables) of the repo ULL-MII-SYTWS-2021/learning-generators

## yield is a two way street

You have to take into account these facts:

1. When using a generator `g`, you can pass one argument to `next`: `g.next(a)` 
2. The computation was paused **just after the evaluation of  the last `yield` expression executed inside `g`**
3. The call to `g.next(a)` becomes the result of this last `yield` expression
4. The first call `generator.next()` should be always made without an argument (If passed the argument will be ignored)


What is the output of the following code?

```js
function* generator(z) {
    console.log(z); 
    z++;
    let a = yield z+1;
    console.log('Inside generator: '+a); // a is hello
    let b = yield (a+" world!");
    console.log('Inside generator: '+b); // b is 10
    yield b*2;
}

let g = generator(999);
console.log(g.next().value); 
console.log(g.next("hello", "second ignored parameter").value);
console.log(g.next(10).value); 
```

Play with the example for different inputs

What is the output of the following code?

```js
function* gen() {
  // On the first iteration, yield does not return anything.
  //because it returns something ONLY when execution is resumed
  returnedFromYield = yield 'foo'; 
  yield returnedFromYield; 
}

let g = gen();

console.log(g.next(1)); 
console.log(g.next(2));
```

## See

* [ULL-MII-SYTWS-2021/learning-generators](https://github.com/ULL-MII-SYTWS-2021/learning-generators) (campus-virtual/2021/learning/asyncjs-learning/learning-generators)
* Chapter [Iterables](https://javascript.info/iterable)
* Chapter [Generators](https://javascript.info/generators) of JavaScript.info
* See the Node.js doc [Modules: Packages](https://nodejs.org/api/packages.html#packages_determining_module_system) for more details on the use of ECMA 6 Modules in Node.js.
* [How Can I use an es6 Import in Node.JS](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js#:~:text=You%20can%20also%20use%20npm,import%20in%20your%20JavaScript%20files.
) Stackoverflow