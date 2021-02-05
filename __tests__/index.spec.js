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
      expect(p1.serialize.input === NxSlateDefaults.importer).toBe(true);
      expect(p1.render === nx.noop).toBe(true);
    });
  });
})();
