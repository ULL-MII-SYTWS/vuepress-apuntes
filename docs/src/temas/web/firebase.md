---
---
# Notes taken while reading the Firebase Docs

 The Firebase Realtime Database allows secure access to the database directly from client-side code. 
 Data is persisted locally, and even while offline, realtime events continue to fire, giving the end user a responsive experience.

 ## API keys for Firebase

API keys for Firebase are different from typical API keys

Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources; 
that can only be done with 

1. Firebase Security Rules (to control which users can access resources) and 
2. App Check (to control which apps can access resources).

Usually, you need to fastidiously guard API keys (for example, by using a vault service or setting the keys as environment variables); however, API keys for Firebase services are ok to include in code or checked-in config files.

Although API keys for Firebase services are safe to include in code, there are a few specific cases when you should enforce limits for your API key; for example, if you're using 
* Firebase ML, 
* Firebase Authentication with the email/password sign-in method, or 
* a billable Google Cloud API. 
  
## Creating API keys for Firebase

See section [Creating API keys](https://firebase.google.com/docs/projects/api-keys#create-api-keys) of the firebase docs.

## First steps: Demo projects

Go to the [Firebase demo](/firebase/demo) chapter

## Understand Firebase projects

See [Understand Firebase projects](https://firebase.google.com/docs/projects/learn-more?authuser=0&hl=en)

A Firebase project is the top-level entity for Firebase. In a project, you can 
1. register your Apple, Android, or **web apps**. 
2. After you register your apps with Firebase, you can add the Firebase SDKs for any number of Firebase products to your apps.

## Hierarchy of Firebase projects

A **Firebase project** is like a container for all your apps and any resources and services provisioned for the project.
    
A Firebase project can have one or more **Firebase Apps** registered to it (for example, both the iOS and Android versions of an app, or both the free and paid versions of an app).

All Firebase Apps registered to the same Firebase project **share and have access to all the same resources and services provisioned for the project**. Here are some examples:

*   All the Firebase Apps registered to the same Firebase project share the same backends, like Firebase Hosting, Authentication, Realtime Database, Cloud Firestore, Cloud Storage, and Cloud Functions.
*   All Firebase Apps registered to the same Firebase project are associated with the same Google Analytics property, where each Firebase App is a separate data stream in that property.

![/images/firebase-projects-hierarchy_projects-apps-resources.png](/images/firebase-projects-hierarchy_projects-apps-resources.png)

::: tip  Google Cloud projects as virtual containers for data, code, configuration, and services

## Relationship between Firebase projects and Google Cloud

When you create a new Firebase project, you're actually creating a [Google Cloud project](https://cloud.google.com/docs/overview/?authuser=0&utm_source=firebase.google.com&utm_medium=referral#projects) behind the scenes. 

You can even create a Google Cloud project first, then add Firebase to the project later. 
You can think of **a Google Cloud project as a virtual container for data, code, configuration, and services**.

A Firebase project is actually just a Google Cloud project that has additional **Firebase-specific configurations and services enabled for it**.
:::

Since a Firebase project is a Google Cloud project, you can interact with it in the Firebase console as well as in the Google Cloud Console and the Google APIs console.  You can use products and APIs from both.  Billing and permissions and unique identifiers are shared across Firebase and Google Cloud. Deleting a project deletes it in both.

Deleting a project deletes it across Firebase and Google Cloud.

## Setting up a Firebase project and registering apps

You can set up a Firebase project and register apps in 

1. the Firebase console 
2. via the [Firebase Management REST API](https://firebase.google.com/docs/projects/api/reference/rest)[^rest-api] or 
3. the [Firebase CLI](https://firebase.google.com/docs/reference/node). 
 
When you set up a project and register apps, you need to make some organizational decisions and add Firebase-specific configuration information to your local projects.

For production apps, you need to set up a clear development workflow, which usually involves using multiple environments. Review our documentation on developer workflows, including general best practices and general security guidelines for setting up Firebase projects and registering apps to create your development workflow.

## First Steps

See section [Add Firebase to your JavaScript project](firebase/first-steps)

## Get started with Firebase Hosting

See  section [Get started with Firebase Hosting](firebase/hosting)

## Authentication

See section [Authentication](firebase/authentication)

## Cloud Functions

See section [Cloud Functions](firebase/cloud-functions)

## References

* [Understand Firebase projects](https://firebase.google.com/docs/projects/learn-more?authuser=0&hl=en)
* Consoles:
  * Google Firebase Console: [https://console.firebase.google.com/u/0/](https://console.firebase.google.com/u/0/)
  * Google Cloud Console: [https://console.cloud.google.com/](https://console.cloud.google.com/)
  * Google API Console: [https://console.cloud.google.com/apis/](https://console.cloud.google.com/apis/dashboard)
* [Google Cloud project](https://cloud.google.com/docs/overview/?authuser=0&utm_source=firebase.google.com&utm_medium=referral#projects)

## Footnotes

[^rest-api]: The [Firebase Management REST API](https://firebase.google.com/docs/projects/api/reference/rest) enables programmatic setup and management of Firebase projects, including a project's Firebase resources and Firebase apps.

