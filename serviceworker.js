// The files we want to cache
const CACHE_NAME = 'site-cache-v1';

const urlsToCache = [
  '/',
  '/style.css',
  '/js/main.js',
  '/db/dictionary.js',
  '/db/Accessibility.md',
  '/db/Animation.md',
  '/db/AutoGenerators.md',
  '/db/Boilerplates&Frameworks.md',
  '/db/CheatSheets.md',
  '/db/Colors.md',
  '/db/CrossBrowser&Fallbacks.md',
  '/db/CSS-SASSHelpers.md',
  '/db/DevOps.md',
  '/db/Fonts,Typography,&Icons.md',
  '/db/FreeForDevelopers.md',
  '/db/Hosting.md',
  '/db/HTML.md',
  '/db/Images&Video.md',
  '/db/Javascript.md',
  '/db/Miscellaneous.md',
  '/db/MobileOnly.md',
  '/db/Node.md',
  '/db/OfflineFirst.md',
  '/db/Patterns.md',
  '/db/Performance.md',
  '/db/Podcasts.md',
  '/db/Responsive.md',
  '/db/Security.md',
  '/db/Showcases.md',
  '/db/Testing.md',
  '/db/Tutorials.md',
  '/db/WebApps.md',
  '/db/Wordpress.md',
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
