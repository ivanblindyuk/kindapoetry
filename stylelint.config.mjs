/** @type {import('stylelint').Config} */
export default {
  rules: {
    // Every colour goes through a theme variable (docs/design.md, "Theme").
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': [
      'rgb',
      'rgba',
      'hsl',
      'hsla',
      'hwb',
      'lab',
      'lch',
      'oklab',
      'oklch',
      'color',
      'color-mix',
    ],
    // Nothing on the site moves (docs/design.md, "Motion").
    'property-disallowed-list': ['/^transition/', '/^animation/'],
    'at-rule-disallowed-list': ['keyframes'],
  },
  overrides: [
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
    {
      // The theme file is the one place a colour literal may appear.
      files: ['src/styles/theme.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
      },
    },
  ],
};
