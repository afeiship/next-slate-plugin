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
| api     | params       | description                         |
| ------- | ------------ | ----------------------------------- |
| define  | schema       | Define a plugin.                    |
| actived | node,plugins | Get actived plugin(s) from plugins. |

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

const node = {
  text: 'i am a bold text',
  bold: true,
  italic: true
};
const plugins = [{ id: 'paragraph' }, { id: 'bold' }, { id: 'italic' }, { id: 'blockquote'}];
const actived = NxSlatePlugin.actived(node, plugins);

/*
[
  { id: 'bold' },
  { id: 'italic' },
];
*/
```

## full schema
```js
{
  id: null,
  meta: {
    title: null,
    description: null
  },
  hotkey: null,
  decorator: nx.stubValue,
  serialize: {
    input: nx.noop,
    output: NxSlateDefaults.exporter
  },
  statics: {},
  commands: {
    is: nx.noop,
    isHotkey: nx.noop,
    activate: nx.noop,
    deactivate: nx.noop,
    toggle: nx.noop
  },
  events: {
    keydown: nx.noop,
    paste: nx.noop
  },
  render: nx.noop
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
