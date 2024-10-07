# Jank

In the context of JavaScript and browser rendering, **"jank"** refers to **any noticeable delay, stutter, or visual stuttering** in the rendering of a web page or application. It happens when the browser is unable to keep up with the expected frame rate (typically 60 frames per second or 16.67ms per frame), resulting in lag or choppy interactions.

### Causes of Jank:
- **Long-running JavaScript tasks**: If JavaScript takes too long to execute, it can block the browser from rendering the next frame on time.
- **Heavy DOM manipulations**: Frequent updates to the DOM (e.g., resizing elements, changing layouts) can trigger reflows and repaints, which delay rendering.
- **Inefficient animations**: Animations that aren’t optimized or don’t use efficient methods like `requestAnimationFrame()` can cause frames to be missed, leading to choppy motion.
- **Expensive computations**: CPU-intensive operations, like large loops or recursive functions, can hog the browser’s resources, delaying the rendering cycle.

### Result of Jank:
When **jank** occurs, it disrupts the smoothness of user interactions. For example, when scrolling, dragging, or interacting with elements on the page, the browser may fail to update the display at the expected rate, making the page feel sluggish or unresponsive.

### How to Prevent Jank:
- **Minimize long-running tasks**: Break up heavy JavaScript operations into smaller chunks or use techniques like `setTimeout` or `requestIdleCallback`.
- **Optimize DOM updates**: Batch DOM manipulations together to reduce layout recalculations and repaints.
- **Use `requestAnimationFrame()` for animations**: This allows the browser to optimize animation timing and ensure they run in sync with rendering.
  
By preventing **jank**, you ensure a smoother and more responsive user experience in web applications.