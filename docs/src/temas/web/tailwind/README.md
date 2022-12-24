---
title: Tailwind CSS
---

# {{ $frontmatter.title }}

Tailwind CSS is a **utility-first** CSS framework for rapidly building custom user interfaces.

With Tailwind, you style elements by applying pre-existing classes directly in your HTML.

## Utility-first CSS frameworks

**Utility-first** frameworks provide a low-level utility class to build out custom designs within your HTML file. Utility classes are named according to their intended purpose, such that they’re easily understandable to the average person.

```html
<div class="bg-white"></div>
```

The primary purpose of the class `.bg-white` is to add a background color of white. There are different classes for different purposes, such as setting background color or adding a margin or padding to a container.

There are other Utility-first frameworks as Tachyons, Sched.css, Basscss, Expresive css and others. See [Top utility-first CSS frameworks](https://blog.logrocket.com/top-utility-first-css-frameworks/) 2021.

## Tailwind CSS Example

Clone the repo [ULL-MII-SYTWS/tailwind-learning](https://github.com/ULL-MII-SYTWS/tailwind-learning)

Run: 

```
npm install
```

and 

```
npm run build:tailwind

> hello-tailwind@1.0.0 build:tailwind
> tailwindcss -i ./src/input.css -o ./public/output.css --watch
```

Use live server extension on VScode to see the results.

```html
  <div class="p-6 max-w-sm mx-auto 
       bg-white rounded-xl shadow-lg 
       flex items-center space-x-4">
    <div class="shrink-0">
      <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>
```

In the example above, we’ve used:

1. Tailwind’s flexbox and padding utilities (`flex`, `shrink-0`, and `p-6`) to control the overall card layout
2. The `max-width` and margin utilities (`max-w-sm` and `mx-auto`) to constrain the card width and center it horizontally
3. The background color, border radius, and `box-shadow` utilities (`bg-white`, `rounded-xl`, and `shadow-lg`) to style the card’s appearance
4. The width and height utilities (`w-12` and `h-12`) to size the logo image
5. The `space-between` utilities (`space-x-4`) to handle the spacing between the logo and the text
6. The font size, text color, and `font-weight` utilities (`text-xl`, `text-black`, `font-medium`, etc.) to style the card text

This approach allows us to implement a completely custom component design without writing a single line of custom CSS.

## References

* Repo [ULL-MII-SYTWS/tailwind-learning](https://github.com/ULL-MII-SYTWS/tailwind-learning)
* [Tailwind docs](https://tailwindcss.com/docs/installation)
* <youtube id="sNXfI3woBEw"></youtube>