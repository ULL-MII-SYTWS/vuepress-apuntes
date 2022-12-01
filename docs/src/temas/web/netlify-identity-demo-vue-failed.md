## Repo whizjs/netlify-identity-demo-vue

### Where 

Repo [whizjs/netlify-identity-demo-vue](https://github.com/whizjs/netlify-identity-demo-vue) a demo in Vue.js for Netlify Identity Widget.

```
➜  netlify-identity-demo-vue git:(main) git remote -v
origin  https://github.com/ULL-MII-SYTWS/netlify-identity-demo-vue.git (fetch)
origin  https://github.com/ULL-MII-SYTWS/netlify-identity-demo-vue.git (push)
up      git@github.com:whizjs/netlify-identity-demo-vue.git (fetch)
up      git@github.com:whizjs/netlify-identity-demo-vue.git (push)
```

### Troubles

Note: failed when using yarn, switched to npm. After removing yarn.lck, runs with npm.

``` 
✗ git status
En la rama master
Tu rama está actualizada con 'origin/master'.

Cambios no rastreados para el commit:
  (usa "git add/rm <archivo>..." para actualizar a lo que se le va a hacer commit)
  (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)
        borrados:        yarn.lock

Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        package-lock.json
```
### Conclusion

Was not able to deploy it at Netlify

### Dependencies


Is using Vue 2, `netlify-identity-widget`. 

[sweetalert2](https://sweetalert2.github.io/) is a beautiful, responsive, customizable, accessible (wai-aria) replacement for javascript's popup boxes with zero dependencies

```json
  "dependencies": {
    "netlify-identity-widget": "^1.5.1",
    "sweetalert2": "^7.29.2",
    "vue": "^2.5.17",
    "vue-router": "^3.0.2",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.0.0",
    "@vue/cli-plugin-eslint": "^3.0.0",
    "@vue/cli-service": "^3.0.0",
    "babel-eslint": "^10.0.1",
    "eslint": "^5.8.0",
    "eslint-plugin-vue": "^5.0.0-0",
    "vue-template-compiler": "^2.5.17"
  },
```

### Hierarchy

```
➜  netlify-identity-demo-vue git:(master) ✗ tree  -I node_modules 
.
├── README.md
├── babel.config.js
├── netlify.toml
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── Home.vue         # Home page
│   │   ├── NotFound.vue
│   │   ├── Protected.vue   # Protected page
│   │   └── Public.vue      # Public page
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── store
│       ├── index.js       # Vuex store
│       └── modules 
│           └── user.js 
└── vue.config.js

7 directories, 18 files
```