---
title: "jq Exercises"
published: true
date: "2022/11/29 01"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=35670"
delivery: "2022/12/14"
permalink: /practicas/jq-exercises
key: jq-exercises
layout: Practica
order: 21 # may be there is one in between the emitters and this. to decide
sidebar: auto
prev: /practicas/gh-exercises.md
next: /practicas/graphql-server.md
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}

En el repositorio de la asignación, instale las dependencias:
  
```bash
✗ npm install
```

Después,  ejecute el tutorial:

```bash
  ✗ bin/jq-tutorial
Run jq-tutorial with one of the following:
  * pick
  * objects
  * mapping
  * filtering
  * output
  * reduce
  * regexp
```

## Ejercicios

Realice todos los ejercicios de cada apartado.

## Añada un nuevo ejercicio

Añada un nuevo ejercicio sobre jq al repo de la asignación creando el  correspondiente directorio en la carpeta `problems/mi-problema` y el fichero asociado en `data/mi-problema.json`. Actualice `menu.json` con el nuevo problema.

Los problemas en [jq Cookbook](https://github.com/stedolan/jq/wiki/Cookbook#convert-a-csv-file-with-headers-to-json) pueden ser una fuente de inspiración.

Haga un pull request al repo de template de esta asignación <https://github.com/ULL-MII-SYTWS/jq-tutorial>.

En clase mezclaremos los pull requests y haremos los nuevos problemas planteados por los compañeros.

## Youtube Tutorials

Here is an introductory call to jq: *Processing JSON in the command-line made easy - jq tutorial (first steps)* by Szymon Stepniak

<youtube id="FSn_38gDvzM"></youtube>

A more advanced talk on jq is the one at !!Con 2017: *Serious Programming with jq?! A Practical and Purely Functional Programming Language*! by Charles Chamberlain:

<youtube id="https://youtu.be/PS_9pyIASvQ"></youtube>

## References

* [Repo jq-modules-examples](https://github.com/ULL-MII-SYTWS/jq-modules-example) with an example of a module in jq
* La extensión VSCode jq [vscode-jq](https://marketplace.visualstudio.com/items?itemName=dandric.vscode-jq) provee que cuando estemos editando un ficher `.json` tengamos un playground para jq en la ventana de comandos.
* Repo [awesome-jq](https://github.com/fiatjaf/awesome-jq)
* [jq Cookbook](https://github.com/stedolan/jq/wiki/Cookbook#convert-a-csv-file-with-headers-to-json) jq recipes