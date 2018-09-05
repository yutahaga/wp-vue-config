/* eslint-env browser */
const startWithSlashRegexp = /^\//;
const wpRootUrl = process.env.VUE_APP_SITE_URL.replace(/\/$/, '');
const rootPath = process.env.VUE_APP_WP_PROXY_ROUTE.replace(/\/$/, '');

/**
 * Replace URL of the all links on the page
 *
 * @returns {void}
 */
function replaceLinksUrl() {
  Array.from(document.getElementsByTagName('a')).forEach(link => {
    const href = link.getAttribute('href');

    if (href.indexOf(wpRootUrl) === 0) {
      link.setAttribute('href', href.replace(wpRootUrl, rootPath) || rootPath);
    } else if (startWithSlashRegexp.test(href)) {
      link.setAttribute(
        'href',
        href.replace(startWithSlashRegexp, `${rootPath}/`)
      );
    }
  });
}

window.addEventListener('DOMContentLoaded', replaceLinksUrl, false);
window.addEventListener('popstate', replaceLinksUrl, false);
