# Authenticate users with Netlify identity

* [Authenticate users with Netlify Identity](https://docs.netlify.com/visitor-access/identity/)

## Enable Identity in the UI

1. In the Netlify UI, navigate to your site.
2. Select the Integrations tab. (Above in the bar)
3. Search for or navigate to **Identity**.
4. Select **Enable**.

![Enable Identity](/images/netlify/enable-identity.png)

Once we have enabled Identity, we can configure it.

This will create an Identity service instance for your site, and allow you to invite Identity users and change settings. To use the service in your site, you can add the [Netlify Identity widget](https://github.com/netlify/netlify-identity-widget) to your repository, or develop a custom solution with the [gotrue-js]() library.

We can find examples of use in the folder [example](https://github.com/netlify/netlify-identity-widget/tree/master/example) of the repo netlify/netlify-identity-widget.


![enabled-identity-resources en images](/images/netlify/enabled-identity-resources.png)

## Vue example using the Netlify Identity widget

The repo [whizjs/netlify-identity-demo-vue](https://github.com/whizjs/netlify-identity-demo-vue) has a demo of how to use Netlify Identity with Vue using the [Netlify Identity widget](https://github.com/netlify/netlify-identity-widget)
that is deployed at <https://netlify-identity-demo-vue.netlify.app/> but the demo currently (2023) fails when signup.

When trying to install the depndencies using node v18.8 and npm 9.2 I get the following error:

```bash
[1/2] ⡀ fsevents
warning Error running install script for optional dependency: "/Users/casianorodriguezleon/campus-virtual/2223/learning/netlify-learning/netlify-identity-demo-vue/node_modules/fsevents: Command failed.
```

Same thing with node v16. However the 

```
yarn serve
```
command works in v16 but not in v18.