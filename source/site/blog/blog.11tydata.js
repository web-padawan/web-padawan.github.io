const isBuild = process.env.ELEVENTY_RUN_MODE === 'build';

function isHiddenDraft(data) {
  return isBuild && data.draft === true;
}

module.exports = {
  layout: 'article',
  tags: ['blog'],
  lang: 'en',
  eleventyComputed: {
    permalink: (data) => (isHiddenDraft(data) ? false : data.permalink),
    eleventyExcludeFromCollections: (data) => isHiddenDraft(data) || data.eleventyExcludeFromCollections,
  },
};
