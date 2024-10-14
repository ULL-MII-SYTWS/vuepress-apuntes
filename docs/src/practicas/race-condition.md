---
title: "Race Condition: Loading an image with some delay"
published: true
date: "2023/09/28 01"
campus: "https://campusdoctoradoyposgrado2425.ull.es/mod/assign/view.php?id=10745" 
delivery: "2023/09/27"
key: race-condition
layout: Practica
order: 8
prev: asyncmap.md
next: intro2sd.md
rubrica:
  - "Encontrada explicación correcta"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## The code

Consider this file `index.html`: 

```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Asynchronous Image Loading</title>
</head>
<body>
  <div id="holder-div"></div>

  <script type="text/javascript">
    let image = new Image(100),
        //url = "https://elementscpa.com/wp-content/uploads/2017/08/elementscpa-business-infinity-loop-tal-e1504182065499.png", 
        url = "infinity-loop.png", 
        container = document.getElementById("holder-div");

    image.src = url; // I suppose the "load" process starts here

    let waitFor = 0;
    //let waitFor = 2000;
    setTimeout(function(){
      // The onload event occurs when an object has been loaded
      // We only append it to the container when the load has finished
      // The handler is inserted in the event queueAfter after 'waitFor' ms 
      // If an EventListener is added to an EventTarget while it is 
      // processing an event, that event does not trigger the listener.
      image.addEventListener("load", function() {
        console.trace();
        container.appendChild(image)
      });
    }, waitFor);

  </script>
  <a href="http://www.infoq.com/presentations/javascript-concurrency-parallelism">Concurrency and Parallel Computing in JavaScript (Recorded at: StrangeLoop) by Stephan Herhut on Mar 05, 2014 </a>
</body>
</html>
```

Typically [a browser will not wait for one image to be downloaded before requesting the next resource or image](https://stackoverflow.com/questions/53160578/how-do-i-make-a-webpage-think-its-images-are-done-loading). 
It will request all images simultaneously, as soon as it gets the `src`s of those images.


The `EventTarget.addEventListener()` method of the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) sets up a function that will be called whenever the specified event is delivered to the target.

## The Experiment

Install  [http-server](https://www.npmjs.com/package/http-server).

Then  serve this `index.html` file with:

```
http-server -p 9000 -o
```

with this line uncommented 

```js
let waitFor = 2000;
```

Can you see the infinite loop image?

Now  comment the line where `waitFor` is initialized and uncomment the other:

```js
let waitFor = 0;
```

and run:

```
http-server -p 8000 -o
```

(Change the port to avoid cache problems)

What do you think it will happen? Can you explain it?

## Think

Here is again our image of the event loop:

![/images/event-loop.png](/images/event-loop.png)


## Comments

The method `addEventListener()` works by adding a function, or an object that implements `EventListener`, to the list of event listeners for the specified event type on the `EventTarget` on which it's called. If the function is already in the list of event listeners for this target, the function or object is not added a second time:

```js
  image.addEventListener("load", function() {
         console.trace();
         container.appendChild(image)
       });
```

causes the `load` event to be registered on the dynamically created `image` element, but the wrapping `setTimeout` causes that registration to occur after at least `waitFor` milliseconds. 

Therefore, if a certain amount of time passes, it is possible that the `load` event (the loading of the image)
occurred before the handler was registered.

*Event listeners are not called if they are attached after the event has already fired. "You snooze, you lose."*

If a DOM event happens before the handler for that event is set, **the event will not trigger the handler**. Since `image` is already loaded when the `load` event handler is set, the `load` event will not trigger the handler.

This is because the browser only adds event listeners to the callback queue when the event happens. **If there is no event listener associated with the event, the browser will ignore the event**.

The `image` object will not be appended to the `container` if the image is loaded before the 2000 milliseconds.


## Test adicional

With `let waitFor = 0` try reloading the page. What will happen?
Is the same thing happening with all browsers?

Go to the developer tools, to the Network tab and clear the cache. Reload. What happens?

<hr/>

## Objetivo

In your report, develop an explanation for the observed behaviors.

## Referencias

* Tema [Async Programming in JavaScript](/temas/async/event-loop) The Event Loop
* [Meta repo de la Charla UAI2015](https://github.com/ULL-MII-SYTWS-1920/uai2015)
  * [Repo de Ejemplo ULL-MII-SYTWS-1920/js-race](https://github.com/ULL-MII-SYTWS-1920/js-race)
* Charla en InfoQ: [https://www.infoq.com/presentations/javascript-concurrency-parallelism/](https://www.infoq.com/presentations/javascript-concurrency-parallelism/)
* [Abstract de la charla UAI2015](uai2015)
* [Race Condition in JavaScript](https://youtu.be/wNwBzgDm0BI) YouTube Video
