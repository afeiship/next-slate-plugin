/*!
 * name: @jswork/next-slate-plugin
 * description: Slate plugin manager.
 * homepage: https://github.com/afeiship/next-slate-plugin
 * version: 1.0.15
 * date: 2021-02-18 10:25:35
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var nxBind = nx.bind || require('@jswork/next-bind');
  var NxSlateDefaults = nx.SlateDefaults || require('@jswork/next-slate-defaults');
  var slate = global.slate || require('slate');
  var isHotkey = global.isHotkey || require('is-hotkey').default;
  var Element = slate.Element;
  var Editor = slate.Editor;
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
      output: NxSlateDefaults.output
    },
    statics: {},
    commands: {
      is: function (inEditor) {
        var id = this.id;
        var marks = Editor.marks(inEditor);
        var res = marks ? marks[id] : false;
        return Boolean(res);
      },
      isHotkey: function (inEvent) {
        var hotkey = this.hotkey;
        if (!hotkey) return false;
        return isHotkey(hotkey, inEvent);
      },
      activate: function (inEditor, inValue) {
        var id = this.id;
        Editor.addMark(inEditor, id, inValue);
      },
      deactivate: function (inEditor) {
        var id = this.id;
        Editor.removeMark(inEditor, id);
      },
      toggle: function (inEditor, inValue) {
        var cmd = this.commands;
        if (!cmd.is(inEditor)) {
          cmd.activate(inEditor, inValue);
        } else {
          cmd.deactivate(inEditor);
        }
      }
    },
    events: {
      keydown: function (inSender, inEvent) {
        var editor = inSender.editor;
        var cmd = this.commands;
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
        var schema = nxDeepAssign(null, DEFAULT_SCHEMA, inSchema);
        return nxBind(schema, schema.serialize, schema.commands, schema.events, schema.statics);
      },
      actived: function (inNode, inPlugins) {
        var isElement = Element.isElement(inNode);
        if (isElement)
          return inPlugins.find(function (plugin) {
            return plugin.id === inNode.type;
          });

        // marks
        var results = [];
        nx.forIn(inNode, function (mark, value) {
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
