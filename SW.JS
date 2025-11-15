// A unique name for your cache (change this to force an update of all assets)
const CACHE_NAME = 'olympus-pathfinder-v1';

// List of files to cache on installation (your 'App Shell')
const urlsToCache = [
  '/',                     // The root URL/start page
  '/index.html',           // The main HTML file
  '/style.css',            // Your CSS file
  '/app.js',               // Your main JavaScript file
  '/manifest.json',        // Your manifest file
  '/images/icon-192x192.png', // Main app icon
  '/images/icon-512x512.png'  // Larger app icon
  // Add any other core assets like fonts, logos, or crucial images here
];

// --- 1. INSTALLATION: Caching the App Shell ---
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install Event: Caching App Shell');
  // Wait until the promise resolves, ensuring all files are cached before installation is finished.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching files successfully.');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache files:', error);
      })
  );
  // Forces the new Service Worker to activate immediately, without waiting for the user to close all open tabs.
  self.skipWaiting();
});

// --- 2. ACTIVATION: Cleaning up old caches (Crucial for updates) ---
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate Event: Cleaning Old Caches');
  const cacheWhitelist = [CACHE_NAME];
  // Wait until the promise resolves, ensuring cleanup is finished.
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tell the activated service worker to take control of all clients/pages immediately
  return self.clients.claim();
});

// --- 3. FETCH: Serving from cache first, falling back to network ---
self.addEventListener('fetch', (event) => {
  // We only intercept requests that are not cross-origin or involve complex methods
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(