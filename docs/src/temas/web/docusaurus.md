---
title: Docusaurus
---

# {{ $frontmatter.title }}

## Creating a web site

```
➜  docusaurus-learning npx create-docusaurus@latest --help
Usage: create-docusaurus [options] [siteName] [template] [rootDir]

Initialize website.

Options:
  -V, --version                    output the version number
  -p, --package-manager <manager>  The package manager used to install dependencies. One of yarn, npm, and pnpm.
  -s, --skip-install               Do not run package manager immediately after scaffolding
  -t, --typescript                 Use the TypeScript template variant
  -g, --git-strategy <strategy>    Only used if the template is a git repository.
                                   `deep`: preserve full history
                                   `shallow`: clone with --depth=1
                                   `copy`: do a shallow clone, but do not create a git repo
                                   `custom`: enter your custom git clone command. We will prompt you for it.
  -h, --help                       display help for command
➜  docusaurus-learning npx create-docusaurus@latest -V
2.2.0
```

The template argument can be one of the following:

1. `classic`: Uses the `classic` template (recommended)
2. `facebook`: Uses the `Facebook/Meta` template, which contains some Meta-specific setup
3. A git repo URL (beginning with https:// or git@), which can be cloned to the destination
4. A local file path relative to CWD, which contains the files to be copied to destination

The `rootDir` will be used to resolve the absolute path to the site directory. The default is `CWD`.

So we will install our first socusaurus website with the command:

```
➜  docusaurus-learning npx create-docusaurus@latest -p npm my-website classic
[INFO] Creating new Docusaurus project...
[INFO] Installing dependencies with npm...
21 vulnerabilities (4 moderate, 17 high)
[SUCCESS] Created my-website.
```
That creates the following hierarchy:

```
➜  my-website git:(main) tree -I node_modules 
.
├── README.md
├── babel.config.js
├── blog
│   ├── 2019-05-28-first-blog-post.md
│   ├── 2019-05-29-long-blog-post.md
│   ├── 2021-08-01-mdx-blog-post.mdx
│   ├── 2021-08-26-welcome
│   │   ├── docusaurus-plushie-banner.jpeg
│   │   └── index.md
│   └── authors.yml
├── docs
│   ├── intro.md
│   ├── tutorial-basics
│   │   ├── _category_.json
│   │   ├── congratulations.md
│   │   ├── create-a-blog-post.md
│   │   ├── create-a-document.md
│   │   ├── create-a-page.md
│   │   ├── deploy-your-site.md
│   │   └── markdown-features.mdx
│   └── tutorial-extras
│       ├── _category_.json
│       ├── img
│       │   ├── docsVersionDropdown.png
│       │   └── localeDropdown.png
│       ├── manage-docs-versions.md
│       └── translate-your-site.md
├── docusaurus.config.js
├── package-lock.json
├── package.json
├── sidebars.js
├── src
│   ├── components
│   │   └── HomepageFeatures
│   │       ├── index.js
│   │       └── styles.module.css
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── index.js
│       ├── index.module.css
│       └── markdown-page.md
└── static
    └── img
        ├── docusaurus.png
        ├── favicon.ico
        ├── logo.svg
        ├── undraw_docusaurus_mountain.svg
        ├── undraw_docusaurus_react.svg
        └── undraw_docusaurus_tree.svg

13 directories, 37 files
```

## References

* [Awesome Resources](https://docusaurus.io/community/resources)


