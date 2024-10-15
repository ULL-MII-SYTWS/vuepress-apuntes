---
title: Async map
published: true
date: "2023/09/11 05"
campus: "https://campusdoctoradoyposgrado2425.ull.es/mod/assign/view.php?id=10744"
delivery: "2023/09/27"
key: asyncmap
layout: Practica
order: 7
prev: iaas.md
next: #race-condition.md
rubrica:
  - "Código de la práctica correcto"
  - "Se da una solucion paralela usando la librería async en el fichero sol-using-async.mjs"
  - "Se da una solucion paralela sin usar la librería async al problema de la lectura de ficheros en el fichero my-async.mjs"
  - "Se crea una función <code>asyncmap</code> genérica que funciona como el <code>map</code> de async"
  - "Se da una función <code>series</code> que resuelve el problema de serializar llamadas a funciones asíncronas en el fichero concatSerialize.mjs"
  - "Opcional: Se ofrece una solución con errores agregados"
  - "Informe bien elaborado"
  - "Ha entregado el .zip en el campus con el repo"
---

# {{ $frontmatter.title }}


## Descripción de la Práctica 

Para la realización de esta práctica estudie /repase el tema [Async Programming in JavaScript](/temas/async/).

Un primer objetivo es escribir un programa Node.js que usando `fs.readFile` 

1. lea **en paralelo** un conjunto de ficheros pasados como argumentos en línea de comandos y 
2. produzca como salida la concatenación de los mismos en el orden especificado. 
 
No se considera una solución usar `fs.readFileSync` o timers (`setTimeout` etc.) o usar promesas. Se pide una solución usando callbacks.
Use `fs.readFile(path[, options], callback)`. 

Este sería un ejemplo de uso:

```
$ my-async.mjs -f one.txt -f two.txt -f three.txt -o salida.txt
```

## commander

