# Rendering Markdown in Next.js

See the examples in the repo <https://github.com/ULL-MII-SYTWS/hello-remark>

## Remark Syntax tree

The syntax tree format used in remark is mdast[^mdast].

It represents markdown constructs as JSON objects.
**In**:

```markdown
## Hello *Pluto*!
```

**Out**:

```js
{
  type: 'heading',
  depth: 2,
  children: [
    {type: 'text', value: 'Hello '},
    {type: 'emphasis', children: [{type: 'text', value: 'Pluto'}]}
    {type: 'text', value: '!'}
  ]
}
```

## mdast

[mdast](https://github.com/syntax-tree/mdast) is a specification for representing markdown in a syntax
tree. 
It implements [unist](https://github.com/syntax-tree/unist).

It can represent several flavours of markdown, such as CommonMark
and GitHub Flavored Markdown.

## Unist

[unist](https://github.com/syntax-tree/unist) 
is a specification for syntax trees. It has a big ecosystem of utilities in JavaScript for working with these trees. It’s implemented by several other specifications.

unist relates to the unified, remark, rehype, and retext projects in that unist syntax trees are used throughout their ecosystems.

## Unified

The [unified](https://github.com/unifiedjs/unified) ecosystem is a collection of tools for inspecting, transforming, and serializing content through syntax trees.

`unified` is an interface for processing content with syntax trees.

Syntax trees are a representation of content understandable to programs.
Those programs, called *plugins[^plugin]*, take these trees and inspect and
modify them.

This is the *process[^process]* of a *processor*.

```ascii
| ........................ process ........................... |
| .......... parse ... | ... run ... | ... stringify ..........|

          +--------+                     +----------+
Input ->- | Parser | ->- Syntax Tree ->- | Compiler | ->- Output
          +--------+          |          +----------+
                              X
                              |
                       +--------------+
                       | Transformers |
                       +--------------+
```


See repo [unifiedjs/unified](https://github.com/unifiedjs/unified) for more information.

## micromark parser and mdast-util-from-markdown

[mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown) is a utility to turn markdown into mdast syntax trees. If you want to handle syntax trees manually, use this. 

It is based on [micromark](https://github.com/micromark/micromark). Use micromark when you want to turn markdown into HTML. [micromark](https://github.com/micromark/micromark) contains a compliant markdown parser with positional info and concrete tokens.

![/images/mdast-util-from-markdown-micromark.png](/images/mdast-util-from-markdown-micromark.png)

Micromark uses a [state machine](https://github.com/micromark/common-markup-state-machine) to parse the entirety of markdown into concrete
tokens. Its API compiles to HTML, but its parts are made to be used separately, so as to
generate syntax trees or compile
to other output formats.

## Example of a remark plugin

![Create a remark Plugin to Modify Markdown Headings](https://egghead.io/lessons/javascript-create-a-remark-plugin-to-modify-markdown-headings)

We'll use unist-util-visit to traverse heading nodes in a Markdown file and prefix all h1s with the text "BREAKING" using a TDD workflow.

## Footnotes

[^mdast]: See <https://github.com/syntax-tree/mdast> for more information.

<!-- Definitions -->

[^logo]: See <https://raw.githubusercontent.com/unifiedjs/unified/93862e5/logo.svg?sanitize=true>

[^build-badge]: See <https://github.com/unifiedjs/unified/workflows/main/badge.svg>

[^build]: See <https://github.com/unifiedjs/unified/actions>

[^coverage-badge]: See <https://img.shields.io/codecov/c/github/unifiedjs/unified.svg>

[^coverage]: See <https://codecov.io/github/unifiedjs/unified>

[^downloads-badge]: See <https://img.shields.io/npm/dm/unified.svg>

[^downloads]: See <https://www.npmjs.com/package/unified>

[^size-badge]: See <https://img.shields.io/bundlephobia/minzip/unified.svg>

[^size]: See <https://bundlephobia.com/result?p=unified>

[^sponsors-badge]: See <https://opencollective.com/unified/sponsors/badge.svg>

[^backers-badge]: See <https://opencollective.com/unified/backers/badge.svg>

[^collective]: See <https://opencollective.com/unified>

[^chat-badge]: See <https://img.shields.io/badge/chat-discussions-success.svg>

[^chat]: See <https://github.com/unifiedjs/unified/discussions>

[^esm]: See <https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c>

[^esmsh]: See <https://esm.sh>

[^typescript]: See <https://www.typescriptlang.org>

[^health]: See <https://github.com/unifiedjs/.github>

[^contributing]: See <https://github.com/unifiedjs/.github/blob/main/contributing.md>

[^support]: See <https://github.com/unifiedjs/.github/blob/main/support.md>

[^coc]: See <https://github.com/unifiedjs/.github/blob/main/code-of-conduct.md>

[^security]: See <https://github.com/unifiedjs/.github/blob/main/security.md>

[^license]: license

[^author]: See <https://wooorm.com>

[^npm]: See <https://docs.npmjs.com/cli/install>

[^site]: See <https://unifiedjs.com>

[^twitter]: See <https://twitter.com/unifiedjs>

[^rehype]: See <https://github.com/rehypejs/rehype>

[^remark]: See <https://github.com/remarkjs/remark>

[^retext]: See <https://github.com/retextjs/retext>

[^syntax-tree]: See <https://github.com/syntax-tree>

[^esast]: See <https://github.com/syntax-tree/esast>

[^hast]: See <https://github.com/syntax-tree/hast>

[^mdast]: See <https://github.com/syntax-tree/mdast>

[^nlcst]: See <https://github.com/syntax-tree/nlcst>

[^xast]: See <https://github.com/syntax-tree/xast>

[^unist]: See <https://github.com/syntax-tree/unist>

[^unified-engine]: See <https://github.com/unifiedjs/unified-engine>

[^unified-args]: See <https://github.com/unifiedjs/unified-args>

[^unified-engine-gulp]: See <https://github.com/unifiedjs/unified-engine-gulp>

[^unified-language-server]: See <https://github.com/unifiedjs/unified-language-server>

[^unified-stream]: See <https://github.com/unifiedjs/unified-stream>

[^remark-rehype]: See <https://github.com/remarkjs/remark-rehype>

[^remark-retext]: See <https://github.com/remarkjs/remark-retext>

[^rehype-retext]: See <https://github.com/rehypejs/rehype-retext>

[^rehype-remark]: See <https://github.com/rehypejs/rehype-remark>

[^node]: See <https://github.com/syntax-tree/unist#node>

[^vfile]: See <https://github.com/vfile/vfile>

[^vfile-value]: See <https://github.com/vfile/vfile#vfilevalue>

[^vfile-utilities]: See <https://github.com/vfile/vfile#list-of-utilities>

[^overview]: See <https://github.com/unifiedjs/#overview>

[^file]: See <https://github.com/unifiedjs/#file>

[^api]: See <https://github.com/unifiedjs/#api>

[^process]: See <https://github.com/unifiedjs/#processorprocessfile-done>

[^process-sync]: #processorprocesssyncfile

[^parse]: See <https://github.com/unifiedjs/unified#processorparsefile>

[^parser]: See <https://github.com/unifiedjs/unified#processorparser>

[^stringify]: #processorstringifytree-file

[^run]: See <https://github.com/unifiedjs/#processorruntree-file-done>

[^run-sync]: See <https://github.com/unifiedjs/#processorrunsynctree-file>

[^compiler]: See <https://github.com/unifiedjs/#processorcompiler>

[^data]: See <https://github.com/unifiedjs/#processordatakey-value>

[^attacher]: See <https://github.com/unifiedjs/#function-attacheroptions>

[^transformer]: See <https://github.com/unifiedjs/#function-transformertree-file-next>

[^next]: See <https://github.com/unifiedjs/#function-nexterr-tree-file>

[^freeze]: See <https://github.com/unifiedjs/#processorfreeze>

[^plugin]: See <https://github.com/unifiedjs/#plugin>

[^run-done]: See <https://github.com/unifiedjs/#function-doneerr-tree-file>

[^process-done]: #function-doneerr-file

[^contribute]: #contribute

[^sponsor]: See <https://github.com/unifiedjs/#sponsor>

[^rehype-react]: See <https://github.com/rehypejs/rehype-react>

[^trough]: See <https://github.com/wooorm/trough#function-fninput-next>

[^promise]: See <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise>

[^remark-plugins]: See <https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins>

[^rehype-plugins]: See <https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins>

[^retext-plugins]: See <https://github.com/retextjs/retext/blob/main/doc/plugins.md#list-of-plugins>

[^awesome-remark]: See <https://github.com/remarkjs/awesome-remark>

[^awesome-rehype]: See <https://github.com/rehypejs/awesome-rehype>

[^awesome-retext]: See <https://github.com/retextjs/awesome-retext>

[^topic-remark-plugin]: See <https://github.com/topics/remark-plugin>

[^topic-rehype-plugin]: See <https://github.com/topics/rehype-plugin>

[^topic-retext-plugin]: See <https://github.com/topics/retext-plugin>

[^types-hast]: See <https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/hast>

[^types-mdast]: See <https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mdast>

[^types-nlcst]: See <https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nlcst>

[^preliminary]: See <https://github.com/retextjs/retext/commit/8fcb1f#diff-168726dbe96b3ce427e7fedce31bb0bc>

[^externalised]: See <https://github.com/remarkjs/remark/commit/9892ec#diff-168726dbe96b3ce427e7fedce31bb0bc>

[^published]: See <https://github.com/unifiedjs/unified/commit/2ba1cf>

[^ware]: See <https://github.com/segmentio/ware>
