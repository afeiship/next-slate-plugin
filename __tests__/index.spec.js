(function () {
  const NxSlatePlugin = require('../src');

  describe('NxSlatePlugin.methods', function () {
    test('schema define support deep merge', function () {
      const p1 = NxSlatePlugin.define({
        id: 'bold',
        type: 'format',
        serialize: {
          input: (node, children) => {
            return `<strong>${children}</strong>`;
          }
        }
      });
      const deepString = p1.serialize.input.toString();
      expect(p1.type).toBe('format');
      expect(deepString.includes('<strong>${children}</strong>')).toBe(true);
    });
  });
})();
