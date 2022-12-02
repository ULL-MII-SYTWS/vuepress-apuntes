---
---
# OAuth Authentication with GitHub as Oauth2 Provider and Netlify providing the Server

One challenge for frontend projects is handling authentication. 

OAuth2 is a widely accepted standard used by many services and APIs, but  

::: tip the OAuth authentication process requires
1. a HTTP server (here we will solve it using the server provided by netlify) 
2. The HTTP server must be able to send a **signed request** to a OAuth server 
3. a OAuth server (here we will use the GitHub OAuth server), 
4. the **signed request** is signed with a secret **that you can never expose to the client side of your application**.
:::

Thus, we have several players: the developer of the application, the user of the application, the browser,  the (web) application, the resource server and the OAuth server. The picture only shows some of them

![](/images/oauth-players.jpg)

Netlify solves this problem by providing an integrated service in their servers **that will sign the OAuth requests for our programs** and give back an **access token** ready to use.

Netlify currently supports authentication with 

- GitHub, 
- GitLab, and 
- Bitbucket.

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

```html
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

  <p>Token: <pre id="output-token">Not authenticated yet</pre></p>

  <p>
    User login and emails: <br/>
    <pre id="output-email">Not authenticated yet</pre>
  </p>

  <script>
    const anchorTag = document.getElementById("login");
    const outputToken = document.getElementById("output-token");
    const outputEmail = document.getElementById("output-email");
    debugger;

    anchorTag.addEventListener("click", (event) => {
      event.preventDefault();

      const authenticator = new netlify.default({}); // {id: site id, base_url: by default is https://api.netlify.com 

      authenticator.authenticate(
        // Set the OAuth provider and token scope
        // Provider can be "github", "gitlab", or "bitbucket"
        // The scopes available depend on your OAuth provider
        {
          provider: "github",
          scope: "user"
        },
        async function (error, data) {
          if (error) {
            outputToken.innerText =
              "Error Authenticating with GitHub: " + error;
          } else {
            outputToken.innerText =
              "Authenticated with GitHub. Access Token: " + data.token.substring(0, Math.min(10, data.token.length)) + "...";
            outputEmail.innerText =
              await loadGitHubUserEmails(data.token);
          }
        }
      );
    });

    async function getGH(url, token) {
      let response = await fetch(url, {
        Accept: "application/vnd.github.v3+json",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      return await response.json();
    }

    async function loadGitHubUserEmails(token) {

      let user = await getGH("https://api.github.com/user", token);
      let emails = await getGH("https://api.github.com/user/emails", token);
      emails = emails.map(e => e.email);
      let result = { login: user.login, emails: emails};
      return JSON.stringify(result, 2);
    }
  </script>
</body>

</html>
```

OAuth tokens are scoped[^scoped] to limit access. Each OAuth provider has different scopes you can use in your application. In the above GitHub example, the scope is set to **user**, which has **read** and **write** access to profile information.

If you don’t provide a scope, OAuth providers usually apply the **default scope** to your token. Default scopes typically only have read access to public information.

* [GitHub Scopes for OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps)

## User Identification Process

The diagram below shows the communication process when an user authenticates  against our OAuth configured web app:

   
  ![](/images/oauth2-scheme.png)

1. El usuario visita la página web de nuestra aplicación desplegada en netlify:

  ![](/images/oauth-netlify-identity-1.png)

2. El usuario ha hecho click en `authenticate`. Se le redirige a GitHub con información adjunta de la web app. 
 
  Aparece el scope **Personal user data: full access**. Se le ofrece la oportunidad de dar acceso a las organizaciones de las que es admin o a solicitarlas a los admins de las mismas.

  ![](/images/oauth-netlify-identity-2.png)

3. GitHub le solicita al usuario que se autentique, a veces incluso si ya lo estaba. 

  ![](/images/oauth-netlify-identity-3.png)

4. A la app en netlify le llega el token de sesión generado y esta instancia de ejecución de la app está autenticada con los scopes con GitHub por lo que puede obtener datos privados:

  ![](/images/oauth-netlify-identity-4.png)


## References

* [Use OAuth provider tokens on your site](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#oauth-provider-setup) is the original article
* Repo [ULL-MII-SYTWS/netlify-identity-demo-vue](https://github.com/ULL-MII-SYTWS/netlify-identity-demo-vue) with the example  
* [Getting Started with JWT and Identity](https://www.netlify.com/blog/2018/01/23/getting-started-with-jwt-and-identity/?_ga=2.192508130.971053589.1669893799-1485033729.1667990322) at Netlify Blog January 23, 2018
* [netlify-identity-widget](https://github.com/netlify/netlify-identity-widget) at GitHub
* [https://unpkg.com/netlify-auth-providers](https://unpkg.com/netlify-auth-providers)
* Capítulo [Oauth](http://crguezl.github.io/apuntes-ruby/node767.html) de los apuntes de Ruby del profesor Casiano Rodríguez (año 2015)
* EASY Web App Auth with Netlify Identity! by Brian Morrison
  
  <youtube id="uY1HTcTiUkM"></youtube>
* [Failed experiment: demo vue](/temas/web/netlify-identity-demo-vue-failed.md)

## Footnotes 

[^scoped]: Scopes let you specify exactly what type of access you need. Scopes limit access for OAuth tokens. 