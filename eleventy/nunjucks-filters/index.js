const { groupByYear } = require('./group-by-year');
const { dateToIsoString } = require('./date-to-iso-string');

function addNunjucksFilters(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('groupByYear', groupByYear);
  eleventyConfig.addNunjucksFilter('dateToIsoString', dateToIsoString);
}

module.exports = { addNunjucksFilters };
