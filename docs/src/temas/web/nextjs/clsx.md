---
title: clsx
---

# {{ $frontmatter.title }}

[clsx](https://github.com/lukeed/clsx#readme) is a simple library that lets you toggle class names easily. You can install it using npm install clsx or yarn add clsx.

Please take a look at its documentation for more details, but here's the basic usage:

Suppose that you want to create an Alert component which accepts type, which can be 'success' or 'error'.
If it's 'success', you want the text color to be green. If it's 'error', you want the text color to be red.
You can first write a CSS module (e.g. [alert.module.css](https://github.com/ULL-MII-SYTWS/assets-metadata-and-css/blob/clsx/components/alert.module.css) like this:

```css
.success {
  color: green;
}
.error {
  color: red;
}
```

And use the clsx module in [components/alert.js](https://github.com/ULL-MII-SYTWS/assets-metadata-and-css/blob/clsx/components/alert.js):

```jsx
import styles from './alert.module.css';
import clsx from 'clsx';

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}
```

Notice how the object passe to `clsx` has as keys the class names, but since the class names have been manipulated, we have to resort to the expression `[styles.success]`to evaluate the name.

### References

* Dependency: [package.json](https://github.com/ULL-MII-SYTWS/assets-metadata-and-css/blob/clsx/package.json#L9)
* Component [alert.js](https://github.com/ULL-MII-SYTWS/assets-metadata-and-css/blob/clsx/components/alert.js)
* Module [alert.module.css](https://github.com/ULL-MII-SYTWS/assets-metadata-and-css/blob/clsx/components/alert.module.css)
* Answers to Stakcoverflow question [How to use clsx in React](https://stackoverflow.com/questions/57557271/how-to-use-clsx-in-react)