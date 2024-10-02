---
video: "https://youtu.be/_W9B7qc9lVc"
---
# GitHub CodeSpaces

## Introduction

GitHub Codespaces allows users to use a Visual Studio Code backed editor, terminal, and debugger along with GitHub version control in the browser or on a desktop. 

Integrating Codespaces into your GitHub Classroom experience can provide a scalable solution for quickly getting CS students started using virtually any device including Chromebooks and iPads. 
If it’s got a browser, it’s now a development environment for your students.

Here is the documentation: [GitHub Codespaces](https://docs.github.com/en/codespaces):

<youtube></youtube>

## Personalizing your Codespace
<!-- ## Personalizing your Codespace -->
Si quieres personalizar tu Codespace, puedes leer [Personalizing GitHub Codespaces for your account](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-github-codespaces-for-your-account).Puedes personalizar GitHub Codespaces usando 

1. Un [repositorio `dotfiles` en GitHub](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-github-codespaces-for-your-account#dotfiles) o 
2. Usando [Settings Sync](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-github-codespaces-for-your-account#settings-sync).

See [codespaces-contrib/dotfiles](https://github.com/codespaces-contrib/dotfiles), 
[casiano-rodriguez/dotfiles](https://github.com/casiano-rodriguez/dotfiles) and [crguezl/dotfiles](https://github.com/crguezl/dotfiles) (the last two are private repos)

### Exercise: Personalizing your Codespace  

1. Generate a token with admin power (go to <https://github.com/settings/tokens>). Give them superpowers and save it as `admin` token 
2. Go to your **Codespace user secrets** section  <https://github.com/settings/codespaces> and
   - Add a `GH_TOKEN` secret in the codespace repository settings. See <https://cli.github.com/manual/gh_help_environment>.
   - As value use the token you generated in the previous step.
     
     ![/images/codespaces-secrets-admin-token.png](/images/codespaces-secrets-admin-token.png)

     Then you can use such token to access from the codespace to other repos, organizations, etc. 
     For instance, you can use it to clone a private repo different from the one you are working on. Here the 
     user is in a codespace for the repo `ULL-ESIT-DMSI-2425/intro2sd-casiano-rodriguez-leon-alu0100291865` but clones
     the repo `ULL-MII-SYTWS-2425/race-condition-casiano-rodriguez-leon-alu0100291865`:

     ```bash
      @casiano-rodriguez ➜ /workspaces/intro2sd-casiano-rodriguez-leon-alu0100291865 (main) $ \
        gh repo clone ULL-MII-SYTWS-2425/race-condition-casiano-rodriguez-leon-alu0100291865
      Cloning into 'race-condition-casiano-rodriguez-leon-alu0100291865'...
      remote: Enumerating objects: 8, done.
      remote: Counting objects: 100% (8/8), done.
      remote: Compressing objects: 100% (8/8), done.
      remote: Total 8 (delta 1), reused 2 (delta 0), pack-reused 0 (from 0)
      Receiving objects: 100% (8/8), 60.96 KiB | 60.96 MiB/s, done.
      Resolving deltas: 100% (1/1), done.
      ```
3. Activate the section **Dotfiles**. 
4. Create a `dotfiles` repository in your GitHub account. 
   - [![/images/codespaces-dotfile.png](/images/codespaces-dotfile.png)](https://github.com/casiano-rodriguez/dotfiles)
   - Copy what you want of your `.gitconfig` and `.bashrc` files to the `dotfiles` repository.
   - Write a `install.sh` script that installs your favorite tools. Example:
  
     ```bash
     #!/bin/bash

      if [ -f /workspaces/.codespaces/.persistedshare/dotfiles/.gitconfig ]; then
          ln -s /workspaces/.codespaces/.persistedshare/dotfiles/.gitconfig ~/.gitconfig
      else
          echo "Error: Archivo .gitconfig not found"
      fi


      gh alias set cd '!gh config set current-org "$1" 2>/dev/null'
      gh alias set pwd '!gh config get current-org'
      #gh extension install github/gh-classroom
      #gh extension install github/gh-copilot
      gh extension install gh-cli-for-education/gh-org-teams
      gh extension install crguezl/gh-org-clone
      #gh extension install crguezl/gh-submodule-add
      ```
5. Put all you repos as **Trusted repositories** in the corresponding subsection of <https://github.com/settings/codespaces>.
6. Activate the [Settings Sync](https://docs.github.com/en/codespaces/customizing-your-codespace/personalizing-github-codespaces-for-your-account#settings-sync) section.
   - ![/images/codespaces-settings-sync.png](/images/codespaces-settings-sync.png) 
   - [Settings Sync section of the Visual Studio Code documentation](https://code.visualstudio.com/docs/editor/settings-sync)
7. Enable [GPG verification](/temas/introduccion-a-javascript/gpg) in your Codespace


### How to login to GitHub Copilot using CLI

See [How to log-into GitHub Copilot using CLI](https://medium.com/@j622amilah/how-to-log-into-github-copilot-using-cli-f11bb29bfaf7)

1. Install `gh`
2. Use your GitHub account token to login

   ```bash
   gh auth login --web -h github auth login --with-token ghp_b...hv | \
                                   gh auth login --scopes "copilot"
   ```
   A web interface sign-in without keyboard prompts will open, and you can sign in by entering the one-time code on the screen.
3. Install the Copilot in the CLI extension

    ```bash
    gh extension install github/gh-copilot
    ```
4. Use the extension
  
   ```bash
      @crguezl ➜ /workspaces/intro2sd-casiano-rodriguez-leon-alu0100291865 (main) $ \
          gh copilot suggest -t git "Undo the most recent local commits"

      Welcome to GitHub Copilot in the CLI!
      version 1.0.5 (2024-09-12)

      I'm powered by AI, so surprises and mistakes are possible. 
      Make sure to verify any generated code or suggestions, 
      and share feedback so that we can learn and improve. 
      For more information, see https://gh.io/gh-copilot-transparency

      Suggestion: 
      git reset --hard HEAD~n                                                                   
      ? Select an option  [Use arrows to move, type to filter]
      > Copy command to clipboard
        Explain command
        Execute command
        Revise command
        Rate response
        Exit
   ```


### Codespace Personalization: Troubleshooting

When you create a codespace, your repository is cloned into the `/workspaces` directory in your codespace. not in your home directory! 
Outside `/workspaces`, with the exception of the `/tmp` directory, the directories in a codespace are tied to the lifecycle of the container. 

See the docs at [Troubleshooting personalization options for GitHub Codespaces](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-personalization-for-codespaces).

Check `/workspaces/.codespaces/.persistedshare/dotfiles` to see if your `dotfiles` were cloned.

- If your `dotfiles` were cloned, try manually re-running your install script to verify that it is executable.
  
- If your `dotfiles` were not cloned, check `/workspaces/.codespaces/.persistedshare/`

  ```bash
  @casiano-rodriguez ➜ /workspaces $ ls -a .codespaces/.persistedshare/*.log
  .codespaces/.persistedshare/creation.log
  @casiano-rodriguez ➜ /workspaces $ ls -a .codespaces/.persistedshare/*.txt
  .codespaces/.persistedshare/vsserverhostlog.txt  
  .codespaces/.persistedshare/vsserverterminallog.txt
  ```
  The file `.codespaces/.persistedshare/vsserverterminallog.txt` contains the output of the terminal including escape codes.

  The file `.codespaces/.persistedshare/vsserverhostlog.txt` contains the output of the host.
- Check `/workspaces/.codespaces/.persistedshare/creation.log` for possible issues. For more information, see [Creation logs](https://docs.github.com/en/codespaces/troubleshooting/github-codespaces-logs#creation-logs).

  ```bash
  @casiano-rodriguez ➜ /workspaces $ cat .codespaces/.persistedshare/creation.log
  ```

  See the [output of the previous `cat .codespaces/.persistedshare/creation.log` command](/temas/introduccion-a-javascript/codespaces-persistedhare-creation-log)


For instance, I notice that the `.gitconfig` file in the dotfiles repositoryis is in `/workspaces/.codespaces/.persistedshare/dotfiles/.gitconfig`
but hasn't being copied to the home directory (`/home/codespace`). 
So I manually link it:

```bash
 ln -s /workspaces/.codespaces/.persistedshare/dotfiles/.gitconfig ~/
 ```

### The codespaces shared folder

The shared folder is located at `/root/.codespaces/shared/`.

```bash
@casiano-rodriguez ➜ /workspaces/intro2sd-casiano-rodriguez-leon-alu0100291865 (main) $ ls -a ../.codespaces/shared
.environmentConfigurationCompleted  
devContainerTelemetry.json  
merged_devcontainer.json  
unifiedPostCreateOutput.json
.user-secrets.json                  
editors                            // folder
postCreateOutput.json     
user-secrets-envs.json
.env          
codespaceStatusTool.js              
environment-variables.json  
read-config.json
.env-secrets  
cs-agent.sock                       // a socket
first-run-notice.txt        
resource-usage.json
```

 It contains among others the `user-secrets.json` file:

`➜ /workspaces/dotfiles (main) $ cat ../.codespaces/shared/.user-secrets.json  | jq '.'`
```json
[
  {
    "type": "EnvironmentVariable",
    "name": "GITHUB_SERVER_URL",
    "value": "https://github.com"
  },
  {
    "type": "EnvironmentVariable",
    "name": "GITHUB_API_URL",
    "value": "https://api.github.com"
  },
  {
    "type": "EnvironmentVariable",
    "name": "GITHUB_GRAPHQL_URL",
    "value": "https://api.github.com/graphql"
  },
  ...
  {
    "type": "EnvironmentVariable",
    "name": "GITHUB_TOKEN",
    "value": "ghu_XXXX...XXX"
  },
  ...
  {
    "type": "EnvironmentVariable",
    "name": "GITHUB_USER",
    "value": "casiano-rodriguez"
  },
  ...
  {
    "type": "EnvironmentVariable",
    "name": "CODESPACES",
    "value": "true"
  },
  {
    "type": "EnvironmentVariable",
    "name": "CODESPACE_NAME",
    "value": "studious-potato-blah-blah"
  }
]
```
THE `GH_TOKEN` secret does not appear in the `user-secrets.json` file. 


## GitHub Codespaces Prebuilds

See the section [Prebuilding your Codespaces](/temas/introduccion-a-javascript/devcontainers) in this notes

## Teachers: Using it in Classroom Assignments

See [Setting up Codespaces in GitHub Classroom](/temas/introduccion-a-javascript/teachers-classroom-codespaces)