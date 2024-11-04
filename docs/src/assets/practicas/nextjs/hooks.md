---
permalink: /react/hooks
---

## What is React?

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

6. **Hooks**: [Hooks](https://react.dev/reference/react/hooks) are functions that let you *hook into* React **state** and **lifecycle** features from function components. React’s hooks, such as [useState](https://react.dev/reference/react/useState) and [useEffect](https://react.dev/reference/react/useEffect), let developers add state and side-effects to function components. 
Some examples of side effects are: fetching data, directly updating the DOM, and timers.

1. **Rendering and Reconciliation**: React’s reconciliation algorithm compares the current Virtual DOM with the previous version to determine the minimum number of changes required. Only the components whose data has changed are re-rendered.




