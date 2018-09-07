/* eslint-env browser */
const wpRootUrl = process.env.VUE_APP_SITE_URL.replace(/\/$/, '');
const rootPath = process.env.VUE_APP_WP_PROXY_ROUTE.replace(/\/$/, '');
const startWithRootPath = new RegExp(`^/(${rootPath.replace(/^\//, '')}/)?`);

/**
 * Replace URL of the all links on the page
 *
 * @returns {void}
 */
function replaceLinksUrl() {
  Array.from(document.getElementsByTagName('a')).forEach(link => {
    const href = link.getAttribute('href');

    const newURL =
      href.indexOf(wpRootUrl) === 0
        ? href.replace(wpRootUrl, rootPath) || rootPath
        : href.replace(startWithRootPath, `${rootPath}/`);

    if (newURL && newURL !== href) {
      link.setAttribute('href', newURL);
    }
  });
}

window.addEventListener('DOMContentLoaded', replaceLinksUrl, false);
window.addEventListener('popstate', replaceLinksUrl, false);
