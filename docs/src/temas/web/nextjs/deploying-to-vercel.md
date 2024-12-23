## Introduction

These are my notes in my experience when reading and reproducing the following articles:

- [Deploying to Vercel from an organization for free using GitHub actions](https://gist.github.com/ky28059/1c9af929a9030105da8cf00006b50484#the-solution)
- [Nextjs CI/CD on Vercel with Github actions](https://dev.to/chuddyjoachim/nextjs-ci-cd-on-vercel-with-github-actions-7g7)
- Here is the GitHub Action repo: [amondnet/vercel-action](https://github.com/amondnet/vercel-action)

## repo, branches and tree 

```
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) git remote -v 
origin  https://github.com/ULL-MII-SYTWS-2425/nextra-casiano-rodriguez-leon-alu0100291865.git (fetch)
upstream        https://github.com/ULL-MII-SYTWS-2425/ull-mii-sytws-2425-nextra-nextra-docs-template.git (fetch)
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) git -P branch -a
  allrepos
  auth
  auth2024
  dmsi20241028
* guide
  loading-message
  main
  middleware
  remotes/origin/HEAD -> origin/main
  remotes/origin/allrepos
  remotes/origin/auth
  remotes/origin/guide
  remotes/origin/main
  remotes/upstream/main
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) tree -I screeenshot.png .github
.github
└── workflows
    └── deploy.yml
```

## Vercel cli

```
➜  docs git:(main) vercel --version
Vercel CLI 39.1.3
39.1.3
```

## .github/workflows/deploy.yml 

```yaml
➜  nextra-casiano-rodriguez-leon-alu0100291865 git:(guide) cat .github/workflows/deploy.yml 
# vercel-merge.yml
name: Deploy to vercel on merge
on:
  push:
    branches:
      - guide
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

## Secrets

![/images/nextjs/vercel-action-secrets.png](/images/nextjs/vercel-action-secrets.png)

## The workflow running in GitHub 

![/images/nextjs/vercel-action-github.png](/images/nextjs/vercel-action-github.png)

## Errors and Fixing them

The building finishes, but after it, there is a warning followed by an error:

```
Warning: The `set-output` command is deprecated and will be disabled soon. 
Please upgrade to using Environment Files. 
For more information see: 
https://github.blog/changelog2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
this is push event
find comment
previous comment not found
Error: Resource not accessible by integration
```

See the following issues at the action repo:

- [issue set-output command warning #217](https://github.com/amondnet/vercel-action/issues/217) a
- [issue Resource not accessible by integration #235](https://github.com/amondnet/vercel-action/issues/235)

![/images/nextjs/vercel-action-error.png](/images/nextjs/vercel-action-error.png)

You need to grant both read and write permissions for the workflows in the repository and the organisation, if the repo is part of one.
See this topic: <https://github.com/orgs/community/discussions/21061>

![/images/nextjs/vercel-action-workflow-permissions.png](/images/nextjs/vercel-action-workflow-permissions.png)

The change must be done by an owner of the organization:

![/images/nextjs/vercel-action-changing-workflow-permissions.png](/images/nextjs/vercel-action-changing-workflow-permissions.png)

Once it is done, the action runs successfully:

![/images/nextjs/vercel-action-working.png](/images/nextjs/vercel-action-working.png)