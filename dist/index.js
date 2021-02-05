/*!
 * name: @jswork/next-slate-plugin
 * description: Slate plugin manager.
 * homepage: https://github.com/afeiship/next-slate-plugin
 * version: 1.0.1
 * date: 2021-02-05 15:37:11
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var NxSlateDefaults = nx.SlateDefaults || require('@jswork/next-slate-defaults');

  var MSG_ERROR_IMPL = 'Must be implemented.';
  var DEFAULT_SCHEMA = {
    id: null,
    type: 'block',
    meta: {
      title: null,
      description: null
    },
    decorator: {
      instance: nx.stubValue,
      classify: nx.stubValue
    },
    serialize: {
      input: NxSlateDefaults.importer,
      output: NxSlateDefaults.exporter
    },
    command: {
      is: nx.noop,
      active: nx.noop,
      deactive: nx.noop,
      toggle: nx.noop
    },
    event: {
      keydown: nx.noop,
      paste: nx.noop
    },
    render: nx.noop
  };

  var NxSlatePlugin = nx.declare('nx.SlatePlugin', {
    statics: {
      define: function (inSchema) {
        return nxDeepAssign(null, DEFAULT_SCHEMA, inSchema);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlatePlugin;
  }
})();
