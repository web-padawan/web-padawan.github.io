const { groupByYear } = require('./group-by-year');
const { dateToIsoString } = require('./date-to-iso-string');
const { validateLang } = require('../lang');

function addNunjucksFilters(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('groupByYear', groupByYear);
  eleventyConfig.addNunjucksFilter('dateToIsoString', dateToIsoString);
  eleventyConfig.addNunjucksFilter('htmlLang', validateLang);
}

module.exports = { addNunjucksFilters };
