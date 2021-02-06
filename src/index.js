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
    commands: null,
    events: null,
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
