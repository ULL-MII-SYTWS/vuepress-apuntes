---
permalink: /react/intro
sidebar: auto
---

## What is React?

::: tip Key Points 
React is a JavaScript library for building user interfaces, primarily designed around a UI component-based architecture. 
**A UI component is a reusable, self-contained piece of UI that manages its own structure, styling, and behavior**.
React allows developers to create  UI components and re-render only the parts of the interface that need updating. 

1. **Component-Based Architecture**: React applications are built from components, which are independent, reusable pieces of code that return a portion of the UI. 
  
2. **JSX Syntax**: React uses JSX (JavaScript XML), a syntax extension that allows developers to write HTML-like code directly in JavaScript. JSX makes it easy to visualize and manage the structure of the UI, although under the hood, it compiles into standard JavaScript.

3. **Virtual DOM**: Instead of directly manipulating the browser's DOM, React uses a Virtual DOM. When a component’s state changes, React updates the Virtual DOM first and calculates the minimum number of changes needed to update the real DOM efficiently.

4. **Unidirectional Data Flow**: React enforces a one-way data flow, meaning data is passed from parent to child components via **props**. 

5. **State and Props**:
   - **Props** are inputs to a component, allowing data to be passed from a parent to a child component.
   - **State** is data managed within a component that can change over time. When the state updates, the component re-renders to reflect these changes.

6. **Hooks**: [Hooks](https://react.dev/reference/react/hooks) are functions that let you *hook into* React **state** and **lifecycle** features from function components. React’s hooks, such as [useState](https://react.dev/reference/react/useState) and [useEffect](https://react.dev/reference/react/useEffect), let developers add state and side-effects to function components. Next.js adds a few hooks to the React library to help with server-side rendering and data fetching like [useSWR](/temas/web/nextra/swr/#swr-in-next-js-with-the-swr-library)
Some examples of side effects are: fetching data, directly updating the DOM, and timers.

1. **Rendering and Reconciliation**: React’s reconciliation algorithm compares the current Virtual DOM with the previous version to determine the minimum number of changes required. Only the components whose data has changed are re-rendered.
:::

## useState

The `useState` hook is a function that allows you to add state to a functional component. It returns an array with two elements: the current state value and a function that lets you update it. 

```jsx
## Component

import { useState } from 'react'

{/* Import CSS modules */}
import styles from '../components/counters.module.css'

export const Counter = () => {
  const [count, setCount] = useState(4);
  return (
    <div>
      <button onClick={
         () => setCount(count + 1)} className={styles.counter}
      >Clicked {count} times</button>
    </div>
  );
};
```


We say that `count` is a **state** variable. 

The initial state of the `count` variable is `4`, the value passed to `useState`.

The `setCount` function **must be used** to update the `count` state variable. 

When the button is clicked, the `onClick` handler will be eventually executed:

```js 
() => setCount(count + 1)
```

and consequently, the `setCount` function is called with the new value `count + 1` and so the `count` state variable is incremented.

::: warning CSS Modules
We can also see how a CSS module is imported in the variable `styles`. 
The variable `styles` is used to apply the CSS class `counter` to the button.  
The `className` attribute is used instead of `class`, since `class` is a reserved keyword in JavaScript. **JSX is not HTML!**.

CSS modules are used to scope CSS styles to a specific component by generating unique class names.

`File counters.module.css`

```css
.counter {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 2px 6px;
  margin: 12px 0 0;
}
```
:::