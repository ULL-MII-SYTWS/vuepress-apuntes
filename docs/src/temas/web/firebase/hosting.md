# Get started with Firebase Hosting

See [Get started with Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart?authuser=0&hl=en)

## Step 2: Initialize your project

To connect your local project files to your Firebase project, run the following command from the root of your local project directory:

```
firebase init hosting
```

During project initialization, from the Firebase CLI prompts:

1. Select a Firebase project to connect to your local project directory.

  The selected Firebase project is your "default" Firebase project for your local project directory. 
  To connect additional Firebase projects to your local project directory, set up [project aliases](https://firebase.google.com/docs/cli?authuser=0#project_aliases).

2. Specify a directory to use as your public root directory.

  This directory contains all your publicly served static files, including your `index.html` file and any other assets that you want to deploy to Firebase Hosting.

  * The default for the public root directory is called `public`.
  * You can specify your public root directory now or you can specify it later in your `firebase.json` configuration file.
  * If you select the default and don't already have a directory called `public`, Firebase creates it for you.
  * If you don't already have a valid `index.html` file or `404.html` file in your `public` root directory, Firebase creates them for you.

3. Choose a configuration for your site.

  If you select to make a one-page app, then Firebase automatically adds [rewrite configurations](https://firebase.google.com/docs/hosting/full-config?authuser=0#rewrites) for you.

At the end of initialization, Firebase automatically creates and adds two files to the root of your local app directory:

* A `firebase.json` configuration file that lists your project configuration. Learn more about this file on the [configure hosting behavior](https://firebase.google.com/docs/hosting/full-config?authuser=0) page.
* A `.firebaserc` file that stores your project aliases.


```
auth git:(master) ✗ firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /Users/casianorodriguezleon/campus-virtual/2223/learning/firebase-learning/quickstart-js/auth

Before we get started, keep in mind:

  * You are initializing within an existing Firebase project directory

? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert sel
ection, and <enter> to proceed)
❯◯ Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 ◯ Firestore: Configure security rules and indexes files for Firestore
 ◯ Functions: Configure a Cloud Functions directory and its files
 ◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ◯ Emulators: Set up local emulators for Firebase products
(Move up and down to reveal more choices)
```
