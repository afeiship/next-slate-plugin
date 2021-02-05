(function () {
  const NxSlatePlugin = require('../src');
  const NxSlateDefaults = nx.SlateDefaults || require('@jswork/next-slate-defaults');

  describe('NxSlatePlugin.methods', function () {
    test('schema define support deep merge', function () {
      const p1 = NxSlatePlugin.define({
        id: 'bold',
        type: 'format',
        serialize: {
          output: (node, children) => {
            return `<strong>${children}</strong>`;
          }
        }
      });
      const deepString = p1.serialize.output.toString();
      expect(p1.type).toBe('format');
      expect(deepString.includes('<strong>${children}</strong>')).toBe(true);
      expect(p1.serialize.input === nx.noop).toBe(true);
      expect(p1.render === nx.noop).toBe(true);
    });

    test('api actived - element should get single', function () {
      const node = {
        type: 'paragraph',
        children: [{ text: 'hello world' }]
      };
      const plugins = [{ id: 'paragraph' }, { id: 'bold' }];
      const actived = NxSlatePlugin.actived(node, plugins);
      expect(actived).toEqual({ id: 'paragraph' });
    });


    test('api actived - leaf should get array list', function () {
      const node = {
        text: 'i am a bold text',
        bold: true,
        italic: true
      };
      const plugins = [{ id: 'paragraph' }, { id: 'bold' }, { id: 'italic' }, { id: 'blockquote'}];
      const actived = NxSlatePlugin.actived(node, plugins);
      expect(actived).toEqual([
        { id: 'bold' },
        { id: 'italic' },
      ]);
    });
  });
})();
