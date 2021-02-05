/*!
 * name: @jswork/next-slate-plugin
 * description: Slate plugin manager.
 * homepage: https://github.com/afeiship/next-slate-plugin
 * version: 1.0.0
 * date: 2021-02-05 14:16:18
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var MSG_ERROR_IMPL = 'Must be implemented.';
  var DEFAULT_SCHEMA = {
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
