# Optional Chaining

Syntax:

```js
obj.val?.prop
obj.val?.[expr]
obj.func?.(args)
```

```js
> obj = {propName: 4}
{ propName: 4 }
> nestedProp = obj?.["prop" + "Name"];
4
```

## References

* [Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
