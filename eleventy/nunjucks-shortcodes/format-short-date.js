const { validateLang } = require('../lang');

const formatters = new Map();

function getFormatter(lang) {
  const tag = validateLang(lang);
  if (!formatters.has(tag)) {
    formatters.set(tag, new Intl.DateTimeFormat(tag, { month: '2-digit', day: '2-digit' }));
  }
  return formatters.get(tag);
}

function formatShortDate(date, lang) {
  return getFormatter(lang).format(date);
}

module.exports = { formatShortDate };
