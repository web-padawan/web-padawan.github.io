const { codepen } = require('./codepen');

function addLiquidTags(eleventyConfig) {
  eleventyConfig.addLiquidTag('codepen', codepen);
}

module.exports = { addLiquidTags };
