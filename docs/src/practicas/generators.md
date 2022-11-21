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

Have a look at the chapter [Iterables](https://javascript.info/iterable). 

See the example [hello-symbol-iterator.js](https://github.com/ULL-MII-SYTWS-2021/learning-generators/blob/main/00-symbol-iterator/hello-symbol-iterator.js) in the repo 
[ULL-MII-SYTWS-2021/learning-generators](https://github.com/ULL-MII-SYTWS-2021/learning-generators). (What will be the output?)

### Generators

Read the chapter [Generators](https://javascript.info/generators) of JavaScript.info reproducing the examples and exercises. 

See the examples
* [01-generator-functions/hello-generators.js](https://github.com/ULL-MII-SYTWS-2021/learning-generators/blob/main/01-generator-functions/hello-generators.js).
(What will be the output?)
* [02-generators-are-iterable](https://github.com/ULL-MII-SYTWS-2021/learning-generators/tree/main/02-generators-are-iterable)

### Delivery

Add the examples and exercises of the [Iterables](https://javascript.info/iterable) chapter at the beginning of the report.


## Exercise *Groups* in the book EloquentJS Chapter 6

1. Write a class called `Group` that works like the `Set` JS  class. Here is a template for the class `Group` (Exercise [Groups](https://eloquentjavascript.net/06_object.html#groups) in the book EloquentJS Chapter 6):

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

You can see a solution at folder [/learning-generators/03-using-generators-for-iterables](https://github.com/ULL-MII-SYTWS-2021/learning-generators/tree/main/03-using-generators-for-iterables)
## See

* [ULL-MII-SYTWS-2021/learning-generators](https://github.com/ULL-MII-SYTWS-2021/learning-generators) (campus-virtual/2021/learning/asyncjs-learning/learning-generators)
* Chapter [Iterables](https://javascript.info/iterable)
* Chapter [Generators](https://javascript.info/generators) of JavaScript.info
* See the Node.js doc [Modules: Packages](https://nodejs.org/api/packages.html#packages_determining_module_system) for more details on the use of ECMA 6 Modules in Node.js.
* [How Can I use an es6 Import in Node.JS](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js#:~:text=You%20can%20also%20use%20npm,import%20in%20your%20JavaScript%20files.
) Stackoverflow