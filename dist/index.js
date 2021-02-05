/*!
 * name: @jswork/next-slate-plugin
 * description: Slate plugin manager.
 * homepage: https://github.com/afeiship/next-slate-plugin
 * version: 1.0.7
 * date: 2021-02-05 23:45:41
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var NxSlateDefaults = nx.SlateDefaults || require('@jswork/next-slate-defaults');
  var slate = global.slate || require('slate');
  var Element = slate.Element;
  var DEFAULT_SCHEMA = {
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
      active: nx.noop,
      deactive: nx.noop,
      toggle: nx.noop
    },
    events: {
      keydown: nx.noop,
      paste: nx.noop
    },
    render: nx.noop
  };

  var NxSlatePlugin = nx.declare('nx.SlatePlugin', {
    statics: {
      define: function (inSchema) {
        return nxDeepAssign(null, DEFAULT_SCHEMA, inSchema);
      },
      actived: function (inNode, inPlugins) {
        var isElement = Element.isElement(inNode);
        if (isElement)
          return inPlugins.find(function (plugin) {
            return plugin.id === inNode.type;
          });

        // marks
        var results = [];
        nx.forIn(inNode, (mark, value) => {
          if (mark !== 'text' && !!value) {
            results.push(
              inPlugins.find(function (plugin) {
                return plugin.id === mark;
              })
            );
          }
        });
        return results;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlatePlugin;
  }
})();
