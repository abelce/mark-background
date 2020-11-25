/**
 * 捕获静态资源异常, js, css, img
 */

if (!window.__ERROR_EVENT_ADDED)  {
    window.addEventListener('error', function({target}) {
        const data = {
            type: 'static',
            tagName: target.tagName,
            src: target.src,

        }
        console.log('error', event);
    }, true);
    window.__ERROR_EVENT_ADDED = true;
}

