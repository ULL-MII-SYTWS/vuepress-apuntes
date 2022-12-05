---
sidebar: auto
next: gh-api-graphql.md
prev: gh.md
---

# GH REST API

## Manual de gh api

* [Manual de gh api](https://cli.github.com/manual/gh_api)

## Authentication 

* [Manual de gh auth](https://cli.github.com/manual/gh_auth)
  * [Manual de gh auth login](https://cli.github.com/manual/gh_auth_login)

### Token Authentication

Go to [github.com/settings/tokens](https://github.com/settings/tokens)
to generate a new token for `gh` and set then environment variable 
`GITHUB_TOKEN` (`export GITHUB_TOKEN= ...`)

Para generar el token:

[user -> settings -> developer settings -> Personal access tokens](https://github.com/settings/tokens) 

o mas rápido vete a <https://github.com/settings/tokens>

Una vez se tiene un token:

```
# authenticate against github.com by reading the token from a file
$ gh auth login --with-token < mytoken.txt
```

### Browser Authentication

También es posible autenticarse con el browser usando la opción `-w`:

```
➜  graphql-examples git:(main) ✗ gh auth login -w

! First copy your one-time code: F4D5-59E6
- Press Enter to open github.com in your browser...
```

Esto abre el browser, nos pide la contraseña que aparece arriba 

![](/images/gh-auth-browser-1.png)

y nos pide confirmar los permisos.


![](/images/gh-auth-browser-2.png)

## Example: Issues of a repo

Placeholder values `:owner`, `:repo`, and `:branch` in the endpoint argument will get replaced with values from the repository of the current directory.

```json
➜  learning-graphql-with-gh git:(main) gh api repos/:owner/:repo/issues | jless
```

### jless

We have piped the output to [jless](https://jless.io/user-guide.html)

![](/images/gh-api-issues-jless.png)

jless is a tool to navigate JSON data in the terminal. It is similar to `less` but for JSON data

![](https://jless.io/assets/jless-recording.gif)

If you are familiar with  `vi`  you'll find the shortcuts are similar.

### jq

We can pipe the output to [jq](jq) or use the [`-q` or `--jq` option of `gh api`](https://cli.github.com/manual/gh_api):

```
$  gh api repos/:owner/:repo/issues | jq '.[0] | .title'
"tema0-presentacion/practicas/pb-gh-campus-expert/"
```

Of course, we can explicit the repo and owner. For example:

```
➜ gh api repos/ULL-MII-SYTWS-2021/p01-t1-iaas-alu0101040882/issues | \ 
         jq '.[0] | .user.login, .body'
"crguezl"
"Hola @alu0101040882, \r\n\r\nVeo que alguno ya está trabajando en la práctica de
```

### Thunder Client

[Thunder Client](https://github.com/rangav/thunder-client-support#thunder-client) is a lightweight Rest API Client Extension for Visual Studio Code. You can use it to prepare and test your REST API requests.

![](/images/thunder-client-1.png)

## POST Example: Create a Repo

Let us see an example using the `POST` method. We will start from the example 
in the [Create an organization repository in the GitHub API getting started guide](https://docs.github.com/en/rest/repos/repos#create-an-organization-repository):

```
# GitHub CLI api
# https://cli.github.com/manual/gh_api

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /orgs/ORG/repos \
  -f name='Hello-World' \
 -f description='This is your first repository' \
 -f homepage='https://github.com' \
 -F private=false \
 -F has_issues=true \
 -F has_projects=true \
 -F has_wiki=true 
 ```

We use 

* `-X` or `--method string`to set the HTTP method for the request (default `GET`) and 
* `-f`to set the fields:

Pass one or more `-f/--raw-field` values in `"key=value"` format to add static string
parameters to the request payload. 

The `-F/--field` flag has type conversion based on the format of the value.
For instance placeholder values `"{owner}"`, `"{repo}"`, and `"{branch}"` get populated with values
from the repository of the current directory and if the value starts with `"@"`, the rest of the value is interpreted as a filename to read the value from.

```
➜  /tmp gh api -X POST -f name=repo-prueba-gh-api -f private=true /user/repos
```

This way we have created a private repo inside the user scope:

![](/images/gh-api-post-create-repo.png)


```
➜  input-option git:(master) ✗ gh repo-delete crguezl/repo-prueba-gh-api
➜  input-option git:(master) ✗ gh api -f name=repo-prueba-gh-api -f private=true /user/repos
```

## Pagination

The option `--paginate` allow us to make additional HTTP requests to fetch 
all pages of results. Here is an example. 

```
➜  gh alias set get-repos 'api /orgs/$1/repos'
- Adding alias for get-repos: api /orgs/$1/repos
✓ Added alias.
➜  gh alias list
co:         pr checkout
get-repos:  api /orgs/$1/repos
``` 

```
➜ gh get-repos ULL-MII-SYTWS-2021
```

![](/images/gh-alias-repos.png)

Now  we can pipe the output to [jq](jq) to get the names of the repos:

```
➜  gh get-repos ULL-MII-SYTWS-2021 | jq '.[].full_name' -
"ULL-MII-SYTWS-2021/sytws-2021-meta"
"ULL-MII-SYTWS-2021/sytws2021-private"
"ULL-MII-SYTWS-2021/books-shared"
"ULL-MII-SYTWS-2021/p01-t1-iaas-fcohdezc"
"ULL-MII-SYTWS-2021/p01-t1-iaas-crguezl"
"ULL-MII-SYTWS-2021/p01-t1-iaas-alu0100886870"
...
```

Let ask for the repos in the PL organization for the course 19/20:

```
➜ gh api /orgs/ULL-ESIT-PL-1920/repos | jq '.[] | .name' | wc
      30      30    1088
```
It gave us 30 repos. There are much more than that in that organization.

If we use `--paginate` the request takes a long time and gives us near a thousand repos:

```
➜ gh api --paginate /orgs/ULL-ESIT-PL-1920/repos | jq '.[] | .name' | wc
     990     990   32868
```

## Paginating Manually with the link header

GitHub's API uses two pagination methods: 

1. **Page-based pagination**: If the `link` header includes page, then the operation uses page-based pagination. 
2. **Cursor-based pagination**: If the link header includes before and after, then the operation uses cursor-based pagination.

The `link` header for page-based pagination will tell you information about the 

- previous, 
- next, 
- first, and 
- last pages. 
 
If you did not request a specific page, then the response will default to the first page and 
information about the first and previous pages will be omitted.

![](/images/github-api-pagination-1.png)

## Specifying -f switches the method to POST


Note that adding request parameters will automatically switch the
request method to `POST`. To send the parameters as a `GET` query string instead, use
`--method GET` or `-X GET`.

::: warning Specifying `-f` switches the method to POST

For instance, to get the private repos of an organization with a pagination of 2 items per page:

```
✗ gh api --method="GET" orgs/ULL-MII-SYTWS-2223/repos \
         -f  per_page=2 \
         -f type=private | jless
```

add if we want the third `page`:

```
➜  gh api --method=GET orgs/ULL-MII-SYTWS-2223/repos \
          -f=per_page=2 \
          -f page=3 | jless
```
:::

##  Templates for the output

Once the output is legal JSON, it can be formatted according to a required formatting string by adding the `-t` or  `--template` flag. 

See the docs 

* [gh help for formatting](https://cli.github.com/manual/gh_help_formatting)
* [Go template](https://pkg.go.dev/text/template).

The command:

```
gh api repos/crguezl/learning-bash/issues 
```

produces an array of objects with fields like `title`, `labels` (an array of objects with fields like `name` and `description`) and `body`.

Here is an example of template that traverses the array using the syntax:
::: v-pre
(`{{range .}}` ... `{{end}}`)
:::
and prints the title, labels and body:

::: v-pre
```
➜  gh-learning git:(master) ✗ cat template.gotemplate
{{range .}}Title: {{.title}}
Labels: ({{.labels | pluck "name" | join ", " | color "yellow"}})
Body: {{.body}}
{{end}}
```
:::

The Go docs say:

::: v-pre
```
{{range pipeline}} T1 {{end}}
	The value of the pipeline must be an array, slice, map, or channel.
	If the value of the pipeline has length zero, nothing is output;
	otherwise, dot is set to the successive elements of the array,
	slice, or map and T1 is executed. 
```
:::

 In addition to the Go template functions in the standard library, the following functions can be used with this formatting directive:

* `autocolor:` like color, but only emits color to terminals
* `color <style> <input>:` colorize input using <https://github.com/mgutz/ansi>
* `join <sep> <list>:` joins values in the list using a separator
* `pluck <field> <list>:` collects values of a field from all items in the input
* `tablerow <fields>...:` aligns fields in output vertically as a table
* `tablerender:` renders fields added by tablerow in place
* `timeago <time>:` renders a timestamp as relative to now
* `timefmt <format> <time>:` formats a timestamp using Go's Time.Format function
* `truncate <length> <input>:` ensures input fits within length
* `hyperlink <url> <text>:` renders a terminal hyperlink

and let us use it:

```
➜  gh-learning git:(master) ✗ gh api repos/crguezl/learning-bash/issues \
                              --template "$(cat template.gotemplate)"
Title: issue de prueba
Labels: (bug, documentation, duplicate, enhancement, help wanted, good first issue, invalid, question)
Body: 👍  blah ...
```

The `Labels` appear in yellow.
