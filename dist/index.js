/*!
 * name: @jswork/next-slate-plugin
 * description: Slate plugin manager.
 * homepage: https://github.com/afeiship/next-slate-plugin
 * version: 1.0.10
 * date: 2021-02-07 09:21:10
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
      is: function (inEditor) {
        var marks = Editor.marks(inEditor);
        var res = marks ? marks[id] : false;
        return Boolean(res);
      },
      isHotkey: function (inEvent) {
        if (!hotkey) return false;
        return isHotkey(hotkey, inEvent);
      },
      activate: (inEditor, inValue) => {
        Editor.addMark(inEditor, id, inValue);
      },
      deactivate: function (inEditor) {
        Editor.removeMark(inEditor, id);
      },
      toggle: function (inEditor, inValue) {
        var cmd = plugin.commands;
        if (!cmd.is()) {
          cmd.activate(inEditor, inValue);
        } else {
          cmd.deactivate(inEditor);
        }
      }
    },
    events: {
      keydown: function (inSender, inEvent) {
        var editor = inSender.editor;
        var cmd = plugin.commands;
        if (cmd.isHotkey(inEvent)) {
          inEvent.preventDefault();
          cmd.toggle(editor, true);
        }
      }
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
            var plugin = inPlugins.find(function (plugin) {
              return plugin.id === mark;
            });
            plugin && results.push(plugin);
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
