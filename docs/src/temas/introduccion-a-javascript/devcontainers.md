# Prebuilding and Dev Containers

The `.devcontainer/devcontainer.json` file is used to configure **Development Containers** (also known as **Dev Containers**) in Visual Studio Code (VS Code). A **Dev Container** is essentially a Docker-based environment that allows developers to create a fully isolated and reproducible development environment. This ensures consistency across different machines and allows for dependencies, tools, and configurations to be defined in code.

GitHub Codespaces prebuilds **help to speed up the creation of new codespaces** for large or complex repositories.
For repositories owned by organizations, repository-level settings for GitHub Codespaces are available for organizations on **GitHub Team** and GitHub Enterprise plans. See [About GitHub Codespaces prebuilds](https://docs.github.com/en/codespaces/prebuilding-your-codespaces/about-github-codespaces-prebuilds). 


Go to the configuration of the repo. In the section **GitHub Codespaces**, you can set up a prebuild configuration.
When a prebuild configuration workflow runs, GitHub creates a temporary codespace, performing setup operations up to and including any `onCreateCommand` and `updateContentCommand` commands in the [devcontainer.json](https://code.visualstudio.com/docs/remote/devcontainerjson-reference#_devcontainerjson-properties) file. 

![/images/codespace-prebuild-configuration.png](/images/codespace-prebuild-configuration.png)

As with other GitHub Actions workflows, running a prebuild configuration workflow will either consume some of the GitHub Actions minutes included with your account, if you have any, or it will incur charges for GitHub Actions minutes. Storage of codespace prebuilds is billed in the same way as storage of active or stopped codespaces. 

## Purpose of `.devcontainer/devcontainer.json`

The `devcontainer.json` file defines how the development environment should be set up inside the Dev Container. This includes specifying 

- the base Docker image, 
- environment variables, 
- dependencies, 
- ports, 

and any other configuration needed to replicate the development environment.

When a project has a `.devcontainer/devcontainer.json` file, VS Code (with the **Remote - Containers** extension) can automatically detect it and set up the Dev Container as defined in this configuration file.

## Key Features and Benefits:

1. **Consistent Development Environment**: All developers working on the project will use the same development environment, including dependencies, tools, and OS setup, which helps to eliminate "works on my machine" issues.
  
2. **Isolation**: Since the Dev Container runs inside Docker, it isolates your development environment from your local machine. This prevents issues related to conflicting dependencies or tools on the host system.

3. **Easy Onboarding**: New developers can quickly set up a working development environment without having to install various dependencies manually. By simply opening the project in VS Code, the environment is automatically created and ready to use.

4. **Reproducibility**: By defining the development environment in code (`devcontainer.json`), you ensure that it can be reproduced anywhere Docker is available, whether on a colleague's machine, in a CI/CD pipeline, or even in cloud environments.

## Example of a `.devcontainer/devcontainer.json` File

```json
{
  "name": "Node.js Development Environment",
  "image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14",
  "postCreateCommand": "npm install",
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash"
  },
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ],
  "forwardPorts": [3000],
  "remoteUser": "vscode"
}
```

## Explanation of Example:

- **`name`**: A friendly name for the Dev Container (optional).
- **`image`**: Specifies the Docker image to use as the base for the Dev Container. In this case, it uses a pre-built image for Node.js development.
- **`postCreateCommand`**: A command to run after the container is created. Here, `npm install` will install Node.js dependencies.
- **`settings`**: Custom VS Code settings. In this case, it sets Bash as the integrated terminal shell.
- **`extensions`**: VS Code extensions that should be installed in the container for enhanced functionality. Here, `eslint` and `prettier` extensions are installed automatically.
- **`forwardPorts`**: Specifies the ports from the container to forward to the host machine. Port 3000 is forwarded here, which is commonly used in web development.
- **`remoteUser`**: Defines the user inside the container. In this case, the user is `vscode`, a user that typically exists in Dev Containers.

## Typical Use Cases:
- **Web Development**: A Dev Container might be set up with Node.js, Python, or other development tools for web development projects.
- **Language-Specific Environments**: If you're working with Go, Rust, or Java, you can configure a Dev Container to have all the necessary compilers, libraries, and tools.
- **Testing and Debugging**: You can create isolated environments for testing specific versions of dependencies without affecting your main setup.
- **Cloud-Based Development**: When used in combination with cloud development environments (like GitHub Codespaces), the `devcontainer.json` file allows for a cloud-hosted version of your development environment to be instantly created.

## Example: intro2sd Dev Container for Jekyll

- Repo: [ULL-ESIT-DMSI-2425/intro2sd-casiano-rodriguez-leon-alu0100291865](https://github.com/ULL-ESIT-DMSI-2425/intro2sd-casiano-rodriguez-leon-alu0100291865/tree/main)

- File: [.devcontainer/devcontainer.json](https://github.com/ULL-ESIT-DMSI-2425/intro2sd-casiano-rodriguez-leon-alu0100291865/blob/main/.devcontainer/devcontainer.json)


  ```json 
  {
    "postCreateCommand": "bundle install && npm install && rake serve"
  }
  ```
- Output:
  
  ![images/codespaces-devcontainer.png](/images/codespaces-devcontainer.png)