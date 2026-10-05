const markdownIt = require('markdown-it');
const embedTwitter = require('eleventy-plugin-embed-twitter');
const { addNunjucksFilters } = require('./eleventy/nunjucks-filters');
const { addNunjucksShortcodes } = require('./eleventy/nunjucks-shortcodes');
const { DEFAULT_LANG } = require('./eleventy/lang');

const LAYOUTS = ['base', 'article', 'poem'];

const input = 'source/site';
const output = 'build';

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

  config.addGlobalData('lang', DEFAULT_LANG);
  config.addGlobalData('siteUrl', 'https://iamkulykov.com');

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
