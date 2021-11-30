const path = require('path');
const markdownIt = require('markdown-it');
const { addNunjucksFilters } = require('./eleventy/nunjucks-filters');
const { addNunjucksShortcodes } = require('./eleventy/nunjucks-shortcodes');

const LAYOUTS = ['base', 'article'];

const source = path.resolve(__dirname, './source');
const input = path.resolve(source, './site');
const output = path.resolve(__dirname, './build');

module.exports = (config) => {
  LAYOUTS.forEach((layout) => {
    config.addLayoutAlias(layout, `layouts/${layout}.njk`);
  });

  config.setLibrary('md', markdownIt({ html: true }));

  config.addPassthroughCopy(`${input}/assets`);

  addNunjucksFilters(config);
  addNunjucksShortcodes(config);

  return {
    dir: {
      input,
      output,
    },
    templateFormats: ['njk', 'md', 'png', 'jpg', 'svg'],
    passthroughFileCopy: true,
  };
};
