const { validateLang } = require('../lang');

const formatters = new Map();

function getFormatter(lang) {
  const tag = validateLang(lang);
  if (!formatters.has(tag)) {
    formatters.set(tag, new Intl.DateTimeFormat(tag, { year: 'numeric', month: '2-digit', day: '2-digit' }));
  }
  return formatters.get(tag);
}

function formatDate(date, lang) {
  return getFormatter(lang).format(date);
}

module.exports = { formatDate };
