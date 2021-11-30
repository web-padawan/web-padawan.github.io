const { formatDate } = require('./format-date');
const { formatShortDate } = require('./format-short-date');

function addNunjucksShortcodes(eleventyConfig) {
  eleventyConfig.addNunjucksShortcode('formatDate', formatDate);
  eleventyConfig.addNunjucksShortcode('formatShortDate', formatShortDate);
}

module.exports = { addNunjucksShortcodes };
