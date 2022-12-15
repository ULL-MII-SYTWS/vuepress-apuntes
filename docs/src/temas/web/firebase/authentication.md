# Firebase Authentication

See section [Firebase Authentication](https://firebase.google.com/docs/auth)

Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. 
It supports authentication using 
* passwords, 
* phone numbers, 
* popular federated identity providers like Google, Facebook and Twitter

Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.

## Authenticate Using GitHub with JavaScript

See section [Authenticate Using GitHub with JavaScript](https://firebase.google.com/docs/auth/web/github-auth)

## Before you begin

*   [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup).
*   In the [Firebase console](https://firebase.google.com//console.firebase.google.com/), open the **Auth** section.
*   On the **Sign in method** tab, enable the **GitHub** provider.
*   Add the **Client ID** and **Client Secret** from that provider's developer console to the provider configuration:
    1.  [Register your app](https://github.com/settings/applications/new) as a developer application on GitHub and get your app's OAuth 2.0 **Client ID** and **Client Secret**.
    2.  Make sure your Firebase **OAuth redirect URI** (e.g. `my-app-12345.firebaseapp.com/__/auth/handler`) is set as your **Authorization callback URL** in your app's settings page on your [GitHub app's config](https://github.com/settings/developers).
*   Click **Save**.

