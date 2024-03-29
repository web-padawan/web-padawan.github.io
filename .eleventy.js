const path = require('path');
const markdownIt = require('markdown-it');
const embedTwitter = require('eleventy-plugin-embed-twitter');
const { addNunjucksFilters } = require('./eleventy/nunjucks-filters');
const { addNunjucksShortcodes } = require('./eleventy/nunjucks-shortcodes');

const LAYOUTS = ['base', 'article', 'poem'];

const source = path.resolve(__dirname, './source');
const input = path.resolve(source, './site');
const output = path.resolve(__dirname, './build');

function sortByYear(values) {
  return [...values].sort((a, b) => Math.sign(b.data.year - a.data.year));
}

module.exports = (config) => {
  LAYOUTS.forEach((layout) => {
    config.addLayoutAlias(layout, `layouts/${layout}.njk`);
  });

  config.addPlugin(embedTwitter, {
    cacheText: true,
    twitterScript: {
      enabled: false,
    },
  });

  config.addFilter('sortByYear', sortByYear);

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
