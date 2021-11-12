// The files we want to cache
const CACHE_NAME = 'site-cache-v2';

const urlsToCache = [
  '/Resources',
  '/Resources/style.css',
  '/Resources/js/main.js',
  '/Resources/db/dictionary.js',
  '/Resources/db/Accessibility.md',
  '/Resources/db/Animation.md',
  '/Resources/db/AutoGenerators.md',
  '/Resources/db/Boilerplates&Frameworks.md',
  '/Resources/db/CheatSheets.md',
  '/Resources/db/Colors.md',
  '/Resources/db/CrossBrowser&Fallbacks.md',
  '/Resources/db/CSS-SASSHelpers.md',
  '/Resources/db/DevOps.md',
  '/Resources/db/Fonts,Typography,&Icons.md',
  '/Resources/db/FreeForDevelopers.md',
  '/Resources/db/Hosting.md',
  '/Resources/db/HTML.md',
  '/Resources/db/Images&Video.md',
  '/Resources/db/Javascript.md',
  '/Resources/db/Miscellaneous.md',
  '/Resources/db/MobileOnly.md',
  '/Resources/db/Node.md',
  '/Resources/db/OfflineFirst.md',
  '/Resources/db/Patterns.md',
  '/Resources/db/Performance.md',
  '/Resources/db/Podcasts.md',
  '/Resources/db/Responsive.md',
  '/Resources/db/Security.md',
  '/Resources/db/Showcases.md',
  '/Resources/db/Testing.md',
  '/Resources/db/Tutorials.md',
  '/Resources/db/WebApps.md',
  '/Resources/db/Wordpress.md',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap'
];

self.addEventListener('install', (event) => {
  // Perform install steps
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        urlsToCache.map((url) => {
          const request = new Request(url);
          return fetch(request).then((response) =>
            cache.put(request, response)
          );
        })
      )
    )
  );
});

// respond with matches from cache
self.addEventListener('fetch', (event) => {
  if (urlsToCache.some((url) => event.request.url.indexOf(url) !== -1)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (!response) {
          const request = new Request(event.request.url);
          return fetch(request);
        }
        return response;
      })
    );
  }
});

// remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(
          keyList.map((key) =>
            cacheWhitelist.indexOf(key) === -1 ? caches.delete(key) : false
          )
        )
      )
  );
});