Con [commander](https://www.npmjs.com/package/commander?activeTab=readme) es posible indicar una opción que se puede repetir

```js
const program = require('commander');
function collect(value, previous) {
  return previous.concat([value]);
}
program.option('-c, --collect <value>', 'repeatable value', collect, []);
program.parse(process.argv);
console.log(program.collect)
```

Ejecución:

```
$ node repeatable-option-commander.js -c a -c b -c c
[ 'a', 'b', 'c' ]
```

o bien usando puntos suspensivos en la descripción:

```js
import { Command } from 'commander'
const program = new Command()

program.option('-f, --files <values...>', 'Ficheros de entrada')
program.option('-o, --output <value>', 'Fichero de salida', 'test/output.txt')

program.on('--help', () => {
  console.log('')
  console.log('Solves the parallel concat using the async module')
  console.log('Example call:')
  console.log(' $ node concat1.js -f f3.txt -f f2.txt -f f1.txt -o output.txt; cat output.txt')
})

program.parse(process.argv)
```

## make-big-file.bash

Este script crea un fichero de texto con el nombre, el número de líneas y el contenido especificado:

```
crguezl ➜ /workspaces/asyncmap-casiano-rodriguez-leon-alu0100291865 (training) $ scripts/make-big-file.bash test/f9 10 chuchu
```

Crea un fichero `test/f9` con 10 líneas de contenido el número de orden seguido de `chuchu`:

```
@crguezl ➜ /workspaces/asyncmap-casiano-rodriguez-leon-alu0100291865 (training) $ tail -n 2 test/f9 
9 chuchu
10 chuchu
```
## create-inputs.bash

Este script crea en el directorio `test` el número de ficheros `f#number.txt` especificado con el número de líneas decreciente desde el tamaño especificado hacia abajo:

```
@crguezl ➜ /workspaces/asyncmap-casiano-rodriguez-leon-alu0100291865 (training) $ scripts/create-inputs.bash 4 1024
@crguezl ➜ /workspaces/asyncmap-casiano-rodriguez-leon-alu0100291865 (training) $ ls -l test/f*.txt
-rw-rw-rw- 1 codespace codespace 6056 Sep 19 12:46 test/f1.txt
-rw-rw-rw- 1 codespace codespace 6042 Sep 19 12:46 test/f2.txt
-rw-rw-rw- 1 codespace codespace 6028 Sep 19 12:46 test/f3.txt
-rw-rw-rw- 1 codespace codespace 6014 Sep 19 12:46 test/f4.txt
```

El script llama a [scripts/create-input.bash]()

```bash
➜  asyncmap-solution git:(main) ✗ scripts/create-inputs.bash -h    
Usage: scripts/create-inputs.bash [numfiles(=3)] [size(=numfiles*3)]
  numfiles: number of files to create
  size: number of lines in the first file. Subsequent files 'i' will be of size: size-2*i
  Files will be created in the test/ folder following the pattern test/f#number.txt
```

Estos son los contenidos del script en [scripts/create-inputs.bash](/assets/practicas/asyncmap/create-input-bash.md).
Si quiere sustituya el de su repo por este.



## Lectura de "n" ficheros preservando el orden

### Lectura secuencial de "n" ficheros

Añada un fichero [callback-hell-example.mjs](https://github.com/ULL-MII-SYTWS-2324/asyncmap-casiano-rodriguez-leon-alu0100291865/blob/callbackhell-solution/callback-hell-example.mjs) 
que generaliza el `callback-doom-example.mjs` para que lea `n` ficheros secuencialmente: 
el fichero `f2.txt` no se lee hasta que no se ha leído el fichero `f1.txt`, y así sucesivamente. 

Puede partir de este código:

```js
// Create the inputs: npm run create-inputs
// Execute it with: node callback-hell-example.mjs -f test/f*
import fs from 'fs';
import { Command } from 'commander';
const program = new Command();

program.option('-f, --files <values...>', 'Ficheros de entrada', []);
program.parse(process.argv);
const files = program.files; // ['test/f1.txt', 'test/f2.txt', 'test/f3.txt']
console.log(files);

function rF(name, cb) {
  fs.readFile(name, 'utf8', cb);
}

function readSeq(files, finalCb) {
  let results = [];

  function next(i) {
    if (i < files.length) {
      rF(files[i], (err, data) => {
        ... // Write your code here
        //console.log(data)
        next(i+1);
      });
    } else {
      ... // Write your code here
    }
  }
  next(0);
}

readSeq(files, (err, data) => {
  if (err) { console.error(err); return; }
  console.log(data);
});
```

### Lectura paralela de "n" ficheros  

Otro problema ligeramente distinto es escribir una
función `readPar(files, finalCb)` que lea los ficheros en paralelo pero 
que cuando llame a `finalCb(err, data)`  con
los resultados en `data` estos estén en el orden 
en que se han pasado los ficheros en el array `files`. 
Es decir, en este caso se puede leer el Fichero
`f2.txt` antes que el `f1.txt` pero el resultado de la lectura de `f1.txt` debe aparecer antes que el de `f2.txt` en 
`data`.

Resuelva también este segundo problema de lectura de ficheros y añada la solución
en el mismo fichero `callback-hell-example.mjs`. 

Dejamos aquí un enlace a los apuntes de "[Introduction to the JS Event Loop](/temas/async/event-loop/)"

### Solución con el Módulo async-js

Lea la sección [The Async Module](/temas/async/async-js) de los apuntes y encuentre una solución usando `Async` al problema de la lectura
secuencial y paralela de los ficheros. 

* File [sol-using-async.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/sol-using-async.mjs)  write here your solution to the par problem using the async module
* File [sol-using-async-series.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/sol-using-async-series.mjs) write here your solution to the seq problem using the async module

Considere la posibilidad de excepciones debidas a que alguno de los ficheros no exista. 

Si no se le ocurre una solución, puede consultar las soluciones a la pregunta [NodeJS - How to read multiple files asynchronously and write read contents to one file](https://stackoverflow.com/questions/39020704/nodejs-how-to-read-multiple-files-asynchronously-and-write-read-contents-to-on) en StackOverflow.

### Solucion sin usar el Módulo async-js

A continuación, busque  una solución para este problema sin hacer uso de `Async` ¿Cómo lo haría?
No se considera una solución usar `fs.readFileSync` o timers (`setTimeout` etc.) o usar promesas. Se pide una solución usando callbacks.

### Abstracción de la solución

Haciendo abstracción de la solución encontrada en el paso anterior escriba una función `asyncMap` que funcione como el 
[map](https://caolan.github.io/async/v3/docs.html#map) del módulo `Async` y que sirva 
para cualquier función asíncrona que siga el patrón de `callback(err, result)`:

Puede ser con esta API:

```js
asyncMap(inputs, (item, cb) => fs.readFile(item, cb), (err, contents) => { ... });
```
o bien con la del módulo `Async`:

```js
map(coll, iteratee, callback)
```

where:

* `coll` - A collection to iterate over.
* `iteratee` - An async function to apply to each item in `coll`.  (`readFile` in our case)s
  The iteratee should complete with the transformed item. Invoked with `(item, callback)`.
* `callback` - A callback which is called with `(err, results)` only when all `iteratee` functions have finished, or an error occurs. `Results` is an array of the transformed items from the `coll`.

### Variante: Errores agregados

The [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) object represents an error when several errors need to be wrapped in a single error:

```js
try {
  throw new AggregateError([new Error("some error")], "Hello");
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "AggregateError"
  console.log(e.errors); // [ Error: "some error" ]
}
```

Instead of calling the final callback with the first error found, you can aggregate all the errors in an `AggregateError` object and pass it to the final callback. 

### Variante del Problema: Serial en vez de paralelo

Ahora cambiamos el problema para lea **en secuencial** el conjunto de ficheros pasados como argumentos en línea de comandos y 
produzca como salida la concatenación de los mismos en el orden especificado. Las mismas restricciones que en el caso anterior.

Provea una  función general `series` que secuencialice cualquier array de funciones asíncronas.
Debe funcionar tal como lo hace la función `series`  del módulo [Async.js](/temas/async/async-js).

Esta sería la forma de uso de la función `series`:

```js
series(program.files, (file, cb) => fs.readFile(file, "utf-8", cb), function (err, results) {

    if (err == null) {
        var file = fs.createWriteStream(program.output);
        file.on('error', err => { throw new Error("Error en la apertura del archivo " + program.output + " " + err) });
        results.forEach(i => { file.write(i + '\n'); });
        file.end();
    } else {
        throw new Error("Fallo en la lectura de los ficheros\n" + err)
    }
});
```

Instead of calling the final callback with the first error found, you can aggregate all the errors in an `AggregateError` object and pass it to the final callback. 

### Files 

* Run `npm run create-inputs` to create the `test/f#.txt` files
* See file [callback-doom-example.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/callback-doom-example.mjs)  Example of the callback hell
* [concatSerialize.js](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/concatSerialize.js) write here your solution to the seq problem without using the async module
* [sol-using-async.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/sol-using-async.mjs)  write here your solution to the par problem using the async module
* [sol-using-async-series.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/sol-using-async-series.mjs) write here your solution to the seq problem using the async module
* [my-async.mjs](https://github.com/ULL-MII-SYTWS/asyncmap-template/blob/main/my-async.mjs) write here your solution to the par problem without using the async module. `npm test` checks the solution for a simple case
* `npm run test-err` checks the solution for a case when one of the input files does not exists

## Módulos CommonJS y ES6 

Esta es la estructura del template de la práctica:

```
➜  asyncmap-solution git:(main) tree -I node_modules
.
├── README.md
├── concatSerialize.js
├── my-async.mjs
├── package-lock.json
├── package.json
├── scripts
│   ├── create-inputs.bash
│   └── make-big-file.bash
├── sol-using-async.mjs
└── test
    ├── expected.txt
    ├── f1.txt
    ├── f2.txt
    ├── f3.txt
    └── output.txt
```

En `concatSerialize.js` los módulos son cargados usando `require` (ver [CommonJS](https://nodejs.org/api/modules.html#modules_modules_commonjs_modules)) mientras que en `sol-using-async.mjs`  y `my-async.mjs` 
se usan los módulos ES6 (ver [ECMAScript Modules](https://nodejs.org/api/esm.html#esm_ecmascript_modules)).

## Variables en el package.json

En el directorio `scripts` hay dos scripts para la creación de ficheros de prueba y que son usados en la sección `scripts` del `package.json`. 


```
➜  asyncmap-solution git:(main) npm run
Lifecycle scripts included in asyncmap-solution@1.0.0:
  test
    npm run clean; npm run create-inputs 3 7; npm run my-async.mjs; cmp --silent test/output.txt test/expected.txt && echo 'OK'

available via `npm run-script`:
  create-inputs
    scripts/create-inputs.bash ${npm_package_config_numfiles} ${npm_package_config_size}
  my-async.mjs
    node my-async.mjs -f test/f*.txt -o test/output.txt
  sol-using-async.mjs
    node sol-using-async.mjs -f test/f*.txt -o test/output.txt
  concatSerialize.js
    node concatSerialize.js -f test/f{1..3}.txt -o test/output.txt
  test-err
    node my-async.js -f f1.txt -f no-existe.txt -f f3.txt -o test/output.txt
  save
    git commit -am save && git push -u origin main
  clean
    rm -f test/f*.txt test/output.txt
```

El `package.json` ilustra como se pueden definir variables en la sección `"config"` y usarlas en los `scripts` de `npm` referenciándolas con `${npm_package_config_varname}`.:

```json
  ...  
  "config": {
    "numfiles": 3,
    "size": 7
  },
  "scripts": {
    ...
    "create-inputs": "scripts/create-inputs.bash ${npm_package_config_numfiles} ${npm_package_config_size}",
    ...
  },

```


## Referencias

* Tema [Async Programming in JavaScript](/temas/async/)
* Sección [The Async Module](/temas/async/async-js) de estos apuntes
* El manual del módulo async: <https://caolan.github.io/async/v3/>
* Pregunta [NodeJS - How to read multiple files asynchronously and write read contents to one file](https://stackoverflow.com/questions/39020704/nodejs-how-to-read-multiple-files-asynchronously-and-write-read-contents-to-on) en StackOverflow


## Repos

<repos> </repos>

