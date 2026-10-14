const markdownIt = require('markdown-it');
const embedTwitter = require('eleventy-plugin-embed-twitter');
const { feedPlugin } = require('@11ty/eleventy-plugin-rss');
const { addNunjucksFilters } = require('./eleventy/nunjucks-filters');
const { addNunjucksShortcodes } = require('./eleventy/nunjucks-shortcodes');
const { addLiquidTags } = require('./eleventy/liquid-tags');
const { DEFAULT_LANG } = require('./eleventy/lang');

const LAYOUTS = ['base', 'article', 'poem'];

const input = 'source/site';
const output = 'build';
const siteUrl = 'https://iamkulykov.com';

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
  config.addGlobalData('siteUrl', siteUrl);

  config.addPlugin(feedPlugin, {
    type: 'rss',
    outputPath: '/feed.xml',
    collection: {
      name: 'blog',
      limit: 20,
    },
    metadata: {
      language: DEFAULT_LANG,
      title: 'Serhii Kulykov',
      subtitle: 'Serhii Kulykov writes about web components, accessibility and design systems.',
      base: `${siteUrl}/`,
      author: {
        name: 'Serhii Kulykov',
      },
    },
  });

  config.addFilter('sortByYear', sortByYear);

  config.setLibrary('md', markdownIt({ html: true }));

  config.addPassthroughCopy(`${input}/assets`);

  addNunjucksFilters(config);
  addNunjucksShortcodes(config);
  addLiquidTags(config);

  return {
    dir: {
      input,
      output,
    },
    templateFormats: ['njk', 'md', 'png', 'jpg', 'svg'],
    passthroughFileCopy: true,
  };
};
