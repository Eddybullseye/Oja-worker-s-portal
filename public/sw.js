importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded`);

  // Force updating the service worker immediately
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Cache static assets with Cache First strategy
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg|woff|woff2|css|js)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // Cache dynamic pages with Network First strategy
  workbox.routing.registerRoute(
    ({request}) => request.mode === 'navigate' || request.destination === 'document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  // Cache API requests with Network First (offline fallback for dynamic data)
  workbox.routing.registerRoute(
    ({url}) => url.pathname.startsWith('/api/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-responses',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );
} else {
  console.log(`Workbox didn't load`);
}
