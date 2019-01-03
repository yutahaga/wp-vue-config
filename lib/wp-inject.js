/* eslint-env browser */
const wpRootUrl = process.env.VUE_APP_SITE_URL.replace(/\/$/, '');
const rootPath = process.env.VUE_APP_WP_PROXY_ROUTE.replace(/\/$/, '');
const startWithRootPath = new RegExp(`^/(${rootPath.replace(/^\//, '')}/)?`);

/**
 * Debounce
 *
 * @param {function}
 * @param {number}
 * @param {boolean}
 * @returns {function}
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;

    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
}

/**
 * Replace URL of the all links on the page
 *
 * @returns {void}
 */
function replaceLinksUrl() {
  Array.from(document.querySelectorAll('*:not(#wpadminbar) a, body > a')).forEach(link => {
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

window.addEventListener(
  'DOMContentLoaded',
  () => {
    replaceLinksUrl();

    const observer = new MutationObserver(debounce(replaceLinksUrl, 300));
    observer.observe(document.body, { childList: true, subtree: true });
  },
  false
);
