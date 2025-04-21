window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('.html')) {
        const newPath = path.replace(/\.html$/, '');
        const newUrl = window.location.origin + newPath + window.location.search + window.location.hash;
        window.history.replaceState({}, '', newUrl);
    }
});