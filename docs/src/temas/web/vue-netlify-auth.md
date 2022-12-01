---
permalink: /oauth-intro/
---
# OAuth Authentication with GitHub as Providere and Netlify as Server

One challenge for frontend projects is handling authentication. 

OAuth2 is a widely accepted standard used by many services and APIs, but the OAuth authentication process requires a server (here the netlify server) to send a signed request to the OAuth server (here GitHub OAuth server), signed with a secret that you can never expose to the client side of your application.

Netlify solves this problem by providing an integrated service that will sign the OAuth requests for you and give back an access token ready to use.

Netlify currently supports authentication with GitHub, GitLab, and Bitbucket.

## OAuth provider setup: GitHub

You need to create an API application and make note of the **Client ID** and a **Client Secret** so that you can use them in your Netlify configuration.

1. In GitHub, go to your account Settings and select Developer Settings, then OAuth Apps or [use this shortcut](https://github.com/settings/developers).

  ![](https://docs.netlify.com/images/visitor-access-github-oauth-config.png)

2. **Select Register a new application**.

3. For the Authorization callback URL, enter **https://api.netlify.com/auth/done**. The other fields can contain anything you want.

4. On your new application’s GitHub overview page, make note of the **Client ID**.

5. Generate a **Client Secret** and make note of it for later. You can’t access this secret again.

## Netlify UI settings

When you complete application registration with GitHub, you need to add the **Client ID** and **Client Secret** to your Netlify site:

1. Go to **Site settings > Access control > OAuth**.

2. Under **Authentication Providers**, select **Install Provider**.

3. Select **GitHub** and enter the **Client ID** and **Client Secret** from earlier, then save.


## Site usage example

Once you’ve configured an authentication provider, you can use it to obtain an access token in your application.

You can preview the OAuth user experience in [this netlify-auth-demo repo](https://github.com/netlify/netlify-auth-demo). It contains two examples: One with jQuery and another in Vanilla JS.
The repo has been archived by the owner. The demos is running at <https://auth-demo.netlify.app/>

Here’s an example of how to ask users to authenticate with GitHub and use the resulting token in your application’s calls to the GitHub API:

```js
<!DOCTYPE html>
<html>
  <head>
    <title>GitHub Authentication Example</title>

    <!-- Make sure to include Netlify’s authentication library -->
    <!-- Also available from npm as netlify-auth-providers -->
    <script src="https://unpkg.com/netlify-auth-providers"></script>
  </head>
  <body>
    <h1>GitHub Authentication Example:</h1>
    <p><a href="#" id="login">Authenticate</a></p>
    <p>Token: <span id="output-token">Not authenticated yet</span></p>
    <p>
      User emails:
      <span id="output-email">Not authenticated yet</span>
    </p>

    <script>
      const anchorTag = document.getElementById("login");
      const outputToken = document.getElementById("output-token");
      const outputEmail = document.getElementById("output-email");

      anchorTag.addEventListener("click", (event) => {
        event.preventDefault();

        const authenticator = new netlify.default({});

        authenticator.authenticate(
          // Set the OAuth provider and token scope
          // Provider can be "github", "gitlab", or "bitbucket"
          // The scopes available depend on your OAuth provider
          { provider: "github", scope: "user" },
          async function (error, data) {
            if (error) {
              outputToken.innerText =
                "Error Authenticating with GitHub: " + error;
            } else {
              outputToken.innerText =
                "Authenticated with GitHub. Access Token: " +
                data.token;
              outputEmail.innerText = await loadGitHubUserEmails(
                data.token
              );
            }
          }
        );
      });

      async function loadGitHubUserEmails(token) {
        return await fetch("https://api.github.com/user/emails", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        })
          .then((response) => response.json())
          .then((response) => JSON.stringify(response));
      }
    </script>
  </body>
</html>
```

OAuth tokens are scoped[^scoped] to limit access. Each OAuth provider has different scopes you can use in your application. In the above GitHub example, the scope is set to **user**, which has **read** and **write** access to profile information.

If you don’t provide a scope, OAuth providers usually apply the **default scope** to your token. Default scopes typically only have read access to public information.

* [GitHub Scopes for OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps)

## References

* [Use OAuth provider tokens on your site](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#oauth-provider-setup) is the original article
* [Getting Started with JWT and Identity](https://www.netlify.com/blog/2018/01/23/getting-started-with-jwt-and-identity/?_ga=2.192508130.971053589.1669893799-1485033729.1667990322)
* [Failed experiment: demo vue](/temas/web/netlify-identity-demo-vue-failed.md)

## Footnotes 

[^scoped]: Scopes let you specify exactly what type of access you need. Scopes limit access for OAuth tokens. 