---
prev: /temas/web/nextra/first-steps
next: /temas/web/nextra/theme-configuration
---

# MDX: Markdown for the component era  <img alt="MDX" src="https://mdx-logo.now.sh" width="60" />

[MDX][website] is an authorable format that lets you seamlessly write JSX in
your markdown documents.
You can import components, such as interactive charts or alerts, and embed them
within your content.
This makes writing long-form content with components a blast.
🚀

```jsx
import {Chart} from './snowfall.js'
export const year = 2013

# Last year’s snowfall

In {year}, the snowfall was above average.
It was followed by a warm spring which caused
flood conditions in many of the nearby rivers.

<Chart year={year} color="#fcb32c" />
```

See section [Snowfall component example](https://ull-pl.vercel.app/nextra-playground/using-components#snowfall-component-example) in the teacher's PL notes.  [Source code](https://github.com/crguezl/pl-nextra/blob/main/pages/nextra-playground/using-components.mdx)

See [§ What is MDX](https://mdxjs.com/docs/what-is-mdx/) for more info on the
format.
See [§ Playground](https://mdxjs.com/playground/) to try it out.


[build-badge]: https://github.com/mdx-js/mdx/workflows/main/badge.svg

[build]: https://github.com/mdx-js/mdx/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/mdx-js/mdx/main.svg

[coverage]: https://codecov.io/github/mdx-js/mdx

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/mdx-js/mdx/discussions

[security]: https://mdxjs.com/getting-started/#security

[contribute]: https://mdxjs.com/community/contribute/

[support]: https://mdxjs.com/community/support/

[sponsor]: https://mdxjs.com/community/sponsor/

[coc]: https://github.com/mdx-js/.github/blob/main/code-of-conduct.md

[website]: https://mdxjs.com

[mit]: license

[vercel]: https://vercel.com