# next-slate-plugin
> Slate plugin manager.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-slate-plugin
```

## apis
| api    | params | description      |
| ------ | ------ | ---------------- |
| define | schema | Define a plugin. |

## usage
```js
import NxSlatePlugin from '@jswork/next-slate-plugin';

const Bold = NxSlatePlugin.define({
  id: 'bold',
  type: 'format',
  serialize: {
    output: (node, children) => {
      return `<strong>${children}</strong>`;
    }
  }
});
```

## full schema
```js
{
  id: null,
  type: 'block',
  meta: {
    title: null,
    description: null
  },
  decorator: {
    instance: function (inEditor) {
      return inEditor;
    },
    classify: function (inEditor) {
      return inEditor;
    }
  },
  serialize: {
    input: function (inNode, inChildren) {
      nx.error(MSG_ERROR_IMPL);
    },
    output: function (inNode, inChildren) {
      nx.error(MSG_ERROR_IMPL);
    }
  },
  command: {
    is: function () {
      return true;
    },
    active: function () {},
    deactive: function () {},
    toggle: function () {}
  },
  event: {
    keydown: function (inEvent) {},
    paste: function (inEvent) {}
  },
  render: function (inContext, inProps) {
    nx.error(MSG_ERROR_IMPL);
  }
}
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-slate-plugin/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-slate-plugin
[version-url]: https://npmjs.org/package/@jswork/next-slate-plugin

[license-image]: https://img.shields.io/npm/l/@jswork/next-slate-plugin
[license-url]: https://github.com/afeiship/next-slate-plugin/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-slate-plugin
[size-url]: https://github.com/afeiship/next-slate-plugin/blob/master/dist/next-slate-plugin.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-slate-plugin
[download-url]: https://www.npmjs.com/package/@jswork/next-slate-plugin
