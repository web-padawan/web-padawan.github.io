const DEFAULT_LANG = 'en';

const LANGS = ['en', 'ru', 'uk'];

function validateLang(lang = DEFAULT_LANG) {
  if (!LANGS.includes(lang)) {
    throw new Error(`Unsupported lang "${lang}", expected one of: ${LANGS.join(', ')}`);
  }
  return lang;
}

module.exports = { DEFAULT_LANG, validateLang };
