---
---
# Live Components

## Introduction

A live code component is an interactive and dynamic element 
in web development that allows real-time execution, editing, and visualization of code within a web page or application. 
These components are particularly useful for educational purposes, documentation, and interactive coding environments. Let me explain the concept in more detail:

Use Cases are:

1. Interactive tutorials and learning platforms
2. API documentation with live examples
3. Code playgrounds for experimenting with languages or libraries
4. Technical blog posts with editable code samples
5. Coding interviews or assessments
6. Collaborative coding environments


There are libraries like [Sandpack](https://sandpack.codesandbox.io/) and [react-live](https://github.com/FormidableLabs/react-live) that can help you add live coding components to your MDX.
There are various ways to implement live code components. Here's a simple example using [react-live](https://github.com/FormidableLabs/react-live):

## Implementing Live Components with react-live

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat components/live.jsx`

```jsx
import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

// See https://commerce.nearform.com/open-source/react-live/docs
const LiveCodeComponent = () => {
  const code = `
    function App() {
      const bS = { padding: '10px', fontSize: '16px', backgroundColor: 'lightgreen', border: 'none', borderRadius: '5px' };
      const hS = { fontSize: '24px', color: 'blue' };
      const [count, setCount] = React.useState(0);
      return (
        <div>
          <h1 style = {hS}>Count: {count}</h1>
          <button style={bS} 
          onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
  `;

  return (
    <LiveProvider code={code}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <LiveEditor className="font-mono" />
          <LiveError />
        </div>
        <div style={{ flex: 1 }}>
          <LivePreview className="" />
        </div>
      </div>
    </LiveProvider>
  );
};

export default LiveCodeComponent;
```
The `LiveProvider` component is the top-level component that takes a `code` prop, 
which contains the code to be edited and previewed. 
It acts as a **context provider** for the other react-live components.

Inside the `LiveProvider`, there is a `div` with a CSS class of grid 
`grid-cols-2 gap-4`, which sets up a two-column grid layout with a gap between the columns. 
This layout is achieved using Tailwind CSS utility classes.

1. The first column contains another `div` that houses the `LiveEditor` and `LiveError` components. 
  - The `LiveEditor` component is where the user can edit the code. 
  - The `LiveError` component displays any errors that occur in the code being edited.
2. The second column contains a `div` with an inline style which allows it to take up the remaining space. 
    Inside this div, there is the `LivePreview` component, which renders the output of the code being edited in real-time.

## Using the Live Component

Here is the mdx page that uses the live component:

`➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat pages/live.mdx`

````markdown
import Live from "@/components/live"

# Live Components

<Live />
````

It looks like this:

![/images/nextra/live.png](/images/nextra/live.png)