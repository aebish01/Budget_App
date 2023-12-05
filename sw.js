// Cache names for static and dynamic caches
const staticCache = "Static-cache-v4";
const dynamicCache = "Dynamic-cache-v4";


const assets = [
    "/",
    "/index.html",
    "/pages/about.html",
    "/pages/addExpenses.html",
    "/pages/addIncome.html",
    "/pages/addSavings.html",
    "/pages/bills.html",
    "/pages/blog.html",
    "/pages/createAccount.html",
    "/pages/income.html",
    "/pages/login.html",
    "/pages/savings.html",
    "/js/app.js",
    "/js/materialize.js",
    "/js/ui.js",
    "/css/app.css",
    "/css/materialize.css"
];


// Function to limit the cache size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        // Delete the oldest cached item
        cache.delete(keys[0]).then(() => limitCacheSize(name, size));
      }
    });
  });
};
  
  // Event listener for the installation of the service worker
self.addEventListener("install", function (event) {
  console.log(`SW: Event fired: ${event.type}`);
  // Wait until the caching is complete before finishing the installation
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      console.log("SW: Precaching App shell");
      // Add all assets to the static cache
      return cache.addAll(assets);
    })
  );
});
  
  self.addEventListener("activate", function (event) {
    // Cleanup old caches during activation
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== staticCache && key !== dynamicCache)
            .map((key) => caches.delete(key))
        );
      })
    );
    console.log("SW: Activated");
  });
// Event listener for fetch requests
self.addEventListener("fetch", function (event) {
  console.log(`SW: Fetching ${event.request.url}`);
  // Respond to the fetch event
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          // If not in cache, fetch from the network
          fetch(event.request).then((fetchRes) => {
            // Open the dynamic cache and cache the new resource
            return caches.open(dynamicCache).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              // Limit the size of the dynamic cache
              limitCacheSize(dynamicCache, 3);
              return fetchRes;
            });
          })
        );
      })
      // If fetching from network fails and the resource is not in the cache, serve a fallback page
      .catch(() => caches.match("/pages/fallback.html"))
  );
});