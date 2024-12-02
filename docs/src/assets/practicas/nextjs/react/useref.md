--- 
permalink: /react/useref
sidebar: auto
---

# useRef explained

The `useRef` hook is a fundamental React hook that allows you to create a mutable reference that persists across component re-renders without causing the component to re-render when its value changes. Here's a comprehensive breakdown:

## Key Characteristics of `useRef`

::: tip 📚 Persistent Reference

   - `useRef` returns a mutable ref object that remains consistent throughout the component's lifecycle
   - The `.current` property of the ref can be modified without triggering a re-render
   - Commonly used for:
     - Accessing DOM elements directly
     - Storing mutable values that don't require re-rendering
     - Tracking previous values
     - Storing timer or interval references
::: 

## Basic Syntax

```jsx
const refContainer = useRef(initialValue);
```

## Common Use Cases

### 1. Accessing DOM Elements

See the code at file [/components/accesingDOM.jsx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/components/accesingDOM.jsx) at branch `allrepos`

```jsx {6,8-11,16,21}
import React, { useState, useRef } from "react";
import styles from '@/components/Home.module.css'

export default function TextInputWithFocusButton() {
  const [username, setUsername] = useState("");
  const inputRef = useRef(null);

  const focusInput = () => {
    // Directly access and manipulate the DOM element
    inputRef.current.focus();
  };

  return (
    <>
      <input 
        ref={inputRef} 
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
        type="text" 
        />
      <button onClick={focusInput} className={styles.button}>Focus the input</button>

      <p className={styles.title}>Typed username: {username}</p>
    </>
  );
}
```

The `ref={inputRef}` attribute in the JSX code at line 16 is used to attach a reference to the DOM element, 
allowing you to directly access and manipulate the element in your React component.

The `inputRef.current` used at line 10 refers to the DOM element that `inputRef` is attached to.

The [inputRef.current.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) 
method is called directly on the DOM element via `inputRef.current`!.


When the user clicks the button, the `focusInput` function is called, and the cursor is moved to the input field:

![accesingDOM](/images/nextjs/useref-accesngdom.png)

### 2. Storing Mutable Values Without Re-renders

See file [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/components/usereftimer.jsx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/components/usereftimer.jsx) at branch `allrepos`:

```jsx {6,9-11,20-23,25,33,36}
import React, { useState, useRef } from 'react';
import styles from '@/components/counters.module.css'

function Stopwatch() {
  // State to control running status (will cause re-renders)
  const [isRunning, setIsRunning] = useState(false);
  
  // Refs to store mutable values without re-rendering
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);
  const intervalRef = useRef(null);

  // Function to start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) { // only start if not already running
      // Record the start time, accounting for previous elapsed time
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      
      // Set up an interval to update elapsed time
      intervalRef.current = setInterval(() => {
        // Directly mutate the ref without causing re-render
        elapsedTimeRef.current = Date.now() - startTimeRef.current;
      }, 10); // Update every 10 milliseconds for precision

      setIsRunning(true);
    }
  };

  // Function to stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      // Clear the interval
      clearInterval(intervalRef.current);
      
      // Stop tracking time
      setIsRunning(false);
    }
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    // Clear any running interval
    clearInterval(intervalRef.current);
    
    // Reset all tracking values
    startTimeRef.current = null;
    elapsedTimeRef.current = 0;
    
    // Update running state
    setIsRunning(false);
  };

  // Format time for display
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  // Component to display current time (will re-render with state changes)
  return (
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '20px' }}>
        {formatTime(elapsedTimeRef.current)}
      </div>
      
      <div>
        <button 
          onClick={startStopwatch} 
          disabled={isRunning}
          className={styles.counter}
        >Start</button>
        
        <button 
          onClick={stopStopwatch} 
          disabled={!isRunning}
          className={styles.counter}
        >Stop</button>
        
        <button onClick={resetStopwatch} className={styles.counter} >Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
```

- When you click the **start** button, the stopwatch begins counting up but does not cause a re-render. We see the `00:00.00` time displayed.
- When you click the **stop** button the stopwatch stops counting but due to the state variable `isRunning` changing, the component re-renders. 
  We see the time displayed at the moment the stopwatch was stopped.

![/images/nextjs/useref-no-rendering.png](/images/nextjs/useref-no-rendering.png)

### 3. Tracking Previous Values

See the code at file [ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/components/userefTracker.jsx](https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865/blob/allrepos/components/userefTracker.jsx) at branch `allrepos`:

```jsx {5-7,20,42}
import React, { useState, useRef, useEffect } from "react";
import styles from "@/components/UserRepos.module.css";

export default function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const previousCount = prevCountRef.current;

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for setting count from input
  const handleSetCount = () => {
    const newCount = parseInt(inputValue, 10);
    if (!isNaN(newCount)) {
      setCount(newCount);
      setInputValue(''); // Clear input after setting
    }
  };

  return (
    <>
      <ul className={styles.list}>
        <li>Current: {count}</li>
        <li>Previous: {previousCount}</li>
        <li><button onClick={handleIncrement} className={styles.button}>Increment</button></li>

        <li> Change the count:
          <input
            type="text"
            onChange={handleInputChange}
            className={styles.input}
          />
        </li>
        <li><button onClick={handleSetCount} className={styles.button}>Set Count</button>
        </li>
      </ul>

    </>
  );
}
```
 
The  `inputValue` state declared at line 6 holds the current value of the `input` field, and `setInputValue` is used at line 20 (coming from 42) 
to update this value as the user types. 

The combination of `useRef` and `useEffect` allows the component to keep track of the previous value of `count` without causing additional re-renders. 


Now when you click the **Increment** button, the count increases, and the previous count is displayed.
If you write a number in the input field and click the **Set Count** button, the count is set to the input value, and the previous count is displayed.

![/images/nextjs/useref-tracking-values.png](/images/nextjs/useref-tracking-values.png)

## Key Differences from `useState`

- `useRef` does not cause re-renders when its value changes
- `useState` triggers a re-render when its state is updated
- Use `useRef` for values you want to mutate without affecting the component's rendering

::: tip Best Practices

1. Use `useRef` for values that don't impact the visual output
2. Avoid overusing refs for state management
3. Prefer controlled components and state when possible
4. Be cautious when directly manipulating DOM elements
::: 

::: danger Potential Gotchas

- The ref's `.current` property is mutable
- Changing `.current` doesn't trigger a re-render
- Refs are reset when components unmount

:::

::: warning When to Use `useRef`

- Storing references to DOM elements
- Keeping mutable values without re-renders
- Managing timers and intervals
- Implementing imperative animations
- Tracking values between renders without causing re-renders
::: 

By understanding `useRef`, you can create more flexible and performant React components, especially when you need to work with direct DOM manipulation or store mutable values efficiently.