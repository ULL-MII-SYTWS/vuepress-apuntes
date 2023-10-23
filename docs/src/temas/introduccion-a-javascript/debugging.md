---
---
## Debugging 

### Debugging Client Code with Chrome

* [Debugging in Chrome in the client in javascript.info](https://javascript.info/debugging-chrome)

### Debugging NodeJS with Chrome

Insert at least one `debugger` statement where do you want set the initial stop in your code. For instance:

```js
function* fails(arg) {
    try {
        console.log("----Error handling example---");

        debugger;
        ...
    } catch (err) { ... }
}
```

In the terminal:

```
➜   node --version
v14.4.0
➜  building-async-await-solution git:(trycatch) node --inspect-brk solution.mjs 
Debugger listening on ws://127.0.0.1:9229/cae3929d-80b4-4179-91cc-3e9ccdb1e4b7
For help, see: https://nodejs.org/en/docs/inspector
```

the option `--inspect-brk=[host:port]` does the following:

* Enable inspector agent
* Bind to address or hostname `host` (default: 127.0.0.1)
* Listen on port `port` (default: 9229)
* Break before user code starts

In the browser open the URL `chrome://inspect` and `click` in the *inspect* link:

![](/images/chrome-debugging-nodejs-inspect.jpg)

The Chrome debugger will stop in the first `debugger` statement:

![](/images/chrome-debugging-nodejs-debug-statements.png)

Insert `debugger` statements wherever you want to set a break-point:

![]({{site.baseurl}}/assets/images/chrome-debugging-nodejs-debug-statements.png)

## Debugging Node.js with Visual Studio

### Attach to Node.js Process

You can  run the program as we explained in the chrome debugger section:

```
➜  building-async-await-solution git:(trycatch) ✗ node --inspect-brk solution.mjs
Debugger listening on ws://127.0.0.1:9229/64e8d287-ee15-46f4-908f-4cffbc08563d
For help, see: https://nodejs.org/en/docs/inspector
```
And then in the command palette (F1) select `Debug: Attach to Node Process`:

![](/images/attach-to-node-process.png)

Then pick the process you want to debug:

![](/images/pick-the-node-process.png)

The debugger will start controlling the process:

![](/images/node-process-debugging.png)


### Auto Attach

If the <strong>Auto Attach</strong> feature is enabled, the Node debugger automatically attaches to certain Node.js processes that have been launched from VS Code's Integrated Terminal. To enable the feature, either use the <strong>Toggle Auto Attach</strong> command from the command palette (<span class="keybinding">F1</span>) 

![](/images/auto-attach.png)

or, if it's already activated, use the <strong>Auto Attach</strong> Status bar item

![](/images/auto-attach-status-bar-item.png)

After enabling Auto Attach, you'll need to restart your terminal. 

![](https://code.visualstudio.com/assets/docs/nodejs/nodejs-debugging/auto-attach.gif)

See [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## Debug Node apps con Visual Studio Code

Includes both Javascript y Typescript. Por Albert Hernández

<!-- https://youtu.be/NBLrBNDYdkE?si=FaGx-FDIwArh3AVX-->
<youtube id="NBLrBNDYdkE?si=FaGx-FDIwArh3AVX"></youtube>

## References

* [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
* [Node.JS Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
* Mis viejos apuntes: [Debugging NodeJS](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/nodejs/)
* Debugging in 2017 with Node.js YouTube video https://youtu.be/Xb_0awoShR8
    * [Debugging in 2017 with Node.js](https://youtu.be/Xb_0awoShR8) YouTube
