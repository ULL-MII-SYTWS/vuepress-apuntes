---
sidebar: auto
title: pnpm Workspace
---

# {{ $frontmatter.title }}

pnpm has built-in support for monorepositories (AKA multi-package repositories,
multi-project repositories, or monolithic repositories). You can create a
workspace to unite multiple projects inside a single repository.

A workspace must have a [`pnpm-workspace.yaml`] file in its
root. A workspace also may have an [`.npmrc`] in its root.

[`pnpm-workspace.yaml`]: https://github.com/gh-cli-for-education/nextra/blob/casiano/pnpm-workspace.yaml
[`.npmrc`]: https://github.com/gh-cli-for-education/nextra/blob/casiano/.npmrc

[Bit]: https://bit.dev/?utm_source=pnpm&utm_medium=workspace_page
[Painless Monorepo Dependency Management with Bit]: https://bit.cloud/blog/painless-monorepo-dependency-management-with-bit-l4f9fzyw?utm_source=pnpm&utm_medium=workspace_page


### Publishing workspace packages

When a workspace package is packed into an archive (whether it's through
`pnpm pack` or one of the publish commands like `pnpm publish`), they dynamically
replace any `workspace:` dependency by:

* The corresponding version in the target workspace (if you use `workspace:*`, `workspace:~`, or `workspace:^`)
* The associated semver range (for any other range type)

So for example, if we have `foo`, `bar`, `qar`, `zoo` in the workspace and they all are at version `1.5.0`, the following:

```json
{
	"dependencies": {
		"foo": "workspace:*",
		"bar": "workspace:~",
		"qar": "workspace:^",
		"zoo": "workspace:^1.5.0"
	}
}
```

Will be transformed into:

```json
{
	"dependencies": {
		"foo": "1.5.0",
		"bar": "~1.5.0",
		"qar": "^1.5.0",
		"zoo": "^1.5.0"
	}
}
```

This feature allows you to depend on your local workspace packages while still
being able to publish the resulting packages to the remote registry without
needing intermediary publish steps - your consumers will be able to use your
published workspaces as any other package, still benefitting from the guarantees
semver offers.

In the case of the Nextra monorepo, we have examples of this in several  `package.json` files. Among them:

- [packages/nextra-theme-docs/package.json](https://github.com/gh-cli-for-education/nextra/blob/casiano/packages/nextra-theme-docs/package.json#L34-L56)
- [/examples/docs/package.json](https://github.com/gh-cli-for-education/nextra/blob/casiano/examples/docs/package.json#L13-L14)