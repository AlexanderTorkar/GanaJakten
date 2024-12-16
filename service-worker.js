const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
  ];
  
  const CACHE_NAME = 'pwa-cache';
  const OFFLINE_FALLBACK_PAGE = '/offline.html';
  
  const getFixedUrl = (req) => {
    const now = Date.now();
    const url = new URL(req.url);
    url.protocol = self.location.protocol;
    if (url.hostname === self.location.hostname) {
      url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    }
    return url.href;
  };
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/app.js',
          OFFLINE_FALLBACK_PAGE,
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (event) => {
    if (HOSTNAME_WHITELIST.includes(new URL(event.request.url).hostname)) {
      const fixedUrl = getFixedUrl(event.request);
      event.respondWith(
        caches.match(event.request).then((cached) => {
          return (
            cached ||
            fetch(fixedUrl, { cache: 'no-store' }).catch(() =>
              caches.match(OFFLINE_FALLBACK_PAGE)
            )
          );
        })
      );
  
      event.waitUntil(
        fetch(fixedUrl, { cache: 'no-store' })
          .then((response) =>
            caches.open(CACHE_NAME).then((cache) => {
              if (response.ok) {
                cache.put(event.request, response.clone());
              }
            })
          )
          .catch(() => {
            /* Handle fetch errors */
          })
      );
    }
  });
  