// The files we want to cache
const CACHE_NAME = 'site-cache-v4';

const urlsToCache = [
  '/Resources',
  '/Resources/style.css',
  '/Resources/js/main.js',
  '/Resources/db/dictionary.js',
  'https://raw.githubusercontent.com/tevko/Resources/master/Accessibility.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Animation.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/AutoGenerators.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Boilerplates&Frameworks.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/CheatSheets.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Colors.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/CrossBrowser&Fallbacks.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/CSS-SASSHelpers.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/DevOps.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/FontsTypography&Icons.md',
  'https://github.com/tevko/Resources/blob/master/FreeForDevelopers.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Hosting.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/HTML.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Images&Video.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Javascript.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Miscellaneous.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/MobileOnly.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Node.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/OfflineFirst.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Patterns.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Performance.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Podcasts.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Responsive.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Security.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Showcases.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Testing.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Tutorials.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/WebApps.md',
  'https://raw.githubusercontent.com/tevko/Resources/master/Wordpress.md',
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
