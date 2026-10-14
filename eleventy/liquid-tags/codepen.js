// Accepts the dev.to syntax: {% codepen <url> [default-tab=<tabs>] %}
function codepen() {
  return {
    parse(tagToken) {
      const [url, ...options] = tagToken.args.trim().split(/\s+/);
      const tabOption = options.find((option) => option.startsWith('default-tab='));
      this.url = url;
      this.defaultTab = tabOption ? tabOption.split('=')[1] : 'result';
    },
    render() {
      const embed = this.url.replace('/pen/', '/embed/');
      return `<iframe class="codepen" title="CodePen demo" src="${embed}?default-tab=${this.defaultTab}" loading="lazy"></iframe>
<p><a href="${this.url}">Open the demo on CodePen</a></p>`;
    },
  };
}

module.exports = { codepen };
